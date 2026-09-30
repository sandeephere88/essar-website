<?php

namespace App\Http\Controllers;

use App\Models\HeroBanner;
use App\Models\Service;
use Inertia\Inertia;
use Inertia\Response;

class HomeController extends Controller
{
    public function index(): Response
    {
        // ── Hero Banners ────────────────────────────────────────────────────
        $heroBanners = HeroBanner::where('is_active', true)
            ->orderBy('sort_order')
            ->get()
            ->map(fn ($banner) => [
                'id'              => $banner->id,
                'title'           => $banner->title ?? '',
                'italic_title'    => $banner->italic_title ?? '',
                'subtitle'        => $banner->subtitle ?? '',
                'button_one_text' => $banner->button_one_text ?? '',
                'button_one_url'  => $banner->button_one_url ?? '',
                'button_two_text' => $banner->button_two_text ?? '',
                'button_two_url'  => $banner->button_two_url ?? '',
                'image_url'       => $banner->image
                    ? (filter_var($banner->image, FILTER_VALIDATE_URL)
                        ? $banner->image
                        : asset('storage/' . $banner->image))
                    : 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=1200',
            ])
            ->toArray();

        // ── Product Categories ──────────────────────────────────────────────
        $categories = \App\Models\Category::where('is_active', true)
            ->withCount('services')
            ->orderBy('sort_order')
            ->get()
            ->map(fn ($cat) => [
                'id'                => $cat->id,
                'name'              => $cat->name,
                'slug'              => $cat->slug,
                'description'       => $cat->description ?? '',
                'icon'              => $cat->icon ?? '',
                'image_url'         => $cat->image ? asset('storage/' . $cat->image) : null,
                'custom_attributes' => $cat->custom_attributes ?? [],
                'services_count'    => $cat->services_count,
            ])
            ->toArray();

        // ── Featured Products ───────────────────────────────────────────────
        $featuredProducts = Service::where('is_active', true)
            ->where('is_featured', true)
            ->with('category:id,name,slug')
            ->orderBy('sort_order')
            ->limit(8)
            ->get()
            ->map(fn ($product) => [
                'id'                => $product->id,
                'title'             => $product->title,
                'slug'              => $product->slug,
                'short_description' => $product->short_description ?? '',
                'image_url'         => $product->image ? asset('storage/' . $product->image) : null,
                'price'             => $product->price ?? '',
                'price_unit'        => $product->price_unit ?? '',
                'min_order_qty'     => $product->min_order_qty ?? '',
                'is_featured'       => $product->is_featured,
                'category'          => $product->category ? [
                    'id'   => $product->category->id,
                    'name' => $product->category->name,
                    'slug' => $product->category->slug,
                ] : null,
            ])
            ->toArray();

        // ── Latest Blogs ────────────────────────────────────────────────────
        $blogs = \App\Models\Blog::where('is_active', true)
            ->orderBy('published_at', 'desc')
            ->limit(4)
            ->get()
            ->map(fn ($b) => [
                'id'           => $b->id,
                'title'        => $b->title,
                'slug'         => $b->slug,
                'content'      => $b->content,
                'snippet'      => \Illuminate\Support\Str::limit(strip_tags($b->content ?? ''), 120),
                'image_url'    => $b->image_url,
                'image'        => $b->image,
                'published_at' => $b->published_at?->format('M d, Y'),
            ]);

        // ── Testimonials ────────────────────────────────────────────────────
        $testimonials = \App\Models\Testimonial::active()
            ->orderBy('sort_order')
            ->get();

        // ── Accreditations / Certifications ─────────────────────────────────
        $accreditations = \App\Models\Accreditation::active()
            ->orderBy('sort_order')
            ->get()
            ->map(fn ($ac) => [
                'id'          => $ac->id,
                'title'       => $ac->title,
                'description' => $ac->description,
                'logo'        => $ac->logo ? asset('storage/' . $ac->logo) : null,
            ]);

        // ── Home Page CMS Blocks ─────────────────────────────────────────────
        $homePage = \App\Models\Page::where('slug', 'home')->first();
        $uniqueExperiencesBlock = null;
        $careRoleBlock = null;
        if ($homePage && is_array($homePage->blocks)) {
            foreach ($homePage->blocks as $block) {
                if (($block['type'] ?? '') === 'unique_experiences') {
                    $data = $block['data'] ?? [];
                    if (!empty($data['image'])) {
                        $data['image_url'] = filter_var($data['image'], FILTER_VALIDATE_URL)
                            ? $data['image']
                            : asset('storage/' . $data['image']);
                    }
                    $uniqueExperiencesBlock = $data;
                }
                if (($block['type'] ?? '') === 'care_role_grid') {
                    $data = $block['data'] ?? [];
                    if (!empty($data['roles']) && is_array($data['roles'])) {
                        foreach ($data['roles'] as &$r) {
                            if (!empty($r['image'])) {
                                $r['image_url'] = filter_var($r['image'], FILTER_VALIDATE_URL)
                                    ? $r['image']
                                    : asset('storage/' . $r['image']);
                            }
                        }
                    }
                    $careRoleBlock = $data;
                }
            }
        }

        return Inertia::render('Home', [
            'heroBanners'            => $heroBanners,
            'categories'             => $categories,
            'featuredProducts'       => $featuredProducts,
            'blogs'                  => $blogs,
            'testimonials'           => $testimonials,
            'accreditations'         => $accreditations,
            'uniqueExperiencesBlock' => $uniqueExperiencesBlock,
            'careRoleBlock'          => $careRoleBlock,
        ]);
    }
}
