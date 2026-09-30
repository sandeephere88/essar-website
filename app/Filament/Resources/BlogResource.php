<?php

namespace App\Filament\Resources;

use App\Filament\Resources\BlogResource\Pages;
use App\Models\Blog;
use Filament\Forms;
use Filament\Forms\Components\DateTimePicker;
use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\RichEditor;
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
use Illuminate\Support\Str;

class BlogResource extends Resource
{
    protected static ?string $model = Blog::class;
    protected static ?string $navigationIcon = 'heroicon-o-pencil-square';
    protected static ?string $navigationGroup = 'Content';
    protected static ?int $navigationSort = 30;

    public static function form(Form $form): Form
    {
        return $form->schema([
            Section::make('Blog Details')
                ->columns(2)
                ->schema([
                    TextInput::make('title')
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

                    Select::make('is_active')
                        ->label('Status')
                        ->options([1 => 'Active', 0 => 'Inactive'])
                        ->default(1)
                        ->native(false),

                    DateTimePicker::make('published_at')
                        ->label('Publish Date & Time')
                        ->default(now()),
                ]),

            Section::make('Cover & Gallery Images')
                ->schema([
                    FileUpload::make('image')
                        ->label('Main Cover Image')
                        ->image()
                        ->disk('public')
                        ->directory('blogs')
                        ->imageEditor()
                        ->maxSize(4096),

                    FileUpload::make('gallery')
                        ->label('Multiple Blog Gallery Images')
                        ->multiple()
                        ->image()
                        ->panelLayout('grid')
                        ->disk('public')
                        ->directory('blogs/gallery')
                        ->reorderable()
                        ->maxFiles(20)
                        ->columnSpanFull()
                        ->helperText('Upload multiple images for this blog post. They will be displayed in an interactive gallery format on the blog detail page.'),
                ]),

            Section::make('Blog Content')
                ->schema([
                    RichEditor::make('content')
                        ->fileAttachmentsDisk('public')
                        ->fileAttachmentsDirectory('blogs/content')
                        ->toolbarButtons([
                            'attachFiles',
                            'bold', 'italic', 'underline', 'strike',
                            'h2', 'h3', 'bulletList', 'orderedList',
                            'link', 'blockquote', 'undo', 'redo',
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
                ImageColumn::make('image')->circular()->size(48),
                TextColumn::make('title')->searchable()->sortable(),
                TextColumn::make('slug')->badge()->color('gray'),
                ToggleColumn::make('is_active')->label('Active'),
                TextColumn::make('published_at')->dateTime()->sortable(),
            ])
            ->defaultSort('published_at', 'desc')
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
            'index'  => Pages\ListBlogs::route('/'),
            'create' => Pages\CreateBlog::route('/create'),
            'edit'   => Pages\EditBlog::route('/{record}/edit'),
        ];
    }
}
