<?php

namespace Database\Seeders;

use App\Models\Category;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class EssarCategoriesSeeder extends Seeder
{
    public function run(): void
    {
        $categories = [
            [
                'name'        => 'Copra Dryers',
                'slug'        => 'copra-dryers',
                'icon'        => '🥥',
                'description' => 'High-efficiency Copra Dryers designed for small, medium, and large-scale coconut processing. Available in capacities from 500 to 10,000+ nuts per batch. Fuel-efficient and durable construction for long service life.',
                'sort_order'  => 1,
                'is_active'   => true,
                'custom_attributes' => [
                    'features' => [
                        ['feature' => 'Capacities from 500 to 10,000+ nuts per batch'],
                        ['feature' => 'Fuel-efficient design — wood/husk/diesel fired'],
                        ['feature' => 'Uniform drying for premium quality copra'],
                        ['feature' => 'Low maintenance, long service life'],
                    ],
                    'buttons' => [
                        ['label' => 'View Dryers', 'url' => '/categories/copra-dryers', 'style' => 'primary'],
                        ['label' => 'Get Quote',   'url' => '/contact',                  'style' => 'secondary'],
                    ],
                ],
            ],
            [
                'name'        => 'Oil Processing Plants',
                'slug'        => 'oil-processing-plants',
                'icon'        => '🏭',
                'description' => 'Complete turnkey Oil Processing Plant solutions for coconut, groundnut, sesame, and other vegetable oils. From raw material intake to refined oil output — we design, manufacture, and install the entire plant.',
                'sort_order'  => 2,
                'is_active'   => true,
                'custom_attributes' => [
                    'features' => [
                        ['feature' => 'Turnkey plant design and installation'],
                        ['feature' => 'Capacities: 1 to 50 tonnes/day'],
                        ['feature' => 'Suitable for coconut, groundnut, sesame oils'],
                        ['feature' => 'CE & ISO compliant equipment'],
                    ],
                    'buttons' => [
                        ['label' => 'Explore Plants', 'url' => '/categories/oil-processing-plants', 'style' => 'primary'],
                        ['label' => 'Request Quote',  'url' => '/contact',                          'style' => 'secondary'],
                    ],
                ],
            ],
            [
                'name'        => 'Oil Expellers',
                'slug'        => 'oil-expellers',
                'icon'        => '⚙️',
                'description' => 'Robust oil expeller machines for maximum oil extraction from coconut, groundnut, mustard, and other oilseeds. Available in single-phase and three-phase motor configurations for varying production needs.',
                'sort_order'  => 3,
                'is_active'   => true,
                'custom_attributes' => [
                    'features' => [
                        ['feature' => '6-bolt, 9-bolt & 12-bolt configurations'],
                        ['feature' => 'Single & three-phase motor options'],
                        ['feature' => 'High oil recovery — up to 98%'],
                        ['feature' => 'Minimal maintenance with replaceable worms'],
                    ],
                    'buttons' => [
                        ['label' => 'View Expellers', 'url' => '/categories/oil-expellers', 'style' => 'primary'],
                        ['label' => 'Get Quote',      'url' => '/contact',                   'style' => 'secondary'],
                    ],
                ],
            ],
            [
                'name'        => 'Filter Presses',
                'slug'        => 'filter-presses',
                'icon'        => '🔩',
                'description' => 'Industrial-grade Filter Presses for clarifying crude coconut, vegetable, and edible oils. Remove impurities and sediment to deliver crystal-clear, premium quality filtered oil ready for packaging or further refining.',
                'sort_order'  => 4,
                'is_active'   => true,
                'custom_attributes' => [
                    'features' => [
                        ['feature' => 'Available in 12-plate to 40-plate configurations'],
                        ['feature' => 'MS & SS frame options'],
                        ['feature' => 'High filtration efficiency — food-grade quality'],
                        ['feature' => 'Quick plate-change mechanism'],
                    ],
                    'buttons' => [
                        ['label' => 'View Presses', 'url' => '/categories/filter-presses', 'style' => 'primary'],
                        ['label' => 'Contact Us',   'url' => '/contact',                    'style' => 'secondary'],
                    ],
                ],
            ],
            [
                'name'        => 'Industrial Boilers',
                'slug'        => 'industrial-boilers',
                'icon'        => '🔥',
                'description' => 'High-pressure industrial boilers designed for oil mills, copra dryers, and process heating applications. Wood, husk, and multi-fuel fired options available. Custom capacities from 50 kg/hr to 2000 kg/hr steam output.',
                'sort_order'  => 5,
                'is_active'   => true,
                'custom_attributes' => [
                    'features' => [
                        ['feature' => 'Wood, husk, coal & multi-fuel fired options'],
                        ['feature' => 'Steam output: 50 to 2000 kg/hr'],
                        ['feature' => 'IBR approved designs available'],
                        ['feature' => 'Low fuel consumption, high efficiency'],
                    ],
                    'buttons' => [
                        ['label' => 'View Boilers', 'url' => '/categories/industrial-boilers', 'style' => 'primary'],
                        ['label' => 'Get Quote',    'url' => '/contact',                        'style' => 'secondary'],
                    ],
                ],
            ],
            [
                'name'        => 'Copra Cutters',
                'slug'        => 'copra-cutters',
                'icon'        => '🔪',
                'description' => 'Heavy-duty Copra Cutters for splitting and sizing coconut copra before drying. Electrically powered with adjustable cutting sizes. Designed for continuous operation in commercial copra processing units.',
                'sort_order'  => 6,
                'is_active'   => true,
                'custom_attributes' => [
                    'features' => [
                        ['feature' => 'Capacity: 500 to 2000 nuts/hour'],
                        ['feature' => 'Electric motor driven — 1HP to 3HP'],
                        ['feature' => 'Adjustable cutter blades'],
                        ['feature' => 'Heavy-duty MS body construction'],
                    ],
                    'buttons' => [
                        ['label' => 'View Cutters', 'url' => '/categories/copra-cutters', 'style' => 'primary'],
                        ['label' => 'Enquire Now',  'url' => '/contact',                   'style' => 'secondary'],
                    ],
                ],
            ],
            [
                'name'        => 'Oil Mill Spare Parts',
                'slug'        => 'oil-mill-spare-parts',
                'icon'        => '🛠️',
                'description' => 'Genuine spare parts for oil expellers, filter presses, and oil processing plant equipment. We supply worms, barrels, cages, filter cloths, gaskets, and all consumable components for your oil mill machinery.',
                'sort_order'  => 7,
                'is_active'   => true,
                'custom_attributes' => [
                    'features' => [
                        ['feature' => 'Expeller worms, barrels & cages'],
                        ['feature' => 'Filter cloths & press plates'],
                        ['feature' => 'Bearings, gears & drive components'],
                        ['feature' => 'Fast dispatch — ready stock maintained'],
                    ],
                    'buttons' => [
                        ['label' => 'View Spare Parts', 'url' => '/categories/oil-mill-spare-parts', 'style' => 'primary'],
                        ['label' => 'Order Now',         'url' => '/contact',                          'style' => 'secondary'],
                    ],
                ],
            ],
        ];

        foreach ($categories as $data) {
            Category::updateOrCreate(
                ['slug' => $data['slug']],
                $data
            );
        }

        $this->command->info('✅ Essar Techins: 7 product categories seeded');
    }
}
