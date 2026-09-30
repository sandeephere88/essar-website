@if($getRecord())
    <div id="menu-builder-root" data-menu-id="{{ $getRecord()->id }}"></div>
    @viteReactRefresh
    @vite('resources/js/menu-builder.jsx')
@else
    <div class="p-4 bg-yellow-50 text-yellow-800 rounded-lg border border-yellow-200">
        <strong>Save the menu first</strong> before using the builder.
    </div>
@endif
