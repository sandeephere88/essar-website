<x-filament-widgets::widget>
    <x-filament::section>
        <x-slot name="heading">
            <div class="flex items-center gap-2">
                <x-filament::icon
                    icon="heroicon-m-squares-2x2"
                    class="h-6 w-6 text-primary-600 dark:text-primary-400"
                />
                <span class="text-xl font-bold tracking-tight">Admin Quick Links</span>
            </div>
        </x-slot>

        <x-slot name="description">
            Navigate to any content management section or config page of the site.
        </x-slot>

        @php
            $colorClasses = [
                'info' => 'bg-blue-50 text-blue-700 dark:bg-blue-950/30 dark:text-blue-400',
                'success' => 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-400',
                'primary' => 'bg-primary-50 text-primary-700 dark:bg-primary-950/30 dark:text-primary-400',
                'warning' => 'bg-amber-50 text-amber-700 dark:bg-amber-950/30 dark:text-amber-400',
                'danger' => 'bg-red-50 text-red-700 dark:bg-red-950/30 dark:text-red-400',
                'gray' => 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400',
            ];
        @endphp

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
            @foreach($this->getLinks() as $link)
                @php
                    $classes = $colorClasses[$link['color']] ?? $colorClasses['gray'];
                @endphp
                <a 
                    href="{{ $link['url'] }}" 
                    class="flex flex-col p-4 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 hover:border-primary-500 hover:ring-1 hover:ring-primary-500 transition shadow-sm group"
                >
                    <div class="flex items-center gap-3">
                        <div class="p-2.5 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 group-hover:bg-primary-50 dark:group-hover:bg-primary-950 group-hover:text-primary-600 transition">
                            <x-filament::icon
                                icon="{{ $link['icon'] }}"
                                class="h-6 w-6"
                            />
                        </div>
                        <div class="flex-grow">
                            <h3 class="font-bold text-gray-800 dark:text-gray-200 group-hover:text-primary-600 transition text-sm">
                                {{ $link['title'] }}
                            </h3>
                            @if($link['count'] !== null)
                                <span class="inline-flex items-center rounded-full px-2 py-0.5 text-xs font-semibold mt-1 {{ $classes }}">
                                    {{ $link['count'] }} {{ $link['countLabel'] }}
                                </span>
                            @else
                                <span class="inline-flex items-center rounded-full px-2 py-0.5 text-xs font-semibold mt-1 {{ $classes }}">
                                    configuration
                                </span>
                            @endif
                        </div>
                    </div>
                    <p class="text-xs text-gray-500 dark:text-gray-400 mt-3 leading-relaxed">
                        {{ $link['description'] }}
                    </p>
                </a>
            @endforeach
        </div>
    </x-filament::section>
</x-filament-widgets::widget>
