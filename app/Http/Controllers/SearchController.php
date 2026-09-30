<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Doctor;
use App\Models\Department;
use App\Models\Page;

class SearchController extends Controller
{
    public function index(Request $request)
    {
        $query = $request->input('q', '');
        
        $results = [
            'doctors' => [],
            'departments' => [],
            'pages' => []
        ];
        
        if (!empty(trim($query))) {
            $results['doctors'] = Doctor::where('is_active', true)
                ->where(function($q) use ($query) {
                    $q->where('name', 'like', "%{$query}%")
                      ->orWhere('specialization', 'like', "%{$query}%")
                      ->orWhere('designation', 'like', "%{$query}%");
                })
                ->with('department:id,name,slug')
                ->limit(10)
                ->get()
                ->map(fn ($d) => [
                    'id' => $d->id,
                    'name' => $d->name,
                    'slug' => $d->slug,
                    'specialization' => $d->specialization,
                    'image_url' => $d->image_url,
                    'department_name' => $d->department?->name,
                ]);

            $results['departments'] = Department::where('is_active', true)
                ->where(function($q) use ($query) {
                    $q->where('name', 'like', "%{$query}%")
                      ->orWhere('short_desc', 'like', "%{$query}%")
                      ->orWhere('description', 'like', "%{$query}%");
                })
                ->limit(10)
                ->get()
                ->map(fn ($d) => [
                    'id' => $d->id,
                    'name' => $d->name,
                    'slug' => $d->slug,
                    'short_desc' => $d->short_desc,
                ]);

            $results['pages'] = Page::where('status', 'published')
                ->where(function($q) use ($query) {
                    $q->where('title', 'like', "%{$query}%")
                      ->orWhere('content', 'like', "%{$query}%");
                })
                ->limit(10)
                ->get()
                ->map(fn ($p) => [
                    'id' => $p->id,
                    'title' => $p->title,
                    'slug' => $p->slug,
                ]);
        }

        return Inertia::render('Search/Index', [
            'query' => $query,
            'results' => $results,
            'seo_meta' => [
                'seo_title' => 'Search Results for "' . $query . '" - ' . config('app.name'),
            ]
        ]);
    }
}
