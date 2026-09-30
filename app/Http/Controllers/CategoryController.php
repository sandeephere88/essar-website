<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Services\DomainConfigService;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class CategoryController extends Controller
{
    public function index(): Response
    {
        $categories = Category::query()
            ->active()
            ->withCount(['services', 'teamMembers'])
            ->ordered()
            ->get();

        return Inertia::render('Categories/Index', [
            'categories'  => $categories,
            'domainTerms' => DomainConfigService::toArray(),
        ]);
    }

    public function show(string $slug): Response
    {
        $category = Category::where('slug', $slug)
            ->where('is_active', true)
            ->with(['services' => fn ($q) => $q->active()->ordered(), 'teamMembers' => fn ($q) => $q->active()->ordered()])
            ->firstOrFail();

        return Inertia::render('Categories/Show', [
            'category'    => $category,
            'services'    => $category->services,
            'teamMembers' => $category->teamMembers,
            'domainTerms' => DomainConfigService::toArray(),
        ]);
    }
}
