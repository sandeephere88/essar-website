<?php

namespace App\Http\Controllers;

use App\Models\Department;
use Inertia\Inertia;
use Inertia\Response;

class DepartmentController extends Controller
{
    /**
     * /departments — grid of all active departments.
     */
    public function index(): Response
    {
        $departments = Department::active()
            ->ordered()
            ->get()
            ->map(fn ($d) => [
                'id'         => $d->id,
                'name'       => $d->name,
                'slug'       => $d->slug,
                'icon'       => $d->icon ?? '',
                'short_desc' => $d->short_desc ?? '',
                'image_url'  => $d->image_url ?? '',
            ]);

        return Inertia::render('Departments/Index', [
            'departments' => $departments,
        ]);
    }

    /**
     * /departments/{slug} — department detail + doctors list.
     */
    public function show(Department $department): Response
    {
        abort_if(! $department->is_active, 404);

        $doctors = $department->teamMembers()
            ->with('category:id,name,slug')
            ->select('id', 'category_id', 'name', 'slug', 'designation',
                'qualification', 'experience_years', 'image', 'sort_order')
            ->get()
            ->map(fn ($d) => [
                'id'               => $d->id,
                'name'             => $d->name,
                'slug'             => $d->slug,
                'designation'      => $d->designation ?? '',
                'specialization'   => $d->qualification ?? '',
                'experience_years' => $d->experience_years ?? 0,
                'image_url'        => $d->image_url ?? '',
                'department_name'  => $department->name,
                'department_slug'  => $department->slug,
            ]);

        $department->load('seoMeta');

        return Inertia::render('Departments/Show', [
            'department' => [
                'id'          => $department->id,
                'name'        => $department->name,
                'slug'        => $department->slug,
                'icon'        => $department->icon ?? '',
                'short_desc'  => $department->short_desc ?? '',
                'description' => $department->description ?? '',
                'image_url'   => $department->image_url ?? '',
                'is_active'   => $department->is_active,
                'sort_order'  => $department->sort_order,
                'seo_meta'    => $department->seoMeta,
            ],
            'doctors' => $doctors,
        ]);
    }
}
