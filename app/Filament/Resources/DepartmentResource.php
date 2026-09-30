<?php

namespace App\Filament\Resources;

use App\Filament\Resources\DepartmentResource\Pages;
use App\Models\Department;
use Filament\Forms;
use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\Grid;
use Filament\Forms\Components\RichEditor;
use Filament\Forms\Components\Section;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Textarea;
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

class DepartmentResource extends Resource
{
    protected static ?string $model = Department::class;
    protected static bool $shouldRegisterNavigation = false;
    protected static ?string $navigationIcon = 'heroicon-o-building-office';
    protected static ?string $navigationGroup = 'Categories';
    protected static ?int $navigationSort = 10;

    /* ── Form ────────────────────────────────────────────────── */

    public static function form(Form $form): Form
    {
        return $form->schema([
            Section::make('Basic Information')
                ->columns(2)
                ->schema([
                    TextInput::make('name')
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
                    TextInput::make('icon')
                        ->label('Icon (heroicon name or emoji)')
                        ->placeholder('heroicon-o-heart or 🫀')
                        ->maxLength(100),
                    Forms\Components\Select::make('is_active')
                        ->label('Status')
                        ->options([1 => 'Active', 0 => 'Inactive'])
                        ->default(1)
                        ->native(false),
                    TextInput::make('sort_order')
                        ->numeric()
                        ->default(0)
                        ->minValue(0),
                    Textarea::make('short_desc')
                        ->label('Short Description (card teaser)')
                        ->maxLength(255)
                        ->rows(2)
                        ->columnSpanFull(),
                ]),

            Section::make('Image')
                ->schema([
                    FileUpload::make('image')
                        ->image()
                        ->disk('public')
                        ->directory('departments')
                        ->imageEditor()
                        ->maxSize(4096)
                        ->columnSpanFull(),
                ]),

            Section::make('Full Description')
                ->schema([
                    RichEditor::make('description')
                        ->toolbarButtons([
                            'bold', 'italic', 'underline', 'strike',
                            'h2', 'h3', 'bulletList', 'orderedList',
                            'link', 'blockquote', 'undo', 'redo',
                        ])
                        ->columnSpanFull(),
                ]),

            \App\Filament\Components\SeoMetaSection::make(),
        ]);
    }

    /* ── Table ───────────────────────────────────────────────── */

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('sort_order')
                    ->label('#')
                    ->sortable()
                    ->width(50),
                ImageColumn::make('image')
                    ->label('')
                    ->circular()
                    ->size(48),
                TextColumn::make('name')->searchable()->sortable(),
                TextColumn::make('icon')->label('Icon'),
                TextColumn::make('team_members_count')
                    ->label('Team Members')
                    ->counts('teamMembers')
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
            'index'  => Pages\ListDepartments::route('/'),
            'create' => Pages\CreateDepartment::route('/create'),
            'edit'   => Pages\EditDepartment::route('/{record}/edit'),
        ];
    }
}
