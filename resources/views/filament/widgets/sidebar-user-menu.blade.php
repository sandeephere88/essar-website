@php
    $user = auth()->user();
    if ($user) {
        $initials = collect(explode(' ', $user->name))
            ->map(fn ($segment) => mb_substr($segment, 0, 1))
            ->join('');
    }
@endphp

@if ($user)
    <div class="flex flex-col p-4 border-t border-gray-200 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-900/50">
        <div class="flex items-center gap-3">
            @if (method_exists($user, 'getFilamentAvatarUrl') && ($avatarUrl = $user->getFilamentAvatarUrl()))
                <img 
                    src="{{ $avatarUrl }}" 
                    alt="{{ $user->name }}" 
                    class="h-9 w-9 rounded-full object-cover border border-gray-200 dark:border-gray-800"
                />
            @else
                <div class="h-9 w-9 rounded-full bg-primary-600 text-white flex items-center justify-center font-bold text-sm tracking-wider uppercase">
                    {{ substr($initials, 0, 2) ?: 'U' }}
                </div>
            @endif
            <div class="flex-grow min-w-0">
                <p class="text-sm font-semibold text-gray-800 dark:text-gray-200 truncate">
                    Welcome, {{ $user->name }}
                </p>
                <p class="text-xs text-gray-500 truncate">
                    {{ $user->email }}
                </p>
            </div>
        </div>
        
        <form action="{{ route('filament.admin.auth.logout') }}" method="POST" class="mt-3">
            @csrf
            <button 
                type="submit" 
                class="flex items-center justify-center gap-2 w-full px-3 py-1.5 rounded-lg text-xs font-bold text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950/30 hover:bg-red-100 dark:hover:bg-red-900/40 transition-colors"
            >
                <x-filament::icon
                    icon="heroicon-m-arrow-left-on-rectangle"
                    class="h-4 w-4"
                />
                Logout
            </button>
        </form>
    </div>
@endif
