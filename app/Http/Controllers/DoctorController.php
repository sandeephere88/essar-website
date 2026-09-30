<?php

namespace App\Http\Controllers;

use App\Models\Doctor;
use Inertia\Inertia;
use Inertia\Response;

class DoctorController extends Controller
{
    /**
     * /doctors — list all doctors.
     */
    public function index(): Response
    {
        $doctors = Doctor::where('is_active', true)
            ->with('department:id,name,slug')
            ->orderBy('sort_order')
            ->orderBy('name')
            ->get()
            ->map(fn ($d) => [
                'id'               => $d->id,
                'name'             => $d->name,
                'slug'             => $d->slug,
                'designation'      => $d->designation ?? '',
                'specialization'   => $d->specialization ?? '',
                'image_url'        => $d->image_url ?? '',
                'department_name'  => $d->department?->name ?? '',
                'department_slug'  => $d->department?->slug ?? '',
            ]);

        return Inertia::render('Doctors/Index', [
            'doctors' => $doctors,
        ]);
    }

    /**
     * /doctors/{slug} — full doctor profile page.
     */
    public function show(Doctor $doctor): Response
    {
        abort_if(! $doctor->is_active, 404);

        $doctor->load([
            'department:id,name,slug',
            'educations:id,doctor_id,degree,institution,year,sort_order',
            'seoMeta',
        ]);

        $educations = $doctor->educations->map(fn ($e) => [
            'id'          => $e->id,
            'degree'      => $e->degree ?? '',
            'institution' => $e->institution ?? '',
            'year'        => $e->year ?? '',
        ])->values()->toArray();

        // Get up to 8 other active doctors for the slider
        $otherDoctors = Doctor::where('is_active', true)
            ->where('id', '!=', $doctor->id)
            ->with('department:id,name,slug')
            ->orderBy('sort_order')
            ->orderBy('name')
            ->take(8)
            ->get()
            ->map(fn ($d) => [
                'id'               => $d->id,
                'name'             => $d->name,
                'slug'             => $d->slug,
                'designation'      => $d->designation ?? '',
                'specialization'   => $d->specialization ?? '',
                'image_url'        => $d->image_url ?? '',
                'department_name'  => $d->department?->name ?? '',
                'department_slug'  => $d->department?->slug ?? '',
            ]);

        return Inertia::render('Doctors/Show', [
            'doctor' => [
                'id'               => $doctor->id,
                'name'             => $doctor->name,
                'slug'             => $doctor->slug,
                'designation'      => $doctor->designation ?? '',
                'specialization'   => $doctor->specialization ?? '',
                'experience_years' => $doctor->experience_years ?? 0,
                'image_url'        => $doctor->image_url ?? '',
                'bio'              => $doctor->bio ?? '',
                'department_name'  => $doctor->department?->name ?? '',
                'department_slug'  => $doctor->department?->slug ?? '',
                'educations'       => $educations,
                'seo_meta'         => $doctor->seoMeta,
            ],
            'other_doctors' => $otherDoctors,
        ]);
    }
}
