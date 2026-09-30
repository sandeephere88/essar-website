<?php

namespace App\Filament\Resources;

use App\Filament\Resources\CategoryResource\Pages;
use App\Models\Category;
use App\Services\DomainConfigService;
use Filament\Forms;
use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\Repeater;
use Filament\Forms\Components\RichEditor;
use Filament\Forms\Components\Section;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Columns\ImageColumn;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Columns\ToggleColumn;
use Filament\Tables\Table;
use Illuminate\Support\Str;

class CategoryResource extends Resource
{
    protected static ?string $model = Category::class;
    protected static ?string $navigationIcon = 'heroicon-o-squares-2x2';
    protected static ?int $navigationSort = 10;

    public static function getNavigationGroup(): ?string
    {
        return DomainConfigService::getBusinessType();
    }

    public static function getNavigationLabel(): string
    {
        return DomainConfigService::getCategoryLabel(true);
    }

    public static function getModelLabel(): string
    {
        return DomainConfigService::getCategoryLabel(false);
    }

    public static function getPluralModelLabel(): string
    {
        return DomainConfigService::getCategoryLabel(true);
    }

    public static function form(Form $form): Form
    {
        return $form->schema([
            Section::make('Basic Information')
                ->columns(2)
                ->schema([
                    TextInput::make('name')
                        ->label(DomainConfigService::getCategoryLabel() . ' Name')
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
                        ->helperText('Auto-generated. Edit only if needed.'),

                    Select::make('parent_id')
                        ->label('Parent ' . DomainConfigService::getCategoryLabel())
                        ->relationship('parent', 'name')
                        ->searchable()
                        ->preload()
                        ->nullable(),

                    TextInput::make('icon')
                        ->label('Icon (heroicon name or emoji)')
                        ->placeholder('heroicon-o-squares-2x2 or 🏷️')
                        ->maxLength(100),

                    Select::make('is_active')
                        ->label('Status')
                        ->options([1 => 'Active', 0 => 'Inactive'])
                        ->default(1)
                        ->native(false),

                    TextInput::make('sort_order')
                        ->numeric()
                        ->default(0)
                        ->minValue(0),

                    Textarea::make('description')
                        ->label('Short Description')
                        ->maxLength(500)
                        ->rows(3)
                        ->columnSpanFull(),
                ]),

            Section::make('Image')
                ->schema([
                    FileUpload::make('image')
                        ->image()
                        ->disk('public')
                        ->directory('categories')
                        ->imageEditor()
                        ->maxSize(4096)
                        ->columnSpanFull(),
                ]),

            Section::make('Category Highlights & Actions')
                ->description('Optional: Add feature bullet points and action buttons shown on the homepage category cards.')
                ->schema([
                    Repeater::make('custom_attributes.features')
                        ->label('Feature Highlights')
                        ->schema([
                            TextInput::make('feature')->label('Highlight Item')->required(),
                        ])
                        ->addActionLabel('Add highlight item')
                        ->defaultItems(0)
                        ->columns(1)
                        ->columnSpanFull(),

                    Repeater::make('custom_attributes.buttons')
                        ->label('Action Buttons')
                        ->helperText('Link this category card to key pages (e.g. /contact, /products, /categories/copra-dryers)')
                        ->schema([
                            TextInput::make('label')
                                ->label('Button Label')
                                ->required()
                                ->placeholder('e.g. View Products, Get Quote, Learn More'),
                            TextInput::make('url')
                                ->label('Page URL / Link')
                                ->required()
                                ->placeholder('e.g. /contact, /products, /categories/copra-dryers'),
                            Select::make('style')
                                ->label('Button Style')
                                ->options([
                                    'primary'   => 'Primary (Solid)',
                                    'secondary' => 'Secondary (Dark)',
                                    'light'     => 'Light (Outlined)',
                                ])
                                ->default('primary')
                                ->native(false),
                        ])
                        ->addActionLabel('Add Action Button')
                        ->columns(3)
                        ->columnSpanFull(),

                    TextInput::make('custom_attributes.phone')
                        ->label('Contact Phone (Optional)')
                        ->placeholder('+91 98765 43210'),

                    TextInput::make('custom_attributes.email')
                        ->label('Contact Email (Optional)')
                        ->placeholder('info@essartechins.co.in'),
                ])
                ->columns(2)
                ->collapsible(),
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
                TextColumn::make('name')
                    ->label(DomainConfigService::getCategoryLabel() . ' Name')
                    ->searchable()
                    ->sortable(),
                TextColumn::make('parent.name')
                    ->label('Parent')
                    ->placeholder('-')
                    ->sortable(),
                TextColumn::make('services_count')
                    ->label(DomainConfigService::getServiceLabel(true))
                    ->counts('services')
                    ->badge()
                    ->color('info'),
                ToggleColumn::make('is_active')->label('Active'),
                TextColumn::make('updated_at')->since()->sortable(),
            ])
            ->defaultSort('sort_order')
            ->reorderable('sort_order')
            ->filters([
                Tables\Filters\TernaryFilter::make('is_active')->label('Active'),
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
            'index'  => Pages\ListCategories::route('/'),
            'create' => Pages\CreateCategory::route('/create'),
            'edit'   => Pages\EditCategory::route('/{record}/edit'),
        ];
    }
}
