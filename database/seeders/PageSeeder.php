<?php

namespace Database\Seeders;

use App\Models\Page;
use Illuminate\Database\Seeder;

class PageSeeder extends Seeder
{
    public function run(): void
    {
        // Home Page
        $home = Page::updateOrCreate(
            ['slug' => 'home'],
            [
                'title' => 'Home',
                'status' => 'published',
                'content' => 'Leading Manufacturer of Copra Dryers & Industrial Oil Mill Machinery.',
                'blocks' => [
                    [
                        'type' => 'client_logos',
                        'data' => [
                            'heading_before' => 'Our Valued',
                            'heading_accent' => 'Clients',
                            'description' => 'Trusted by leading agricultural, oil processing, and industrial units across India and abroad.',
                            'mode' => 'all',
                        ],
                    ],
                    [
                        'type' => 'stats_counters',
                        'data' => [
                            'heading_before' => 'Engineering',
                            'heading_accent' => 'Excellence in Numbers',
                            'description' => 'Over two decades of dedication to quality manufacturing and customer satisfaction.',
                            'counters' => [
                                ['label' => 'Years Experience', 'value' => '24+'],
                                ['label' => 'Machines Installed', 'value' => '500+'],
                                ['label' => 'Product Categories', 'value' => '7'],
                                ['label' => 'GST & ISO Verified', 'value' => '100%'],
                            ],
                        ],
                    ],
                    [
                        'type' => 'cta_banner',
                        'data' => [
                            'heading_before' => 'Need a Customized',
                            'heading_accent' => 'Oil Mill Solution?',
                            'description' => 'Contact our engineering team today for a free consultation and project estimate tailored to your capacity.',
                            'button_text' => 'Request a Quote',
                            'button_url' => '/contact',
                        ],
                    ],
                ],
            ]
        );

        $home->seoMeta()->updateOrCreate(
            [],
            [
                'meta_title' => 'Essar Techins — Copra Dryers & Industrial Machinery Manufacturer',
                'meta_description' => 'Leading manufacturer of Copra Dryers, Oil Processing Plants, Expellers, Filter Presses & Industrial Boilers in Aluva, Kerala, India. Est. 2000.',
                'meta_keywords' => 'copra dryer, oil expeller, coconut processing, industrial machinery, essar techins, aluva, kerala',
            ]
        );

        // About Us
        $about = Page::updateOrCreate(
            ['slug' => 'about-us'],
            [
                'title' => 'About Us',
                'status' => 'published',
                'content' => '<h2>24+ Years of Industrial Excellence</h2><p>Welcome to Essar Techins. Based in Aluva, Kerala, we specialize in high-efficiency Copra Dryers, Oil Mill Machinery, Filter Presses, and Industrial Boilers built for continuous performance.</p>',
                'hero_image' => null,
            ]
        );

        $about->seoMeta()->updateOrCreate(
            [],
            [
                'meta_title' => 'About Us | Essar Techins',
                'meta_description' => 'Learn more about Essar Techins, our history in industrial machinery manufacturing, quality commitment, and engineering expertise.',
                'meta_keywords' => 'about us, essar techins, industrial machinery, copra dryers, oil mills, aluva',
            ]
        );

        // Contact Us
        $contact = Page::updateOrCreate(
            ['slug' => 'contact-us'],
            [
                'title' => 'Contact Us',
                'status' => 'published',
                'content' => '<h2>Get In Touch</h2><p>Have questions or need a quotation for our machinery? Contact our sales desk today. Our engineering team is ready to assist you.</p>',
                'hero_image' => null,
            ]
        );

        $contact->seoMeta()->updateOrCreate(
            [],
            [
                'meta_title' => 'Contact Us | Essar Techins',
                'meta_description' => 'Get in touch with Essar Techins in Aluva, Kerala. Call +91 98470 00000 or email mep@essartechins.com for machine quotes and technical support.',
                'meta_keywords' => 'contact essar techins, machinery quote, aluva address, phone number',
            ]
        );

        $this->command->info('✅ Pages (Home, About Us & Contact Us) seeded successfully for Essar Techins.');
    }
}
