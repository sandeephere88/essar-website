<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Service;
use App\Services\DomainConfigService;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ServiceController extends Controller
{
    public function index(Request $request): Response
    {
        $query = Service::query()->active()->with('category')->ordered();

        if ($request->filled('category')) {
            $query->whereHas('category', function ($q) use ($request) {
                $q->where('slug', $request->category);
            });
        }

        if ($request->filled('search')) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('title', 'like', "%{$search}%")
                  ->orWhere('short_description', 'like', "%{$search}%");
            });
        }

        $services = $query->paginate(12)->withQueryString();
        $categories = Category::query()->active()->ordered()->get();

        return Inertia::render('Services/Index', [
            'services'    => $services,
            'categories'  => $categories,
            'filters'     => $request->only(['category', 'search']),
            'domainTerms' => DomainConfigService::toArray(),
        ]);
    }

    public function show(string $slug): Response
    {
        $service = Service::where('slug', $slug)
            ->where('is_active', true)
            ->with('category')
            ->firstOrFail();

        $relatedServices = Service::where('category_id', $service->category_id)
            ->where('id', '!=', $service->id)
            ->where('is_active', true)
            ->limit(3)
            ->get();

        return Inertia::render('Services/Show', [
            'service'         => $service,
            'relatedServices' => $relatedServices,
            'seoMeta'         => $service->seoMeta,
            'domainTerms'     => DomainConfigService::toArray(),
        ]);
    }
}
