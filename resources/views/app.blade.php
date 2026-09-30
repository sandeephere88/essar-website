<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title inertia>{{ config('app.name', 'Essar Techins') }}</title>
        
        @php
            $props = $page['props'] ?? [];
            $seoMeta = $props['seo_meta'] 
                       ?? ($props['page']['seo_meta'] ?? null) 
                       ?? ($props['service']['seo_meta'] ?? null)
                       ?? ($props['category']['seo_meta'] ?? null)
                       ?? ($props['department']['seo_meta'] ?? null) 
                       ?? ($props['doctor']['seo_meta'] ?? null)
                       ?? null;
                       
            $ogImage = null;
            if (!empty($seoMeta['og_image'])) {
                $ogImage = asset('storage/' . $seoMeta['og_image']);
            } elseif (!empty($props['service']['image_url'])) {
                $ogImage = str_starts_with($props['service']['image_url'], 'http') ? $props['service']['image_url'] : asset('storage/' . $props['service']['image_url']);
            } elseif (!empty($props['category']['image_url'])) {
                $ogImage = str_starts_with($props['category']['image_url'], 'http') ? $props['category']['image_url'] : asset('storage/' . $props['category']['image_url']);
            } elseif (!empty($props['page']['hero_image'])) {
                $ogImage = asset('storage/' . $props['page']['hero_image']);
            }
        @endphp

        @if($seoMeta)
            <meta name="description" content="{{ $seoMeta['seo_description'] ?? '' }}">
            <meta property="og:title" content="{{ $seoMeta['seo_title'] ?? '' }}">
            <meta property="og:description" content="{{ $seoMeta['seo_description'] ?? '' }}">
        @endif
        
        @if($ogImage)
            <meta property="og:image" content="{{ $ogImage }}">
            <meta name="twitter:image" content="{{ $ogImage }}">
            <meta name="twitter:card" content="summary_large_image">
        @endif

        <!-- Fonts -->
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,100..1000;1,9..40,100..1000&family=Figtree:ital,wght@0,300..900;1,300..900&display=swap" rel="stylesheet">

        <!-- Scripts -->
        @routes
        @viteReactRefresh
        @vite(['resources/js/app.jsx', "resources/js/Pages/{$page['component']}.jsx"])
        @inertiaHead
    </head>
    <body class="font-sans antialiased">
        @inertia
    </body>
</html>
