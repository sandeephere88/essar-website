<?php

namespace Database\Seeders;

use App\Models\HeroBanner;
use Illuminate\Database\Seeder;

class HeroBannerSeeder extends Seeder
{
    public function run(): void
    {
        // Slide 1 — Copra Dryer machinery focus
        HeroBanner::updateOrCreate(
            ['id' => 1],
            [
                'title'          => 'Quality Industrial Machinery,',
                'italic_title'   => 'Built to Last',
                'subtitle'       => 'Leading manufacturer of Copra Dryers, Oil Processing Plants, Filter Presses & Industrial Boilers. Trusted by businesses across India since 2000.',
                'button_one_text' => 'View Our Products',
                'button_one_url'  => '/products',
                'button_two_text' => 'Get a Free Quote',
                'button_two_url'  => '/contact',
                // High-quality industrial/manufacturing Unsplash image
                'image'      => 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=1400',
                'is_active'  => true,
                'sort_order' => 1,
            ]
        );

        // Slide 2 — Oil processing focus
        HeroBanner::updateOrCreate(
            ['id' => 2],
            [
                'title'          => 'Precision-Engineered',
                'italic_title'   => 'Oil Processing Solutions',
                'subtitle'       => 'From Copra Cutters to complete Oil Mill setups — we deliver end-to-end solutions with expert installation and after-sales support.',
                'button_one_text' => 'Explore Categories',
                'button_one_url'  => '/categories',
                'button_two_text' => 'Contact Us',
                'button_two_url'  => '/contact',
                // Industrial manufacturing plant image
                'image'      => 'https://images.unsplash.com/photo-1565688534245-05d6b5be184a?auto=format&fit=crop&q=80&w=1400',
                'is_active'  => true,
                'sort_order' => 2,
            ]
        );

        // Slide 3 — Export / quality focus
        HeroBanner::updateOrCreate(
            ['id' => 3],
            [
                'title'          => '24+ Years of',
                'italic_title'   => 'Manufacturing Excellence',
                'subtitle'       => 'GST Verified · TrustSEAL Certified · Aluva, Kerala, India. Custom-built machinery for coconut and oil industries across India and beyond.',
                'button_one_text' => 'About Us',
                'button_one_url'  => '/about',
                'button_two_text' => 'View Products',
                'button_two_url'  => '/products',
                // Factory / engineering image
                'image'      => 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?auto=format&fit=crop&q=80&w=1400',
                'is_active'  => true,
                'sort_order' => 3,
            ]
        );

        $this->command->info('✅ Hero banners seeded — Essar Techins (3 slides)');
    }
}
