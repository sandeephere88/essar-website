<?php

namespace App\Http\Controllers;

use App\Models\BusinessProfile;
use Illuminate\Http\Response;

class RobotsController extends Controller
{
    public function index(): Response
    {
        $profile = BusinessProfile::current();
        
        $sitemapUrl = url('/sitemap.xml');
        
        $content = $profile->robots_txt;
        
        if (blank($content)) {
            $content = implode("\n", [
                "User-agent: *",
                "Disallow: /admin",
                "Allow: /",
                "",
                "Sitemap: {$sitemapUrl}",
            ]);
        } else {
            // Ensure sitemap is referenced
            if (!str_contains($content, 'Sitemap:')) {
                $content .= "\n\nSitemap: {$sitemapUrl}";
            }
        }

        return response($content, 200, [
            'Content-Type' => 'text/plain',
        ]);
    }
}
