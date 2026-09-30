<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\TeamMember;
use App\Services\DomainConfigService;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class TeamController extends Controller
{
    public function index(Request $request): Response
    {
        if (!DomainConfigService::hasTeam()) {
            abort(404);
        }

        $query = TeamMember::query()->active()->with('category')->ordered();

        if ($request->filled('category')) {
            $query->whereHas('category', function ($q) use ($request) {
                $q->where('slug', $request->category);
            });
        }

        if ($request->filled('search')) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                  ->orWhere('designation', 'like', "%{$search}%")
                  ->orWhere('qualification', 'like', "%{$search}%");
            });
        }

        $teamMembers = $query->paginate(12)->withQueryString();
        $categories = Category::query()->active()->ordered()->get();

        return Inertia::render('Team/Index', [
            'teamMembers' => $teamMembers,
            'categories'  => $categories,
            'filters'     => $request->only(['category', 'search']),
            'domainTerms' => DomainConfigService::toArray(),
        ]);
    }

    public function show(string $slug): Response
    {
        if (!DomainConfigService::hasTeam()) {
            abort(404);
        }

        $member = TeamMember::where('slug', $slug)
            ->where('is_active', true)
            ->with('category')
            ->firstOrFail();

        return Inertia::render('Team/Show', [
            'member'      => $member,
            'seoMeta'     => $member->seoMeta,
            'domainTerms' => DomainConfigService::toArray(),
        ]);
    }
}
