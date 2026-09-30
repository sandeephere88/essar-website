<?php

namespace App\Filament\Resources;

use App\Filament\Resources\PolicyResource\Pages;
use App\Models\Policy;
use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\Section;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Actions\Action;
use Filament\Tables\Columns\BadgeColumn;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Columns\ToggleColumn;
use Filament\Tables\Table;
use Illuminate\Support\Facades\Storage;

class PolicyResource extends Resource
{
    protected static ?string $model = Policy::class;
    protected static ?string $navigationIcon = 'heroicon-o-document-check';
    protected static ?string $navigationGroup = 'Settings';
    protected static ?string $navigationLabel = 'Policies';
    protected static ?int $navigationSort = 30;

    public static function form(Form $form): Form
    {
        return $form->schema([
            Section::make('Policy Details')
                ->columns(2)
                ->schema([
                    TextInput::make('title')
                        ->required()
                        ->maxLength(255)
                        ->columnSpan(2),

                    Select::make('category')
                        ->options([
                            'Legal'      => 'Legal',
                            'Compliance' => 'Compliance',
                            'HR'         => 'HR',
                            'Governance' => 'Governance',
                            'Other'      => 'Other',
                        ])
                        ->native(false)
                        ->searchable(),

                    Select::make('is_active')
                        ->label('Status')
                        ->options([1 => 'Active', 0 => 'Inactive'])
                        ->default(1)
                        ->native(false),

                    TextInput::make('sort_order')
                        ->numeric()
                        ->default(0)
                        ->label('Sort Order'),
                ]),

            Section::make('PDF File')
                ->schema([
                    FileUpload::make('file_path')
                        ->label('Upload PDF')
                        ->required()
                        ->disk('public')
                        ->directory('policies')
                        ->acceptedFileTypes(['application/pdf'])
                        ->maxSize(20480) // 20 MB
                        ->downloadable()
                        ->openable()
                        ->helperText('Maximum file size: 20 MB. Only PDF files are accepted.'),
                ]),

            Section::make('Description')
                ->schema([
                    Textarea::make('description')
                        ->rows(4)
                        ->columnSpanFull()
                        ->helperText('Brief summary shown to users on the policies page.'),
                ]),
        ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('sort_order')->label('#')->sortable(),
                TextColumn::make('title')->searchable()->sortable()->wrap(),
                TextColumn::make('category')
                    ->badge()
                    ->color(fn (string $state): string => match ($state) {
                        'Legal'      => 'danger',
                        'Compliance' => 'warning',
                        'HR'         => 'success',
                        'Governance' => 'info',
                        default      => 'gray',
                    }),
                ToggleColumn::make('is_active')->label('Active'),
                TextColumn::make('updated_at')->dateTime()->sortable()->label('Last Updated'),
            ])
            ->defaultSort('sort_order')
            ->reorderable('sort_order')
            ->actions([
                Action::make('view_pdf')
                    ->label('View PDF')
                    ->icon('heroicon-o-eye')
                    ->color('info')
                    ->url(fn (Policy $record): string => route('policies.show', $record))
                    ->openUrlInNewTab(),
                Tables\Actions\EditAction::make(),
                Tables\Actions\DeleteAction::make()
                    ->after(function (Policy $record) {
                        // Clean up the file from storage when the record is deleted
                        if ($record->file_path && Storage::disk('public')->exists($record->file_path)) {
                            Storage::disk('public')->delete($record->file_path);
                        }
                    }),
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
            'index'  => Pages\ListPolicies::route('/'),
            'create' => Pages\CreatePolicy::route('/create'),
            'edit'   => Pages\EditPolicy::route('/{record}/edit'),
        ];
    }
}
