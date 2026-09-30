<x-dynamic-component
    :component="$getFieldWrapperView()"
    :field="$field"
>
    <div
        x-data="{ 
            state: $wire.$entangle('{{ $getStatePath() }}'),
            initPicker() {
                if (window.mountGradientPicker) {
                    window.mountGradientPicker('gradient-picker-{{ $getId() }}', this.state, (color) => {
                        this.state = color;
                    });
                } else {
                    setTimeout(() => this.initPicker(), 100);
                }
            }
        }"
        x-init="initPicker()"
        wire:ignore
    >
        <div id="gradient-picker-{{ $getId() }}" data-current-value="{{ $getState() }}"></div>
    </div>
</x-dynamic-component>
