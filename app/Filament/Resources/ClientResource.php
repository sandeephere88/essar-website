<?php

namespace App\Filament\Resources;

use App\Filament\Resources\ClientResource\Pages;
use App\Models\Client;
use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\Section;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Columns\ImageColumn;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Columns\ToggleColumn;
use Filament\Tables\Table;

class ClientResource extends Resource
{
    protected static ?string $model = Client::class;
    protected static ?string $navigationIcon = 'heroicon-o-building-office';
    protected static ?string $navigationGroup = 'Content';
    protected static ?string $navigationLabel = 'Client Logos';
    protected static ?int $navigationSort = 75;

    public static function form(Form $form): Form
    {
        return $form->schema([
            Section::make('Client Details')
                ->columns(2)
                ->schema([
                    TextInput::make('name')
                        ->label('Client Name')
                        ->placeholder('e.g. Tata Oil Mills, KPL Oil, etc.')
                        ->required()
                        ->maxLength(255),

                    TextInput::make('website')
                        ->label('Website / Link (Optional)')
                        ->placeholder('https://example.com')
                        ->url()
                        ->maxLength(255),

                    Select::make('is_active')
                        ->label('Status')
                        ->options([1 => 'Active', 0 => 'Inactive'])
                        ->default(1)
                        ->native(false),

                    TextInput::make('sort_order')
                        ->label('Sort Order')
                        ->numeric()
                        ->default(0),
                ]),

            Section::make('Client Logo')
                ->schema([
                    FileUpload::make('logo')
                        ->label('Client Logo Image')
                        ->image()
                        ->disk('public')
                        ->directory('clients')
                        ->imageEditor()
                        ->maxSize(2048)
                        ->helperText('Upload PNG, JPG, or SVG logo.'),
                ]),
        ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('sort_order')->label('#')->sortable(),
                ImageColumn::make('logo')->square()->size(48)->label('Logo'),
                TextColumn::make('name')->label('Client Name')->searchable()->sortable(),
                TextColumn::make('website')->label('Website')->searchable()->toggleable(isToggledHiddenByDefault: true),
                ToggleColumn::make('is_active')->label('Active'),
                TextColumn::make('updated_at')->label('Last Updated')->dateTime()->sortable(),
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
            'index'  => Pages\ListClients::route('/'),
            'create' => Pages\CreateClient::route('/create'),
            'edit'   => Pages\EditClient::route('/{record}/edit'),
        ];
    }
}
