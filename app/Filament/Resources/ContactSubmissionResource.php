<?php

namespace App\Filament\Resources;

use App\Enums\ContactRole;
use App\Filament\Resources\ContactSubmissionResource\Pages;
use App\Models\ContactSubmission;
use Filament\Forms\Components\Section;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Columns\SelectColumn;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Model;

class ContactSubmissionResource extends Resource
{
    protected static ?string $model = ContactSubmission::class;
    protected static ?string $navigationIcon = 'heroicon-o-inbox';
    protected static ?string $navigationGroup = 'Inquiries';
    protected static ?string $navigationLabel = 'Product Inquiries';
    protected static ?int $navigationSort = 10;

    public static function canCreate(): bool
    {
        return false;
    }

    public static function form(Form $form): Form
    {
        return $form->schema([
            Section::make('Sender Details')
                ->columns(2)
                ->schema([
                    TextInput::make('first_name')->label('First Name')->disabled(),
                    TextInput::make('last_name')->label('Last Name')->disabled(),
                    TextInput::make('name')->label('Full Name')->disabled(),
                    TextInput::make('email')->disabled(),
                    TextInput::make('phone')->disabled(),
                    Select::make('role')
                        ->label('Sender Role (I\'m a...)')
                        ->options(ContactRole::options())
                        ->disabled(),
                    TextInput::make('subject')->disabled(),
                ]),

            Section::make('Inquiry Message / Additional Info')
                ->schema([
                    Textarea::make('message')
                        ->rows(6)
                        ->disabled()
                        ->columnSpanFull(),
                ]),

            Section::make('Management Status')
                ->schema([
                    Select::make('status')
                        ->options([
                            'new' => 'New',
                            'responded' => 'Responded',
                        ])
                        ->required()
                        ->native(false),
                ]),
        ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('created_at')
                    ->label('Date')
                    ->dateTime()
                    ->sortable(),

                TextColumn::make('name')
                    ->label('Name')
                    ->searchable(['name', 'first_name', 'last_name'])
                    ->sortable(),

                TextColumn::make('role')
                    ->label('Inquiry Type')
                    ->formatStateUsing(fn ($state) => ContactRole::tryFrom($state ?? '')?->label() ?? ($state ? ucfirst(str_replace('_', ' ', $state)) : 'General'))
                    ->badge()
                    ->color(fn ($state) => match ($state) {
                        'business_inquiry', 'health_care_organization' => 'info',
                        'technical_support', 'professional_looking_for_work' => 'success',
                        'others', 'staffing_agency' => 'warning',
                        default => 'gray',
                    }),

                TextColumn::make('email')
                    ->searchable()
                    ->copyable(),

                TextColumn::make('phone')
                    ->searchable(),

                SelectColumn::make('status')
                    ->options([
                        'new' => 'New',
                        'responded' => 'Responded',
                    ])
                    ->sortable(),
            ])
            ->defaultSort('created_at', 'desc')
            ->filters([
                Tables\Filters\SelectFilter::make('role')
                    ->label('Sender Role')
                    ->options(ContactRole::options()),
                Tables\Filters\SelectFilter::make('status')
                    ->options([
                        'new' => 'New',
                        'responded' => 'Responded',
                    ]),
            ])
            ->actions([
                Tables\Actions\ViewAction::make(),
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
            'index' => Pages\ListContactSubmissions::route('/'),
            'edit'  => Pages\EditContactSubmission::route('/{record}/edit'),
        ];
    }
}
