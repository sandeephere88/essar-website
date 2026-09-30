<?php

namespace App\Filament\Resources;

use App\Filament\Resources\DoctorResource\Pages;
use App\Models\Department;
use App\Models\Doctor;
use Filament\Forms;
use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\Grid;
use Filament\Forms\Components\Repeater;
use Filament\Forms\Components\RichEditor;
use Filament\Forms\Components\Section;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Toggle;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Columns\ImageColumn;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Columns\ToggleColumn;
use Filament\Tables\Table;
use Illuminate\Support\Str;

class DoctorResource extends Resource
{
    protected static ?string $model = Doctor::class;
    protected static ?string $navigationIcon = 'heroicon-o-user-group';
    protected static ?string $navigationGroup = 'Team';
    protected static ?int $navigationSort = 20;
    protected static bool $shouldRegisterNavigation = false;

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

                    Select::make('department_id')
                        ->label('Department')
                        ->options(Department::orderBy('name')->pluck('name', 'id'))
                        ->searchable()
                        ->preload()
                        ->required(),

                    TextInput::make('designation')
                        ->placeholder('e.g. Senior Consultant')
                        ->maxLength(255),

                    TextInput::make('specialization')
                        ->placeholder('e.g. Cardiothoracic Surgery')
                        ->maxLength(255),

                    TextInput::make('experience_years')
                        ->label('Experience (years)')
                        ->numeric()
                        ->minValue(0)
                        ->maxValue(60)
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
                ]),

            Section::make('Profile Photo')
                ->schema([
                    FileUpload::make('image')
                        ->image()
                        ->disk('public')
                        ->directory('doctors')
                        ->imageEditor()
                        ->avatar()
                        ->maxSize(4096),
                ]),

            Section::make('Education')
                ->description('Add degrees, institutions and graduation years')
                ->schema([
                    Repeater::make('educations')
                        ->relationship('educations')
                        ->schema([
                            Grid::make(3)->schema([
                                TextInput::make('degree')
                                    ->required()
                                    ->placeholder('MBBS, MD, MS, FRCS…'),
                                TextInput::make('institution')
                                    ->required()
                                    ->placeholder('University / College name'),
                                TextInput::make('year')
                                    ->numeric()
                                    ->minValue(1950)
                                    ->maxValue(now()->year)
                                    ->placeholder((string) now()->year),
                            ]),
                        ])
                        ->addActionLabel('+ Add Qualification')
                        ->collapsible()
                        ->defaultItems(0)
                        ->orderColumn('sort_order')
                        ->columnSpanFull(),
                ]),

            Section::make('Biography')
                ->schema([
                    RichEditor::make('bio')
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
                TextColumn::make('sort_order')->label('#')->sortable()->width(50),
                ImageColumn::make('image')->label('')->circular()->size(48),
                TextColumn::make('name')->searchable()->sortable(),
                TextColumn::make('department.name')
                    ->label('Department')
                    ->badge()
                    ->color('primary')
                    ->searchable(),
                TextColumn::make('designation')->searchable(),
                TextColumn::make('experience_years')->label('Exp (yrs)')->sortable(),
                ToggleColumn::make('is_active')->label('Active'),
                TextColumn::make('updated_at')->since()->sortable(),
            ])
            ->defaultSort('sort_order')
            ->reorderable('sort_order')
            ->filters([
                Tables\Filters\SelectFilter::make('department_id')
                    ->label('Department')
                    ->options(Department::orderBy('name')->pluck('name', 'id'))
                    ->searchable(),
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
            'index'  => Pages\ListDoctors::route('/'),
            'create' => Pages\CreateDoctor::route('/create'),
            'edit'   => Pages\EditDoctor::route('/{record}/edit'),
        ];
    }
}
