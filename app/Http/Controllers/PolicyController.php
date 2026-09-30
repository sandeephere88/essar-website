<?php

namespace App\Http\Controllers;

use App\Models\Policy;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Symfony\Component\HttpFoundation\StreamedResponse;

class PolicyController extends Controller
{
    /**
     * Public listing of all active policies.
     */
    public function index()
    {
        $policies = Policy::active()
            ->orderBy('sort_order')
            ->orderBy('title')
            ->get(['id', 'title', 'description', 'category', 'sort_order']);

        return Inertia::render('Policies/Index', [
            'policies' => $policies,
        ]);
    }

    /**
     * Stream the PDF inline (browser viewer).
     */
    public function show(Policy $policy)
    {
        abort_unless($policy->is_active, 404);

        $path = Storage::disk('public')->path($policy->file_path);

        abort_unless(file_exists($path), 404);

        return response()->file($path, [
            'Content-Type'        => 'application/pdf',
            'Content-Disposition' => 'inline; filename="' . basename($policy->file_path) . '"',
        ]);
    }

    /**
     * Force-download the PDF.
     */
    public function download(Policy $policy)
    {
        abort_unless($policy->is_active, 404);

        $path = Storage::disk('public')->path($policy->file_path);

        abort_unless(file_exists($path), 404);

        $downloadName = \Illuminate\Support\Str::slug($policy->title) . '.pdf';

        return response()->download($path, $downloadName, [
            'Content-Type' => 'application/pdf',
        ]);
    }
}
