<?php

namespace App\Filament\Resources;

use App\Filament\Resources\AccreditationResource\Pages;
use App\Models\Accreditation;
use Filament\Forms\Components\FileUpload;
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

class AccreditationResource extends Resource
{
    protected static ?string $model = Accreditation::class;
    protected static ?string $navigationIcon = 'heroicon-o-shield-check';
    protected static ?string $navigationGroup = 'Content';
    protected static ?string $navigationLabel = 'Certifications';
    protected static ?int $navigationSort = 70;

    public static function form(Form $form): Form
    {
        return $form->schema([
            Section::make('Accreditation / Certification Details')
                ->columns(2)
                ->schema([
                    TextInput::make('title')
                        ->required()
                        ->maxLength(255),

                    Select::make('is_active')
                        ->label('Status')
                        ->options([1 => 'Active', 0 => 'Inactive'])
                        ->default(1)
                        ->native(false),

                    TextInput::make('sort_order')
                        ->numeric()
                        ->default(0),
                ]),

            Section::make('Logo / Image')
                ->schema([
                    FileUpload::make('logo')
                        ->image()
                        ->disk('public')
                        ->directory('accreditations')
                        ->imageEditor()
                        ->maxSize(2048),
                ]),

            Section::make('Description')
                ->schema([
                    Textarea::make('description')
                        ->rows(4)
                        ->columnSpanFull(),
                ]),
        ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('sort_order')->label('#')->sortable(),
                ImageColumn::make('logo')->circular()->size(48),
                TextColumn::make('title')->searchable()->sortable(),
                ToggleColumn::make('is_active')->label('Active'),
                TextColumn::make('updated_at')->dateTime()->sortable(),
            ])
            ->defaultSort('sort_order')
            ->reorderable('sort_order')
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
            'index'  => Pages\ListAccreditations::route('/'),
            'create' => Pages\CreateAccreditation::route('/create'),
            'edit'   => Pages\EditAccreditation::route('/{record}/edit'),
        ];
    }
}
