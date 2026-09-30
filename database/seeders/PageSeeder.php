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
                'content' => 'Professional Care That Feels Like Home.',
                'blocks' => [
                    [
                        'type' => 'unique_experiences',
                        'data' => [
                            'heading_before' => 'We Create',
                            'heading_accent' => 'Unique Experiences',
                            'description' => 'We provide comprehensive home care services designed to fit your unique needs, ensuring safety, independence, and peace of mind for you and your loved ones.',
                            'stat_badges' => [
                                [
                                    'label' => 'Our Vision',
                                    'subtext' => 'Our vision is to become THE platform for independent nurses and caregivers for booking shifts and finding people that need care.',
                                ],
                                [
                                    'label' => 'Our Motto',
                                    'subtext' => 'Our vision is to become THE platform for independent nurses and caregivers for booking shifts and finding people that need care.',
                                ],
                                [
                                    'label' => 'Our Mission',
                                    'subtext' => 'Our mission is to stay true to the independent nurses and caregivers so that they always have a way to book shifts.',
                                ],
                            ],
                        ],
                    ],
                    [
                        'type' => 'care_role_grid',
                        'data' => [
                            'badge_text' => 'ALL SPECIALITIES',
                            'heading_before' => 'Our Care',
                            'heading_accent' => 'Role',
                            'description' => 'Explore our specialist healthcare and nursing roles designed for every care requirement.',
                            'roles' => [
                                [
                                    'title' => 'Registered Nurse',
                                    'subtitle' => 'Qualified Registered Nurses, 24/7',
                                    'bg_color' => '#E0E6ED',
                                ],
                                [
                                    'title' => 'Mental Health Nurses',
                                    'subtitle' => 'Professional Care for Mental Wellbeing',
                                    'bg_color' => '#D8E6DF',
                                ],
                                [
                                    'title' => 'Health Care Assistants',
                                    'subtitle' => 'Reliable Care, Delivered with Compassion',
                                    'bg_color' => '#DDE3EA',
                                ],
                                [
                                    'title' => 'Support Workers',
                                    'subtitle' => 'Empowering Independence Through Compassionate Support',
                                    'bg_color' => '#E2E8F0',
                                ],
                                [
                                    'title' => 'Nursery Workers',
                                    'subtitle' => 'Nurturing Young Minds with Care and Compassion',
                                    'bg_color' => '#DFEADF',
                                ],
                                [
                                    'title' => 'Homecare Workers',
                                    'subtitle' => 'Supporting Independent Living with Compassion',
                                    'bg_color' => '#E2E8F0',
                                ],
                            ],
                        ],
                    ],
                ],
            ]
        );

        $home->seoMeta()->updateOrCreate(
            [],
            [
                'meta_title' => 'Home | Fine Care 24/7 LTD',
                'meta_description' => 'Providing compassionate healthcare professionals you can trust, delivering quality care with dignity, dedication, and reliability 24/7.',
                'meta_keywords' => 'home care, care professional, care organisation, fine care 247',
            ]
        );

        // About Us
        $about = Page::updateOrCreate(
            ['slug' => 'about-us'],
            [
                'title' => 'About Us',
                'status' => 'published',
                'content' => '<h2>Our Dedication & History</h2><p>Welcome to Fine Care 24/7. We offer state-of-the-art diagnostic tools, expert medical panels, and inpatient care built on compassion, transparency and distinction.</p>',
                'hero_image' => null,
            ]
        );

        $about->seoMeta()->updateOrCreate(
            [],
            [
                'meta_title' => 'About Us | Fine Care 24/7 LTD',
                'meta_description' => 'Learn more about Fine Care 24/7 LTD, our legacy of patient-centered healthcare, and our healthcare staffing solutions.',
                'meta_keywords' => 'about us, care agency, medical legacy, patient care',
            ]
        );

        // Contact Us
        $contact = Page::updateOrCreate(
            ['slug' => 'contact-us'],
            [
                'title' => 'Contact Us',
                'status' => 'published',
                'content' => '<h2>Get In Touch</h2><p>Have questions or need to book an appointment? Contact our desk today. Our support team is available 24/7 to answer your queries.</p>',
                'hero_image' => null,
            ]
        );

        $contact->seoMeta()->updateOrCreate(
            [],
            [
                'meta_title' => 'Contact Us | Fine Care 24/7 LTD',
                'meta_description' => 'Get in touch with Fine Care 24/7. Call us, email us, or fill out our online contact form to get immediate support.',
                'meta_keywords' => 'contact, phone, email, address, support',
            ]
        );

        $this->command->info('✅ Pages (Home, About Us & Contact Us) seeded successfully.');
    }
}
