<?php

namespace App\Http\Controllers;

use App\Models\Gallery;
use Inertia\Inertia;
use Illuminate\Http\Request;

class GalleryController extends Controller
{
    public function index()
    {
        $galleries = Gallery::where('is_active', true)
            ->with('media')
            ->orderBy('date', 'desc')
            ->get()
            ->map(function ($gallery) {
                return [
                    'id' => $gallery->id,
                    'title' => $gallery->title,
                    'description' => $gallery->description,
                    'date' => $gallery->date ? $gallery->date->format('F j, Y') : null,
                    'images' => $gallery->getMedia('images')->map(function ($media) {
                        return [
                            'id' => $media->id,
                            'url' => $media->getUrl('large'),
                            'thumb' => $media->getUrl('thumb'),
                            'name' => $media->name,
                        ];
                    }),
                ];
            });

        return Inertia::render('Gallery', [
            'galleries' => $galleries,
        ]);
    }
}
