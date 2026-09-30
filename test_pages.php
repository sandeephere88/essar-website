<?php

use App\Models\Page;
use App\Models\Accreditation;
use App\Models\Testimonial;

// 1. Insurance & Billing
Page::updateOrCreate(
    ['slug' => 'insurance-billing'],
    [
        'title' => 'Insurance & Billing',
        'status' => 'published',
        'blocks' => [
            [
                'type' => 'rich_text',
                'data' => [
                    'content' => '<h2>Understanding Your Bill</h2><p>We accept most major insurances. Here is how our billing works...</p>'
                ]
            ],
            [
                'type' => 'faq_accordion',
                'data' => [
                    'faqs' => [
                        ['question' => 'Do you accept Medicare?', 'answer' => 'Yes, we accept Medicare and Medicaid.'],
                        ['question' => 'How can I pay my bill?', 'answer' => 'You can pay online via our patient portal.']
                    ]
                ]
            ],
            [
                'type' => 'cta_banner',
                'data' => [
                    'use_background_color' => true,
                    'background_color' => '#1A365D',
                    'heading' => 'Need Help with Your Bill?',
                    'button_text' => 'Contact Billing Support',
                    'button_link' => '/contact'
                ]
            ]
        ]
    ]
);

// 2. Careers
Page::updateOrCreate(
    ['slug' => 'careers'],
    [
        'title' => 'Careers',
        'status' => 'published',
        'blocks' => [
            [
                'type' => 'hero_banner',
                'data' => [
                    'image' => 'pages/default.jpg', // dummy
                    'heading' => 'Join Our Team',
                    'subheading' => 'Make a difference in healthcare.',
                    'cta_text' => 'View Open Roles',
                    'cta_link' => '#roles',
                    'alignment' => 'center'
                ]
            ],
            [
                'type' => 'rich_text',
                'data' => [
                    'content' => '<p>At our company, we value our employees and offer competitive benefits.</p>'
                ]
            ],
            [
                'type' => 'stats_counters',
                'data' => [
                    'stats' => [
                        ['number' => '500+', 'label' => 'Employees', 'icon' => 'heroicon-o-users'],
                        ['number' => '10+', 'label' => 'Locations', 'icon' => 'heroicon-o-building-office-2']
                    ]
                ]
            ]
        ]
    ]
);

// 3. Rebuild "About Us"
$about = Page::where('slug', 'about-us')->first();
if ($about) {
    $about->blocks = [
        [
            'type' => 'hero_banner',
            'data' => [
                'image' => 'pages/about-hero.jpg', // dummy
                'heading' => 'About Our Company',
                'subheading' => 'Serving the community since 1950.',
                'alignment' => 'left'
            ]
        ],
        [
            'type' => 'image_text',
            'data' => [
                'image' => 'pages/about-img.jpg',
                'image_position' => 'left',
                'heading' => 'Our Mission',
                'text' => '<p>To provide compassionate, quality healthcare to all.</p>'
            ]
        ],
        [
            'type' => 'stats_counters',
            'data' => [
                'stats' => [
                    ['number' => '70+', 'label' => 'Years of Excellence', 'icon' => 'heroicon-o-star'],
                    ['number' => '10k+', 'label' => 'Patients Served', 'icon' => 'heroicon-o-heart']
                ]
            ]
        ],
        [
            'type' => 'accreditation_strip',
            'data' => [
                'mode' => 'all'
            ]
        ],
        [
            'type' => 'testimonial_slider',
            'data' => [
                'mode' => 'featured'
            ]
        ]
    ];
    $about->status = 'published';
    $about->save();
}

echo "Pages created successfully.\n";
