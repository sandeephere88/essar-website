<?php

namespace App\Filament\Resources\PageResource\Pages;

use App\Filament\Resources\PageResource;
use Filament\Resources\Pages\EditRecord;

class EditPage extends EditRecord
{
    protected static string $resource = PageResource::class;

    protected function getHeaderActions(): array
    {
        return [
            \Filament\Actions\Action::make('preview')
                ->label('Preview')
                ->icon('heroicon-o-eye')
                ->url(fn () => \Illuminate\Support\Facades\URL::signedRoute('pages.show', ['slug' => $this->record->slug]))
                ->openUrlInNewTab(),
        ];
    }
}
