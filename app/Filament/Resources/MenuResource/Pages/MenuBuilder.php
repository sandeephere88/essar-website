<?php

namespace App\Filament\Resources\MenuResource\Pages;

use App\Filament\Resources\MenuResource;
use App\Models\Menu;
use Filament\Actions\Action;
use Filament\Actions\DeleteAction;
use Filament\Resources\Pages\Concerns\InteractsWithRecord;
use Filament\Resources\Pages\Page;

class MenuBuilder extends Page
{
    use InteractsWithRecord;

    protected static string $resource = MenuResource::class;
    protected static string $view = 'filament.pages.menu-builder-page';
    protected static ?string $title = 'Menu Builder';


    public function mount(int|string $record): void
    {
        $this->record = $this->resolveRecord($record);
        static::authorizeResourceAccess();
    }

    protected function getHeaderActions(): array
    {
        return [
            DeleteAction::make()
                ->record($this->record)
                ->successRedirectUrl(MenuResource::getUrl()),
            Action::make('back')
                ->label('← Back to Menu')
                ->url(MenuResource::getUrl('edit', ['record' => $this->record]))
                ->color('gray'),
        ];
    }

    public function getBreadcrumbs(): array
    {
        return [
            MenuResource::getUrl() => 'Menus',
            MenuResource::getUrl('edit', ['record' => $this->record]) => $this->record->name,
            '' => 'Builder',
        ];
    }
}
