<?php

namespace App\Http\Controllers;

use App\Models\Blog;
use Inertia\Inertia;

class BlogController extends Controller
{
    public function index()
    {
        $blogs = Blog::with('seoMeta')
            ->where('is_active', true)
            ->orderBy('published_at', 'desc')
            ->get();

        return Inertia::render('Pages/Blog/Index', [
            'blogs' => $blogs
        ]);
    }

    public function show(Blog $blog)
    {
        if (!$blog->is_active) {
            abort(404);
        }

        $blog->load('seoMeta');

        // Fetch related blogs (excluding current blog)
        $relatedBlogs = Blog::where('is_active', true)
            ->where('id', '!=', $blog->id)
            ->orderBy('published_at', 'desc')
            ->take(3)
            ->get();

        // Fetch previous & next blogs for navigation
        $currentDate = $blog->published_at ?? $blog->created_at;

        $previousBlog = Blog::where('is_active', true)
            ->where('id', '!=', $blog->id)
            ->where('published_at', '<=', $currentDate)
            ->orderBy('published_at', 'desc')
            ->select(['id', 'title', 'slug', 'image'])
            ->first();

        $nextBlog = Blog::where('is_active', true)
            ->where('id', '!=', $blog->id)
            ->where('published_at', '>=', $currentDate)
            ->orderBy('published_at', 'asc')
            ->select(['id', 'title', 'slug', 'image'])
            ->first();

        // Calculate reading time (words / 200 wpm)
        $wordCount = str_word_count(strip_tags($blog->content ?? ''));
        $readingTime = max(1, (int) ceil($wordCount / 200));

        return Inertia::render('Pages/Blog/Show', [
            'blog' => $blog,
            'relatedBlogs' => $relatedBlogs,
            'previousBlog' => $previousBlog,
            'nextBlog' => $nextBlog,
            'readingTime' => $readingTime,
        ]);
    }
}
