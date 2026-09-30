<x-filament-panels::page>
    <div
        id="menu-builder-root"
        data-menu-id="{{ $this->record->id }}"
        data-menu-name="{{ $this->record->name }}"
        data-api-url="{{ url('/api/admin/menus/' . $this->record->id . '/builder') }}"
        data-csrf="{{ csrf_token() }}"
    ></div>

    @viteReactRefresh
    @vite('resources/js/menu-builder.jsx')
</x-filament-panels::page>
