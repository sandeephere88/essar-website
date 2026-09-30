<?php

namespace App\Filament\Resources;

use App\Filament\Resources\ServiceResource\Pages;
use App\Models\Category;
use App\Models\Service;
use App\Services\DomainConfigService;
use Filament\Forms;
use Filament\Forms\Components\Builder;
use Filament\Forms\Components\Builder\Block;
use Filament\Forms\Components\ColorPicker;
use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\Repeater;
use Filament\Forms\Components\RichEditor;
use Filament\Forms\Components\Section;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Toggle;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Columns\IconColumn;
use Filament\Tables\Columns\ImageColumn;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Columns\ToggleColumn;
use Filament\Tables\Table;
use Illuminate\Support\Str;

class ServiceResource extends Resource
{
    protected static ?string $model = Service::class;
    protected static ?string $navigationIcon = 'heroicon-o-cube';
    protected static ?int $navigationSort = 20;


    public static function getNavigationGroup(): ?string
    {
        return DomainConfigService::getBusinessType();
    }

    public static function getNavigationLabel(): string
    {
        return DomainConfigService::getServiceLabel(true);
    }

    public static function getModelLabel(): string
    {
        return DomainConfigService::getServiceLabel(false);
    }

    public static function getPluralModelLabel(): string
    {
        return DomainConfigService::getServiceLabel(true);
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
                        ->directory('services/backgrounds')
                        ->imageEditor()
                        ->visible(fn (Forms\Get $get) => $get('bg_type') === 'image'),
                ])
                ->collapsed(),
        ];
    }

    public static function form(Form $form): Form
    {
        return $form->schema([
            Section::make('Basic Information')
                ->columns(2)
                ->schema([
                    TextInput::make('title')
                        ->label(DomainConfigService::getServiceLabel() . ' Title')
                        ->required()
                        ->maxLength(255)
                        ->live(debounce: 500)
                        ->afterStateUpdated(fn ($state, Forms\Set $set) =>
                            $set('slug', Str::slug($state))
                        ),

                    TextInput::make('slug')
                        ->required()
                        ->unique(ignoreRecord: true)
                        ->maxLength(255)
                        ->helperText('Auto-generated slug used for URL.'),

                    Select::make('category_id')
                        ->label(DomainConfigService::getCategoryLabel())
                        ->options(fn () => Category::pluck('name', 'id'))
                        ->searchable()
                        ->preload()
                        ->nullable(),

                    Select::make('is_active')
                        ->label('Status')
                        ->options([1 => 'Active', 0 => 'Inactive'])
                        ->default(1)
                        ->native(false),

                    Toggle::make('is_featured')
                        ->label('Featured ' . DomainConfigService::getServiceLabel())
                        ->default(false),

                    TextInput::make('sort_order')
                        ->numeric()
                        ->default(0)
                        ->minValue(0),

                    Textarea::make('short_description')
                        ->label('Short Overview / Summary')
                        ->maxLength(500)
                        ->rows(3)
                        ->columnSpanFull(),
                ]),

            Section::make('Pricing Details')
                ->description('Set the product price, unit, and minimum order quantity shown on the product page.')
                ->columns(3)
                ->schema([
                    TextInput::make('price')
                        ->label('Price')
                        ->placeholder('e.g. ₹ 8,00,000')
                        ->helperText('Display price (include currency symbol if desired).')
                        ->maxLength(100),

                    TextInput::make('price_unit')
                        ->label('Price Unit')
                        ->placeholder('e.g. Unit, Piece, Set, Kg')
                        ->helperText('Unit of sale appended after the price.')
                        ->maxLength(50),

                    TextInput::make('min_order_qty')
                        ->label('Minimum Order Quantity')
                        ->placeholder('e.g. 1 Piece, 5 Units')
                        ->helperText('Minimum quantity a buyer must order.')
                        ->maxLength(100),
                ]),

            Section::make('Product Media')
                ->columns(2)
                ->schema([
                    FileUpload::make('image')
                        ->label('Product Image')
                        ->image()
                        ->disk('public')
                        ->directory('services')
                        ->imageEditor()
                        ->maxSize(4096),

                    FileUpload::make('gallery')
                        ->label('Product Image Gallery')
                        ->image()
                        ->multiple()
                        ->panelLayout('grid')
                        ->disk('public')
                        ->directory('services/galleries')
                        ->maxFiles(10),
                ]),

            Section::make('Features & Highlights')
                ->collapsed()
                ->schema([
                    Repeater::make('features')
                        ->schema([
                            TextInput::make('title')->required(),
                            TextInput::make('description'),
                            TextInput::make('icon')->placeholder('heroicon-o-check-circle or emoji'),
                        ])
                        ->columns(3)
                        ->collapsible(),
                ]),

            Section::make('Technical Specifications')
                ->collapsed()
                ->schema([
                    Repeater::make('specifications')
                        ->schema([
                            TextInput::make('label')->required()->placeholder('e.g. Capacity / Power / Motor / Warranty'),
                            TextInput::make('value')->required()->placeholder('e.g. 500 Nuts/Day / 5 HP / 3-Phase / 1 Year'),
                        ])
                        ->columns(2)
                        ->collapsible(),
                ]),

            Section::make('Custom Package Pricing (Optional)')
                ->description('Use only if you need tiered/package pricing in addition to the standard price above.')
                ->collapsed()
                ->schema([
                    Repeater::make('pricing')
                        ->schema([
                            TextInput::make('package_name')->required()->placeholder('Basic / Standard / Custom'),
                            TextInput::make('price')->required()->placeholder('₹ 1,50,000 / On Request'),
                            TextInput::make('period')->placeholder('per unit / per project'),
                            Textarea::make('features_list')->rows(3)->placeholder('Feature 1\nFeature 2'),
                        ])
                        ->columns(3)
                        ->collapsible(),
                ]),

            Section::make('Detail Page Content Builder')
                ->description('Build rich, dynamic detail page sections for this ' . DomainConfigService::getServiceLabel())
                ->schema([
                    Builder::make('blocks')
                        ->label('Content Blocks')
                        ->blockNumbers(false)
                        ->collapsible()
                        ->cloneable()
                        ->addActionLabel(fn (\Filament\Forms\Get $get): string => empty($get('blocks')) ? 'Add first block' : 'Add another block')
                        ->blocks([
                            Block::make('hero_banner')
                                ->label('Hero Banner')
                                ->icon('heroicon-o-photo')
                                ->schema([
                                    FileUpload::make('image')->image()->imageEditor()->required(),
                                    TextInput::make('heading')->required(),
                                    TextInput::make('subheading'),
                                    TextInput::make('cta_text'),
                                    TextInput::make('cta_link'),
                                ]),

                            Block::make('rich_text')
                                ->label('Rich Text Content')
                                ->icon('heroicon-o-document-text')
                                ->schema(array_merge([
                                    RichEditor::make('content')->required(),
                                ], self::getBackgroundSchema())),

                            Block::make('image_text')
                                ->label('Image with Text')
                                ->icon('heroicon-o-view-columns')
                                ->schema(array_merge([
                                    FileUpload::make('image')->image()->imageEditor()->required(),
                                    Select::make('image_position')
                                        ->options(['left' => 'Left', 'right' => 'Right'])
                                        ->default('left'),
                                    TextInput::make('heading')->required(),
                                    RichEditor::make('text')->required(),
                                ], self::getBackgroundSchema())),

                            Block::make('cta_banner')
                                ->label('CTA Banner')
                                ->icon('heroicon-o-megaphone')
                                ->schema([
                                    TextInput::make('heading')->required(),
                                    Textarea::make('description')->label('Section Description')->rows(2),
                                    TextInput::make('button_text'),
                                    TextInput::make('button_link'),
                                ]),

                            Block::make('faq_accordion')
                                ->label('FAQ Accordion')
                                ->icon('heroicon-o-question-mark-circle')
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

                            Block::make('contact_form')
                                ->label('Contact Inquiry Form')
                                ->icon('heroicon-o-envelope')
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
                TextColumn::make('sort_order')
                    ->label('#')
                    ->sortable()
                    ->width(50),
                ImageColumn::make('image')
                    ->label('')
                    ->circular()
                    ->size(48),
                TextColumn::make('title')
                    ->label(DomainConfigService::getServiceLabel() . ' Title')
                    ->searchable()
                    ->sortable(),
                TextColumn::make('category.name')
                    ->label(DomainConfigService::getCategoryLabel())
                    ->placeholder('-')
                    ->sortable(),
                TextColumn::make('price')
                    ->label('Price')
                    ->placeholder('—')
                    ->formatStateUsing(fn ($state, $record) => $state
                        ? $state . ($record->price_unit ? ' / ' . $record->price_unit : '')
                        : '—'),
                ToggleColumn::make('is_featured')->label('Featured'),
                ToggleColumn::make('is_active')->label('Active'),
                TextColumn::make('updated_at')->since()->sortable(),
            ])
            ->defaultSort('sort_order')
            ->reorderable('sort_order')
            ->filters([
                Tables\Filters\TernaryFilter::make('is_active')->label('Active'),
                Tables\Filters\TernaryFilter::make('is_featured')->label('Featured'),
            ])
            ->actions([
                Tables\Actions\EditAction::make(),
                Tables\Actions\DeleteAction::make(),
            ])
            ->bulkActions([
                Tables\Actions\BulkActionGroup::make([
                    Tables\Actions\DeleteBulkAction::make(),
                ]),
            ]);
    }

    public static function getRelations(): array
    {
        return [];
    }

    public static function getPages(): array
    {
        return [
            'index'  => Pages\ListServices::route('/'),
            'create' => Pages\CreateService::route('/create'),
            'edit'   => Pages\EditService::route('/{record}/edit'),
        ];
    }
}
