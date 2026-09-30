<?php

namespace App\Filament\Resources;

use App\Filament\Resources\TeamMemberResource\Pages;
use App\Models\Category;
use App\Models\TeamMember;
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

class TeamMemberResource extends Resource
{
    protected static ?string $model = TeamMember::class;
    protected static ?string $navigationIcon = 'heroicon-o-user-group';
    protected static ?int $navigationSort = 30;

    public static function shouldRegisterNavigation(): bool
    {
        return DomainConfigService::hasTeam();
    }

    public static function getNavigationGroup(): ?string
    {
        return DomainConfigService::getBusinessType();
    }

    public static function getNavigationLabel(): string
    {
        return DomainConfigService::getTeamLabel(true);
    }

    public static function getModelLabel(): string
    {
        return DomainConfigService::getTeamLabel(false);
    }

    public static function getPluralModelLabel(): string
    {
        return DomainConfigService::getTeamLabel(true);
    }

    public static function form(Form $form): Form
    {
        return $form->schema([
            Section::make('Profile Information')
                ->columns(2)
                ->schema([
                    TextInput::make('name')
                        ->label('Name')
                        ->required()
                        ->maxLength(255)
                        ->live(debounce: 500)
                        ->afterStateUpdated(fn ($state, Forms\Set $set) =>
                            $set('slug', Str::slug($state))
                        ),

                    TextInput::make('slug')
                        ->required()
                        ->unique(ignoreRecord: true)
                        ->maxLength(255),

                    TextInput::make('designation')
                        ->label('Designation / Role')
                        ->placeholder('e.g. Senior Specialist / Lead Driver / Consultant')
                        ->maxLength(255),

                    TextInput::make('qualification')
                        ->label('Qualification / Specialization')
                        ->placeholder('e.g. MBBS, MD / Commercial License / B.Tech')
                        ->maxLength(255),

                    Select::make('category_id')
                        ->label(DomainConfigService::getCategoryLabel())
                        ->options(fn () => Category::pluck('name', 'id'))
                        ->searchable()
                        ->preload()
                        ->nullable(),

                    TextInput::make('experience_years')
                        ->label('Years of Experience')
                        ->numeric()
                        ->default(0),

                    Select::make('is_active')
                        ->label('Status')
                        ->options([1 => 'Active', 0 => 'Inactive'])
                        ->default(1)
                        ->native(false),

                    TextInput::make('sort_order')
                        ->numeric()
                        ->default(0)
                        ->minValue(0),

                    Textarea::make('bio')
                        ->label('Biography / Overview')
                        ->rows(4)
                        ->columnSpanFull(),
                ]),

            Section::make('Photo & Media')
                ->schema([
                    FileUpload::make('image')
                        ->label('Profile Photo')
                        ->image()
                        ->disk('public')
                        ->directory('team')
                        ->imageEditor()
                        ->maxSize(4096)
                        ->columnSpanFull(),
                ]),

            Section::make('Contact Details (Optional)')
                ->collapsed()
                ->schema([
                    Repeater::make('contact_info')
                        ->schema([
                            TextInput::make('type')->placeholder('Email / Phone / LinkedIn'),
                            TextInput::make('value')->placeholder('john@example.com'),
                        ])
                        ->columns(2),
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
                TextColumn::make('name')
                    ->label('Name')
                    ->searchable()
                    ->sortable(),
                TextColumn::make('designation')
                    ->label('Designation')
                    ->placeholder('-'),
                TextColumn::make('category.name')
                    ->label(DomainConfigService::getCategoryLabel())
                    ->placeholder('-'),
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
            'index'  => Pages\ListTeamMembers::route('/'),
            'create' => Pages\CreateTeamMember::route('/create'),
            'edit'   => Pages\EditTeamMember::route('/{record}/edit'),
        ];
    }
}
