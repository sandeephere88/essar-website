<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Service;
use App\Models\Blog;
use App\Models\Page;
use Spatie\Sitemap\Sitemap;
use Spatie\Sitemap\Tags\Url;

class SitemapController extends Controller
{
    public function index()
    {
        $sitemap = Sitemap::create();

        // 1. Homepage
        $sitemap->add(
            Url::create('/')
                ->setPriority(1.0)
                ->setChangeFrequency(Url::CHANGE_FREQUENCY_DAILY)
        );

        // 2. Product Catalog Index
        $sitemap->add(
            Url::create('/services')
                ->setPriority(0.9)
                ->setChangeFrequency(Url::CHANGE_FREQUENCY_DAILY)
        );

        // 3. Product Categories Index
        $sitemap->add(
            Url::create('/categories')
                ->setPriority(0.9)
                ->setChangeFrequency(Url::CHANGE_FREQUENCY_WEEKLY)
        );

        // 4. Product Category Pages
        $categories = Category::all();
        foreach ($categories as $category) {
            $sitemap->add(
                Url::create("/categories/{$category->slug}")
                    ->setPriority(0.8)
                    ->setChangeFrequency(Url::CHANGE_FREQUENCY_WEEKLY)
            );
        }

        // 5. Product Detail Pages
        $products = Service::where('is_active', true)->get();
        foreach ($products as $product) {
            $sitemap->add(
                Url::create("/services/{$product->slug}")
                    ->setPriority(0.85)
                    ->setLastModificationDate($product->updated_at)
                    ->setChangeFrequency(Url::CHANGE_FREQUENCY_WEEKLY)
            );
        }

        // 6. CMS Pages
        $pages = Page::where('status', 'published')->get();
        foreach ($pages as $page) {
            if ($page->slug === 'about-us') {
                $sitemap->add(Url::create('/about')->setPriority(0.8)->setChangeFrequency(Url::CHANGE_FREQUENCY_WEEKLY));
            } elseif ($page->slug === 'contact-us') {
                $sitemap->add(Url::create('/contact')->setPriority(0.8)->setChangeFrequency(Url::CHANGE_FREQUENCY_MONTHLY));
            } else {
                $sitemap->add(Url::create("/{$page->slug}")->setPriority(0.7));
            }
        }

        // 7. Blogs
        $blogs = Blog::where('is_active', true)->get();
        foreach ($blogs as $blog) {
            $sitemap->add(
                Url::create("/blog/{$blog->slug}")
                    ->setPriority(0.6)
                    ->setChangeFrequency(Url::CHANGE_FREQUENCY_WEEKLY)
            );
        }

        return response($sitemap->render(), 200, [
            'Content-Type' => 'text/xml',
        ]);
    }
}
