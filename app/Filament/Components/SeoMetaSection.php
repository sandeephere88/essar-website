<?php

namespace App\Filament\Components;

use Filament\Forms\Components\Section;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\FileUpload;

class SeoMetaSection
{
    public static function make(string $relationshipName = 'seoMeta'): Section
    {
        return Section::make('SEO & Meta Information')
            ->description('Define SEO metadata to optimize search engine ranking and social sharing.')
            ->relationship($relationshipName)
            ->collapsible()
            ->collapsed()
            ->schema([
                TextInput::make('meta_title')
                    ->label('Meta Title')
                    ->placeholder('e.g., About Us | Company Name')
                    ->maxLength(255),

                Textarea::make('meta_description')
                    ->label('Meta Description')
                    ->placeholder('Brief summary of the page (under 160 characters)')
                    ->rows(3),

                TextInput::make('meta_keywords')
                    ->label('Meta Keywords')
                    ->placeholder('e.g., about, services, team'),

                TextInput::make('canonical_url')
                    ->label('Canonical URL')
                    ->placeholder('e.g., https://example.com/about')
                    ->url()
                    ->maxLength(255),

                FileUpload::make('og_image')
                    ->label('OG Image (Social Sharing)')
                    ->image()
                    ->directory('seo/og-images')
                    ->imageResizeMode('force')
                    ->imageCropAspectRatio('1200:630')
                    ->imageResizeTargetWidth('1200')
                    ->imageResizeTargetHeight('630'),
            ]);
    }
}
