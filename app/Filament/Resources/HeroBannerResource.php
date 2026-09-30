<?php

namespace App\Filament\Resources;

use App\Filament\Resources\HeroBannerResource\Pages;
use App\Filament\Resources\HeroBannerResource\RelationManagers;
use App\Models\HeroBanner;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;

class HeroBannerResource extends Resource
{
    protected static ?string $model = HeroBanner::class;
    protected static ?string $navigationIcon = 'heroicon-o-presentation-chart-bar';
    protected static ?string $navigationGroup = 'Content';
    protected static ?string $navigationLabel = 'Hero Banners';
    protected static ?int $navigationSort = 10;

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\Section::make('Banner Content')
                    ->schema([
                        Forms\Components\TextInput::make('title')
                            ->helperText('Main title text (e.g. Compassionate Care,)')
                            ->maxLength(255),
                        Forms\Components\TextInput::make('italic_title')
                            ->helperText('Italicized title text (e.g. Advanced Medicine)')
                            ->maxLength(255),
                        Forms\Components\Textarea::make('subtitle')
                            ->helperText('Slogan or description paragraph')
                            ->columnSpanFull(),
                    ])->columns(2),

                Forms\Components\Section::make('Call-To-Actions')
                    ->schema([
                        Forms\Components\TextInput::make('button_one_text')
                            ->label('Button 1 Text')
                            ->maxLength(255),
                        Forms\Components\TextInput::make('button_one_url')
                            ->label('Button 1 URL')
                            ->maxLength(255),
                        Forms\Components\TextInput::make('button_two_text')
                            ->label('Button 2 Text')
                            ->maxLength(255),
                        Forms\Components\TextInput::make('button_two_url')
                            ->label('Button 2 URL')
                            ->maxLength(255),
                    ])->columns(2),

                Forms\Components\Section::make('Media & Settings')
                    ->schema([
                        Forms\Components\FileUpload::make('image')
                            ->image()
                            ->directory('hero-banners')
                            ->imageEditor()
                            ->columnSpanFull(),
                        Forms\Components\Toggle::make('is_active')
                            ->default(true)
                            ->required(),
                        Forms\Components\TextInput::make('sort_order')
                            ->required()
                            ->numeric()
                            ->default(0),
                    ])->columns(2),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('title')
                    ->searchable(),
                Tables\Columns\TextColumn::make('italic_title')
                    ->searchable(),
                Tables\Columns\TextColumn::make('button_one_text')
                    ->searchable(),
                Tables\Columns\TextColumn::make('button_one_url')
                    ->searchable(),
                Tables\Columns\TextColumn::make('button_two_text')
                    ->searchable(),
                Tables\Columns\TextColumn::make('button_two_url')
                    ->searchable(),
                Tables\Columns\ImageColumn::make('image'),
                Tables\Columns\IconColumn::make('is_active')
                    ->boolean(),
                Tables\Columns\TextColumn::make('sort_order')
                    ->numeric()
                    ->sortable(),
                Tables\Columns\TextColumn::make('created_at')
                    ->dateTime()
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
                Tables\Columns\TextColumn::make('updated_at')
                    ->dateTime()
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
            ])
            ->filters([
                //
            ])
            ->actions([
                Tables\Actions\EditAction::make(),
            ])
            ->bulkActions([
                Tables\Actions\BulkActionGroup::make([
                    Tables\Actions\DeleteBulkAction::make(),
                ]),
            ]);
    }

    public static function getRelations(): array
    {
        return [
            //
        ];
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListHeroBanners::route('/'),
            'create' => Pages\CreateHeroBanner::route('/create'),
            'edit' => Pages\EditHeroBanner::route('/{record}/edit'),
        ];
    }
}
