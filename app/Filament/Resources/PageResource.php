<?php

namespace App\Filament\Resources;

use App\Filament\Resources\PageResource\Pages;
use App\Models\Page;
use Filament\Forms;
use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\RichEditor;
use Filament\Forms\Components\Section;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Builder;
use Filament\Forms\Components\Builder\Block;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\Toggle;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\Repeater;
use Filament\Forms\Components\ColorPicker;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Model;

class PageResource extends Resource
{
    protected static ?string $model = Page::class;
    protected static ?string $navigationIcon = 'heroicon-o-document-text';
    protected static ?string $navigationGroup = 'Content';
    protected static ?int $navigationSort = 40;

    public static function canCreate(): bool
    {
        return true;
    }

    public static function canDelete(Model $record): bool
    {
        return true;
    }

    public static function getBackgroundSchema(): array
    {
        return [
            Section::make('Background Settings')
                ->schema([
                    Select::make('bg_type')
                        ->label('Background Type')
                        ->options([
                            'none' => 'None',
                            'color' => 'Solid Color',
                            'gradient' => 'Gradient',
                            'image' => 'Image',
                        ])
                        ->default('none')
                        ->live(),
                    ColorPicker::make('bg_color')
                        ->label('Background Color')
                        ->visible(fn (Forms\Get $get) => $get('bg_type') === 'color'),
                    \App\Filament\Components\GradientPicker::make('bg_gradient')
                        ->label('Gradient Configuration')
                        ->visible(fn (Forms\Get $get) => $get('bg_type') === 'gradient'),
                    FileUpload::make('bg_image')
                        ->label('Background Image')
                        ->image()
                        ->directory('pages/backgrounds')
                        ->imageEditor()
                        ->visible(fn (Forms\Get $get) => $get('bg_type') === 'image'),
                ])
                ->collapsed(),
        ];
    }

    public static function form(Form $form): Form
    {
        return $form->schema([
            Section::make('Page Structure')
                ->columns(2)
                ->schema([
                    TextInput::make('title')
                        ->required()
                        ->maxLength(255)
                        ->dehydrated()
                        ->live(onBlur: true)
                        ->afterStateUpdated(fn (string $operation, $state, Forms\Set $set) => $operation === 'create' ? $set('slug', \Illuminate\Support\Str::slug($state)) : null),

                    TextInput::make('slug')
                        ->required()
                        ->maxLength(255)
                        ->dehydrated()
                        ->unique(Page::class, 'slug', ignoreRecord: true)
                        ->notIn([
                            'departments', 'doctors', 'blog', 'gallery', 'admin', 'api', 
                            'sitemap.xml', 'robots.txt', 'storage', 'contact-submissions',
                            'about', 'contact', 'pages', 'dashboard', 'profile'
                        ])
                        ->validationMessages([
                            'not_in' => 'This slug is reserved by a system route. The page is already accessible via its dedicated URL (e.g. /about or /contact). Keep the slug as-is (e.g. "about-us").',
                        ]),
                        
                    Select::make('status')
                        ->options([
                            'draft' => 'Draft',
                            'published' => 'Published',
                        ])
                        ->default('draft')
                        ->required(),
                ]),

            Section::make('Page Media')
                ->schema([
                    FileUpload::make('hero_image')
                        ->label('Hero Banner Image')
                        ->image()
                        ->disk('public')
                        ->directory('pages')
                        ->imageEditor()
                        ->maxSize(4096),
                ]),

            Section::make('Page Content')
                ->schema([
                    Builder::make('blocks')
                        ->label('Content Blocks')
                        ->blockNumbers(false)
                        ->collapsible()
                        ->cloneable()
                        ->addActionLabel(fn (\Filament\Forms\Get $get): string => empty($get('blocks')) ? 'Add your first block' : 'Add another block')
                        ->blocks([
                            Block::make('hero_banner')
                                ->label(fn (?array $state): string => config('blocks.registry.hero_banner.label') . (!empty($state['heading']) ? ': ' . strip_tags($state['heading']) : ''))
                                ->icon(config('blocks.registry.hero_banner.icon'))
                                ->schema([
                                    FileUpload::make('image')->image()->imageEditor()->required(),
                                    TextInput::make('heading')->required(),
                                    TextInput::make('subheading'),
                                    TextInput::make('cta_text'),
                                    TextInput::make('cta_link'),
                                    Select::make('alignment')
                                        ->options([
                                            'left' => 'Left',
                                            'center' => 'Center',
                                        ])
                                        ->default('left')
                                        ->required(),
                                ]),
                                
                            Block::make('rich_text')
                                ->label(fn (?array $state): string => config('blocks.registry.rich_text.label') . (!empty($state['content']) ? ': ' . \Illuminate\Support\Str::limit(strip_tags($state['content']), 40) : ''))
                                ->icon(config('blocks.registry.rich_text.icon'))
                                ->schema(array_merge([
                                    RichEditor::make('content')->required(),
                                ], self::getBackgroundSchema())),
                                
                            Block::make('image_text')
                                ->label(fn (?array $state): string => config('blocks.registry.image_text.label') . (!empty($state['heading']) ? ': ' . strip_tags($state['heading']) : ''))
                                ->icon(config('blocks.registry.image_text.icon'))
                                ->schema(array_merge([
                                    FileUpload::make('image')->image()->imageEditor()->required(),
                                    Select::make('image_position')
                                        ->options([
                                            'left' => 'Left',
                                            'right' => 'Right',
                                        ])
                                        ->default('left')
                                        ->required(),
                                    TextInput::make('heading')->required(),
                                    RichEditor::make('text')->required(),
                                ], self::getBackgroundSchema())),
                                
                            Block::make('cta_banner')
                                ->label(fn (?array $state): string => config('blocks.registry.cta_banner.label') . (!empty($state['heading']) ? ': ' . strip_tags($state['heading']) : ''))
                                ->icon(config('blocks.registry.cta_banner.icon'))
                                ->schema([
                                    Toggle::make('use_background_color')
                                        ->label('Use Background Color instead of Image')
                                        ->live(),
                                    FileUpload::make('background_image')
                                        ->image()
                                        ->imageEditor()
                                        ->hidden(fn (Forms\Get $get) => $get('use_background_color')),
                                    ColorPicker::make('background_color')
                                        ->hidden(fn (Forms\Get $get) => ! $get('use_background_color')),
                                    TextInput::make('heading')->required(),
                                    Textarea::make('description')->label('Section Description')->rows(2),
                                    TextInput::make('button_text'),
                                    TextInput::make('button_link'),
                                ]),
                                
                            Block::make('video_embed')
                                ->label(fn (?array $state): string => config('blocks.registry.video_embed.label') . (!empty($state['video_url']) ? ': ' . $state['video_url'] : ''))
                                ->icon(config('blocks.registry.video_embed.icon'))
                                ->schema(array_merge([
                                    TextInput::make('video_url')
                                        ->required()
                                        ->url()
                                        ->regex('/^(https?\:\/\/)?(www\.)?(youtube\.com|youtu\.be|vimeo\.com)\/.+$/')
                                        ->validationMessages([
                                            'regex' => 'Must be a valid YouTube or Vimeo URL.',
                                        ]),
                                ], self::getBackgroundSchema())),
                                
                            Block::make('department_grid')
                                ->label(config('blocks.registry.department_grid.label'))
                                ->icon(config('blocks.registry.department_grid.icon'))
                                ->schema(array_merge([
                                    TextInput::make('heading_before')->label('Heading Main Text'),
                                    TextInput::make('heading_accent')->label('Heading Accent (Italic)'),
                                    Textarea::make('description')->label('Section Description')->rows(2),
                                    Select::make('mode')
                                        ->options([
                                            'all' => 'All Departments',
                                            'selected' => 'Selected Departments',
                                        ])
                                        ->default('all')
                                        ->live()
                                        ->required(),
                                    Select::make('selected_department_ids')
                                        ->multiple()
                                        ->options(fn () => \App\Models\Department::pluck('name', 'id'))
                                        ->visible(fn (Forms\Get $get) => $get('mode') === 'selected'),
                                    TextInput::make('limit')
                                        ->numeric(),
                                ], self::getBackgroundSchema())),
                                
                            Block::make('care_role_grid')
                                ->label(config('blocks.registry.care_role_grid.label'))
                                ->icon(config('blocks.registry.care_role_grid.icon'))
                                ->schema([
                                    TextInput::make('badge_text')
                                        ->label('Pill Badge / Tag Text (Above Heading)')
                                        ->placeholder('e.g. ALL SPECIALITIES')
                                        ->default('ALL SPECIALITIES'),
                                    TextInput::make('heading_before')
                                        ->label('Heading Main Text')
                                        ->default('Our Care'),
                                    TextInput::make('heading_accent')
                                        ->label('Heading Accent (Italic)')
                                        ->default('Role'),
                                    Textarea::make('description')
                                        ->label('Subtitle Description')
                                        ->default('Explore our specialist healthcare and nursing roles designed for every care requirement.'),
                                    Repeater::make('roles')
                                        ->label('Care Roles (6 Cards Grid)')
                                        ->schema([
                                            TextInput::make('title')->label('Role Title')->required(),
                                            TextInput::make('subtitle')->label('Short Description/Subtitle')->required(),
                                            FileUpload::make('image')->label('Card Graphic / Image (contains background pattern)')->image()->directory('care-roles')->columnSpanFull(),
                                        ])
                                        ->columns(2),
                                ]),
                                
                            Block::make('testimonial_slider')
                                ->label(config('blocks.registry.testimonial_slider.label'))
                                ->icon(config('blocks.registry.testimonial_slider.icon'))
                                ->schema(array_merge([
                                    TextInput::make('heading_before')->label('Heading Main Text'),
                                    TextInput::make('heading_accent')->label('Heading Accent (Italic)'),
                                    Textarea::make('description')->label('Section Description')->rows(2),
                                    Select::make('mode')
                                        ->options([
                                            'featured' => 'Featured Testimonials',
                                            'selected' => 'Selected Testimonials',
                                        ])
                                        ->default('featured')
                                        ->live()
                                        ->required(),
                                    Select::make('selected_testimonial_ids')
                                        ->multiple()
                                        ->options(fn () => \App\Models\Testimonial::pluck('author', 'id'))
                                        ->visible(fn (Forms\Get $get) => $get('mode') === 'selected'),
                                ], self::getBackgroundSchema())),
                                
                            Block::make('accreditation_strip')
                                ->label(config('blocks.registry.accreditation_strip.label'))
                                ->icon(config('blocks.registry.accreditation_strip.icon'))
                                ->schema(array_merge([
                                    TextInput::make('heading_before')->label('Heading Main Text'),
                                    TextInput::make('heading_accent')->label('Heading Accent (Italic)'),
                                    Textarea::make('description')->label('Section Description')->rows(2),
                                    Select::make('mode')
                                        ->options([
                                            'all' => 'All Accreditations',
                                            'selected' => 'Selected Accreditations',
                                        ])
                                        ->default('all')
                                        ->live()
                                        ->required(),
                                    Select::make('selected_accreditation_ids')
                                        ->multiple()
                                        ->options(fn () => \App\Models\Accreditation::pluck('title', 'id'))
                                        ->visible(fn (Forms\Get $get) => $get('mode') === 'selected'),
                                ], self::getBackgroundSchema())),
                                
                            Block::make('gallery_block')
                                ->label(config('blocks.registry.gallery_block.label'))
                                ->icon(config('blocks.registry.gallery_block.icon'))
                                ->schema(array_merge([
                                    TextInput::make('heading')->label('Section Heading (Optional)'),
                                    Textarea::make('description')->label('Section Description (Optional)')->rows(2),
                                    Select::make('album_id')
                                        ->options(fn () => \App\Models\Gallery::pluck('title', 'id'))
                                        ->required(),
                                ], self::getBackgroundSchema())),
                                
                            Block::make('faq_accordion')
                                ->label(config('blocks.registry.faq_accordion.label'))
                                ->icon(config('blocks.registry.faq_accordion.icon'))
                                ->schema(array_merge([
                                    TextInput::make('heading_before')->label('Heading Main Text'),
                                    TextInput::make('heading_accent')->label('Heading Accent (Italic)'),
                                    Textarea::make('description')->label('Section Description')->rows(2),
                                    Repeater::make('faqs')
                                        ->schema([
                                            TextInput::make('question')->required(),
                                            Textarea::make('answer')->required(),
                                        ]),
                                ], self::getBackgroundSchema())),
                                
                            Block::make('stats_counters')
                                ->label(config('blocks.registry.stats_counters.label'))
                                ->icon(config('blocks.registry.stats_counters.icon'))
                                ->schema(array_merge([
                                    TextInput::make('heading_before')->label('Heading Main Text'),
                                    TextInput::make('heading_accent')->label('Heading Accent (Italic)'),
                                    Textarea::make('description')->label('Section Description')->rows(2),
                                    Repeater::make('stats')
                                        ->schema([
                                            TextInput::make('number')->required(),
                                            TextInput::make('label')->required(),
                                            Select::make('icon')
                                                ->options([
                                                    'heroicon-o-users' => 'Users',
                                                    'heroicon-o-star' => 'Star',
                                                    'heroicon-o-heart' => 'Heart',
                                                    'heroicon-o-building-office-2' => 'Building',
                                                    'heroicon-o-face-smile' => 'Smile',
                                                    'heroicon-o-check-circle' => 'Check Circle',
                                                    'heroicon-o-plus-circle' => 'Plus Circle',
                                                ])
                                                ->required(),
                                        ]),
                                ], self::getBackgroundSchema())),
                                
                            Block::make('contact_form')
                                ->label(fn (?array $state): string => config('blocks.registry.contact_form.label') . (!empty($state['heading_before']) ? ': ' . strip_tags($state['heading_before']) : (!empty($state['heading']) ? ': ' . strip_tags($state['heading']) : '')))
                                ->icon(config('blocks.registry.contact_form.icon'))
                                ->schema(array_merge([
                                    TextInput::make('heading_before')
                                        ->label('Heading Main Text (e.g. Talk to our)')
                                        ->placeholder('Talk to our'),
                                    TextInput::make('heading_accent')
                                        ->label('Heading Accent - Green Italic (e.g. team)')
                                        ->placeholder('team'),
                                    TextInput::make('heading')
                                        ->label('Heading Full (Legacy Single Text)')
                                        ->hidden(fn ($get) => !empty($get('heading_before')) || !empty($get('heading_accent'))),
                                    Textarea::make('description'),
                                ], self::getBackgroundSchema())),
                                
                            Block::make('profile_block')
                                ->label(fn (?array $state): string => config('blocks.registry.profile_block.label') . (!empty($state['name']) ? ': ' . strip_tags($state['name']) : (!empty($state['heading_accent']) ? ': ' . strip_tags($state['heading_accent']) : '')))
                                ->icon(config('blocks.registry.profile_block.icon'))
                                ->schema(array_merge([
                                    TextInput::make('heading_before')
                                        ->label('Heading Before (e.g. Meet Our)')
                                        ->default('Meet Our'),
                                    TextInput::make('heading_accent')
                                        ->label('Heading Accent (Teal Italic, e.g. Team)')
                                        ->default('Team'),
                                    Textarea::make('description')
                                        ->label('Section Description')
                                        ->rows(2),
                                    Repeater::make('profiles')
                                        ->label('Team Profiles')
                                        ->schema([
                                            FileUpload::make('image')
                                                ->label('Profile Image')
                                                ->image()
                                                ->directory('pages/profiles')
                                                ->imageEditor(),
                                            TextInput::make('name')
                                                ->label('Name')
                                                ->required(),
                                            TextInput::make('designation')
                                                ->label('Designation (Subtitle)'),
                                            RichEditor::make('description')
                                                ->label('Description')
                                                ->toolbarButtons(['bold', 'italic', 'link', 'bulletList', 'orderedList']),
                                            TextInput::make('link_url')
                                                ->label('Read More Link URL')
                                                ->url(),
                                            TextInput::make('link_text')
                                                ->label('Read More Link Text')
                                                ->default('Read More ->'),
                                        ])
                                        ->collapsible()
                                        ->defaultItems(0),
                                    FileUpload::make('image')
                                        ->label('Single Profile Image (Legacy)')
                                        ->image()
                                        ->directory('pages/profiles')
                                        ->imageEditor()
                                        ->hidden(fn ($get) => !empty($get('profiles'))),
                                    TextInput::make('name')
                                        ->label('Single Profile Name (Legacy)')
                                        ->hidden(fn ($get) => !empty($get('profiles'))),
                                    TextInput::make('designation')
                                        ->label('Single Profile Designation (Legacy)')
                                        ->hidden(fn ($get) => !empty($get('profiles'))),
                                    RichEditor::make('description')
                                        ->label('Single Profile Description (Legacy)')
                                        ->toolbarButtons(['bold', 'italic', 'link', 'bulletList', 'orderedList'])
                                        ->hidden(fn ($get) => !empty($get('profiles'))),
                                ], self::getBackgroundSchema())),

                            Block::make('spacer')
                                ->label(config('blocks.registry.spacer.label'))
                                ->icon(config('blocks.registry.spacer.icon'))
                                ->schema([
                                    Select::make('height')
                                        ->options([
                                            'sm' => 'Small',
                                            'md' => 'Medium',
                                            'lg' => 'Large',
                                        ])
                                        ->default('md')
                                        ->required(),
                                ]),

                            Block::make('unique_experiences')
                                ->label(config('blocks.registry.unique_experiences.label'))
                                ->icon(config('blocks.registry.unique_experiences.icon'))
                                ->schema([
                                    TextInput::make('heading_before')
                                        ->label('Heading Main Text')
                                        ->default('We Create'),
                                    TextInput::make('heading_accent')
                                        ->label('Heading Accent (Italic)')
                                        ->default('Unique Experiences'),
                                    Textarea::make('description')
                                        ->label('Subtitle Description')
                                        ->rows(3),
                                    FileUpload::make('image')
                                        ->label('Team/Banner Photo (1439x600, rounded 50px)')
                                        ->image()
                                        ->directory('pages'),
                                    Repeater::make('stat_badges')
                                        ->label('Vision / Motto / Mission Cards (375x276, rounded 20px)')
                                        ->schema([
                                            TextInput::make('label')
                                                ->label('Card Title')
                                                ->placeholder('e.g. Our Vision')
                                                ->required(),
                                            Textarea::make('subtext')
                                                ->label('Card Description')
                                                ->placeholder('e.g. Empathy · Respect · Integrity · Dignity')
                                                ->rows(2),
                                        ])
                                        ->columns(1),
                                ]),

                            Block::make('tabs_content')
                                ->label(fn (?array $state): string => config('blocks.registry.tabs_content.label') . (!empty($state['title']) ? ': ' . strip_tags($state['title']) : ''))
                                ->icon(config('blocks.registry.tabs_content.icon'))
                                ->schema(array_merge([
                                    TextInput::make('title')->label('Section Heading'),
                                    Textarea::make('description')->label('Section Subtitle')->rows(2),
                                    Repeater::make('tabs')
                                        ->label('Tabs List')
                                        ->schema([
                                            TextInput::make('title')->label('Tab Title')->required(),
                                            RichEditor::make('content')->label('Tab Content')->required(),
                                            FileUpload::make('image')->label('Tab Image (Optional)')->image()->directory('pages/tabs'),
                                        ])
                                        ->collapsible()
                                        ->itemLabel(fn (array $state): ?string => $state['title'] ?? null)
                                        ->columns(1),
                                ], self::getBackgroundSchema())),

                            Block::make('custom_html')
                                ->label(fn (?array $state): string => config('blocks.registry.custom_html.label') . (!empty($state['title']) ? ': ' . strip_tags($state['title']) : ''))
                                ->icon(config('blocks.registry.custom_html.icon'))
                                ->schema(array_merge([
                                    TextInput::make('title')->label('Block Title (Optional)'),
                                    Textarea::make('html_content')
                                        ->label('Raw HTML / Embed Code')
                                        ->rows(8)
                                        ->required()
                                        ->helperText('Paste custom HTML, script tags, or iframe embeds here.'),
                                ], self::getBackgroundSchema())),

                            Block::make('office_locations')
                                ->label(config('blocks.registry.office_locations.label'))
                                ->icon(config('blocks.registry.office_locations.icon'))
                                ->schema([
                                    TextInput::make('heading_before')
                                        ->label('Heading Main Text')
                                        ->default('Our Global'),
                                    TextInput::make('heading_accent')
                                        ->label('Heading Accent (Italic)')
                                        ->default('Locations'),
                                    Textarea::make('description')
                                        ->label('Section Description')
                                        ->rows(2)
                                        ->default('Find us or get in touch with our office locations across the globe.'),
                                    Repeater::make('locations')
                                        ->label('Office Locations Grid')
                                        ->schema([
                                            TextInput::make('title')
                                                ->label('Location / Office Name')
                                                ->placeholder('e.g. Head Office, LONDON, WALES')
                                                ->required(),
                                            Textarea::make('address')
                                                ->label('Full Address')
                                                ->rows(2)
                                                ->placeholder('e.g. 782 Chester Rd, Erdington, Birmingham B24 0ED, United Kingdom'),
                                            TextInput::make('phone')
                                                ->label('Phone Number')
                                                ->placeholder('e.g. 01217861977 or +44 7570161977'),
                                            TextInput::make('email')
                                                ->label('Email Address')
                                                ->placeholder('e.g. info@finecare247.com'),
                                            TextInput::make('badge')
                                                ->label('Badge / Tag (Optional)')
                                                ->placeholder('e.g. UK, Ireland, Canada, India'),
                                        ])
                                        ->columns(2)
                                        ->collapsible()
                                        ->itemLabel(fn (array $state): ?string => $state['title'] ?? null),
                                ]),

                            Block::make('google_map')
                                ->label(config('blocks.registry.google_map.label'))
                                ->icon(config('blocks.registry.google_map.icon'))
                                ->schema([
                                    TextInput::make('heading')
                                        ->label('Section Heading')
                                        ->default('Find Us On The Map'),
                                    Textarea::make('description')
                                        ->label('Section Description')
                                        ->rows(2),
                                    Textarea::make('map_url')
                                        ->label('Google Maps Embed URL / iframe')
                                        ->rows(3)
                                        ->helperText('Leave empty to use Google Map URL set under Business Profile / Settings.'),
                                ]),
                        ])
                        ->columnSpanFull(),
                ]),

            \App\Filament\Components\SeoMetaSection::make(),
        ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('title')
                    ->label('Page Name')
                    ->searchable()
                    ->sortable(),

                TextColumn::make('slug')
                    ->label('Url Slug')
                    ->badge()
                    ->color('gray'),
                    
                TextColumn::make('status')
                    ->badge()
                    ->color(fn (string $state): string => match ($state) {
                        'draft' => 'gray',
                        'published' => 'success',
                        default => 'gray',
                    }),

                TextColumn::make('updated_at')
                    ->label('Last Modified')
                    ->dateTime()
                    ->sortable(),
            ])
            ->actions([
                Tables\Actions\EditAction::make(),
                Tables\Actions\DeleteAction::make(),
            ])
            ->bulkActions([]);
    }

    public static function getRelations(): array
    {
        return [];
    }

    public static function getPages(): array
    {
        return [
            'index'  => Pages\ListPages::route('/'),
            'create' => Pages\CreatePage::route('/create'),
            'edit'   => Pages\EditPage::route('/{record}/edit'),
        ];
    }
}
