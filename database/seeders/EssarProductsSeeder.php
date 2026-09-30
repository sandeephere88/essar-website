<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\Service;
use Illuminate\Database\Seeder;

class EssarProductsSeeder extends Seeder
{
    public function run(): void
    {
        // Helper to get category id by slug
        $cat = fn (string $slug) => Category::where('slug', $slug)->value('id');

        $products = [
            // ── COPRA DRYERS ─────────────────────────────────────────────
            [
                'category_slug'     => 'copra-dryers',
                'title'             => 'Automatic Copra Dryer',
                'slug'              => 'automatic-copra-dryer',
                'short_description' => 'Fully automatic copra dryer with temperature control and uniform heat distribution. Ideal for large-scale copra processing units. Reduces labour cost and improves copra quality significantly.',
                'price'             => '₹ 8,00,000',
                'price_unit'        => 'Unit',
                'min_order_qty'     => '1 Unit',
                'is_featured'       => true,
                'sort_order'        => 1,
                'features'          => [
                    ['title' => 'Automatic temperature control',  'description' => 'Precise thermostat-controlled heating for uniform drying.', 'icon' => '🌡️'],
                    ['title' => 'High capacity processing',        'description' => 'Processes up to 20,000+ nuts per batch cycle.',             'icon' => '🥥'],
                    ['title' => 'Low fuel consumption',           'description' => 'Energy-efficient burner system saves up to 30% on fuel.',    'icon' => '⚡'],
                    ['title' => '1-year warranty',                'description' => 'Comprehensive manufacturer warranty with service support.',   'icon' => '🛡️'],
                ],
                'specifications'    => [
                    ['label' => 'Capacity',          'value' => '20,000+ Nuts/Batch'],
                    ['label' => 'Drying Time',       'value' => '8–10 Hours'],
                    ['label' => 'Power',             'value' => '3-Phase, 415V, 50Hz'],
                    ['label' => 'Fuel Type',         'value' => 'Wood / Coconut Husk / Diesel'],
                    ['label' => 'Construction',      'value' => 'Mild Steel, Heavy Gauge'],
                    ['label' => 'Warranty',          'value' => '1 Year'],
                    ['label' => 'Installation',      'value' => 'Included'],
                    ['label' => 'Country of Origin', 'value' => 'India'],
                ],
                'image'             => 'https://5.imimg.com/data5/SELLER/Default/2024/10/459038979/KS/SX/BZ/5512374/automatic-copra-dryer-250x250.png',
            ],
            [
                'category_slug'     => 'copra-dryers',
                'title'             => 'Copra Dryer — 10,000 Nuts',
                'slug'              => 'copra-dryer-10000-nuts',
                'short_description' => 'Commercial copra dryer designed for processing 10,000 coconuts per batch. Robust mild steel construction with efficient heat distribution chambers. Suitable for medium-scale copra producers.',
                'price'             => '₹ 1,20,000',
                'price_unit'        => 'Piece',
                'min_order_qty'     => '1 Piece',
                'is_featured'       => true,
                'sort_order'        => 2,
                'features'          => [
                    ['title' => '10,000 nut capacity',      'description' => 'Optimised chamber size for 10,000 coconuts per batch.', 'icon' => '🥥'],
                    ['title' => 'Durable MS construction',  'description' => 'Heavy gauge mild steel body for long service life.',    'icon' => '🔩'],
                    ['title' => 'Easy to operate',          'description' => 'Simple controls suitable for semi-skilled operators.',   'icon' => '✅'],
                    ['title' => 'After-sales support',      'description' => 'Spare parts and service available across Kerala.',       'icon' => '🛠️'],
                ],
                'specifications'    => [
                    ['label' => 'Capacity',          'value' => '10,000 Nuts/Batch'],
                    ['label' => 'Drying Time',       'value' => '10–12 Hours'],
                    ['label' => 'Fuel Type',         'value' => 'Wood / Coconut Husk'],
                    ['label' => 'Body Material',     'value' => 'Mild Steel'],
                    ['label' => 'Dimensions (LxWxH)','value' => 'Custom / As per Site'],
                    ['label' => 'Country of Origin', 'value' => 'India'],
                ],
                'image'             => 'https://5.imimg.com/data5/SELLER/Default/2024/10/459040353/XG/HP/KM/5512374/copra-dryer-10000-nuts-250x250.png',
            ],
            [
                'category_slug'     => 'copra-dryers',
                'title'             => 'Copra Dryer Machine',
                'slug'              => 'copra-dryer-machine',
                'short_description' => 'Standard copra dryer machine for small to medium-scale production. Reliable, fuel-efficient design with easy loading and unloading. Widely used across Kerala and South India.',
                'price'             => '₹ 1,50,000',
                'price_unit'        => 'Piece',
                'min_order_qty'     => '1 Piece',
                'is_featured'       => false,
                'sort_order'        => 3,
                'features'          => [
                    ['title' => 'Fuel-efficient design',  'description' => 'Optimised heat chambers reduce fuel usage.', 'icon' => '⚡'],
                    ['title' => 'Easy loading/unloading', 'description' => 'Side-door design for quick batch turnover.',   'icon' => '✅'],
                    ['title' => 'Compact footprint',      'description' => 'Fits in standard copra processing sheds.',    'icon' => '📐'],
                ],
                'specifications'    => [
                    ['label' => 'Capacity',      'value' => '5,000–8,000 Nuts/Batch'],
                    ['label' => 'Fuel Type',     'value' => 'Wood / Husk / Coir Pith'],
                    ['label' => 'Body Material', 'value' => 'Mild Steel, 5mm Gauge'],
                ],
                'image'             => 'https://5.imimg.com/data5/SELLER/Default/2022/7/YZ/XB/WL/5512374/copra-dryer-250x250.jpeg',
            ],
            [
                'category_slug'     => 'copra-dryers',
                'title'             => 'Coconut Copra Dryer — 500 Nuts/Day',
                'slug'              => 'coconut-copra-dryer-500-nuts-daily',
                'short_description' => 'Small-scale copra dryer ideal for household or small farm use. Processes up to 500 coconuts per day. Compact, portable, and highly fuel-efficient for rural farmers.',
                'price'             => '₹ 1,50,000',
                'price_unit'        => 'Piece',
                'min_order_qty'     => '1 Piece',
                'is_featured'       => true,
                'sort_order'        => 4,
                'features'          => [
                    ['title' => 'Small farm / household scale', 'description' => 'Perfect for daily batch processing of 500 nuts.', 'icon' => '🏠'],
                    ['title' => 'Portable design',              'description' => 'Lightweight construction, easy to relocate.',     'icon' => '🚚'],
                    ['title' => 'Low running cost',             'description' => 'Minimal fuel needed per batch cycle.',            'icon' => '💰'],
                ],
                'specifications'    => [
                    ['label' => 'Capacity',      'value' => '500 Nuts/Day'],
                    ['label' => 'Fuel Type',     'value' => 'Wood / Coir Husk'],
                    ['label' => 'Body Material', 'value' => 'Mild Steel'],
                    ['label' => 'Weight',        'value' => '~80 Kg'],
                ],
                'image'             => 'https://5.imimg.com/data5/SELLER/Default/2024/10/459027534/YD/ZR/SE/5512374/coconut-copra-dryer-machines-500-nos-daily-250x250.png',
            ],
            [
                'category_slug'     => 'copra-dryers',
                'title'             => 'Coconut Copra Dryer',
                'slug'              => 'coconut-copra-dryer',
                'short_description' => 'General-purpose coconut copra dryer suitable for various capacities. Customisable to client requirements. Engineered for consistent drying results and long operational life.',
                'price'             => '₹ 1,00,000',
                'price_unit'        => 'Unit',
                'min_order_qty'     => '1 Unit',
                'is_featured'       => false,
                'sort_order'        => 5,
                'features'          => [
                    ['title' => 'Customisable capacity', 'description' => 'Built to order based on client requirements.', 'icon' => '📐'],
                    ['title' => 'Uniform drying',        'description' => 'Even heat distribution for consistent quality.','icon' => '✅'],
                ],
                'specifications'    => [
                    ['label' => 'Capacity',  'value' => 'As per requirement'],
                    ['label' => 'Fuel Type', 'value' => 'Wood / Husk / Diesel'],
                ],
                'image' => 'https://5.imimg.com/data5/SELLER/Default/2022/11/GJ/VA/LA/5512374/coconut-copra-dryer-machines-500-nos-daily-250x250.jpg',
            ],

            // ── OIL EXPELLERS ────────────────────────────────────────────
            [
                'category_slug'     => 'oil-expellers',
                'title'             => '9-Bolt Oil Expeller Machine',
                'slug'              => '9-bolt-oil-expeller-machine',
                'short_description' => 'Heavy-duty 9-bolt oil expeller machine for high-volume coconut and groundnut oil extraction. 3-phase motor driven with high oil recovery rate. Ideal for commercial oil mills.',
                'price'             => '₹ 2,50,000',
                'price_unit'        => 'Unit',
                'min_order_qty'     => '1 Unit',
                'is_featured'       => true,
                'sort_order'        => 1,
                'features'          => [
                    ['title' => 'High oil recovery',       'description' => 'Up to 98% oil extraction efficiency.',            'icon' => '⚡'],
                    ['title' => '9-bolt robust design',    'description' => 'Heavy-duty bolt configuration for continuous use.','icon' => '🔩'],
                    ['title' => 'Three-phase motor',       'description' => '7.5 HP to 15 HP motor options available.',        'icon' => '⚙️'],
                    ['title' => 'Replaceable worm & cage', 'description' => 'Easy spares replacement for minimal downtime.',   'icon' => '🛠️'],
                ],
                'specifications'    => [
                    ['label' => 'Configuration',   'value' => '9-Bolt'],
                    ['label' => 'Motor Power',     'value' => '7.5 HP – 15 HP, 3-Phase'],
                    ['label' => 'Capacity',        'value' => '50–100 Kg/Hour'],
                    ['label' => 'Oil Recovery',    'value' => 'Up to 98%'],
                    ['label' => 'Suitable For',    'value' => 'Coconut, Groundnut, Sesame'],
                    ['label' => 'Construction',    'value' => 'Cast Iron Body, Alloy Steel Worm'],
                    ['label' => 'Country of Origin','value' => 'India'],
                ],
                'image' => 'https://5.imimg.com/data5/SELLER/Default/2022/7/TA/EI/BF/5512374/9-bolt-oil-expeller-machine-500x500.png',
            ],

            // ── FILTER PRESSES ───────────────────────────────────────────
            [
                'category_slug'     => 'filter-presses',
                'title'             => 'Industrial Oil Filter Press',
                'slug'              => 'industrial-oil-filter-press',
                'short_description' => 'High-performance oil filter press for clarifying crude coconut, groundnut, and vegetable oils. Removes sediment and impurities for food-grade quality filtered oil. Available in 12 to 40-plate configurations.',
                'price'             => '₹ 45,000',
                'price_unit'        => 'Unit',
                'min_order_qty'     => '1 Unit',
                'is_featured'       => true,
                'sort_order'        => 1,
                'features'          => [
                    ['title' => 'Food-grade filtration',    'description' => 'Removes all impurities for premium quality oil.',  'icon' => '✅'],
                    ['title' => 'Multiple plate options',   'description' => '12, 20, 30 and 40-plate configurations.',         'icon' => '🔩'],
                    ['title' => 'MS & SS frame options',    'description' => 'Choose mild steel or stainless steel frames.',     'icon' => '⚙️'],
                    ['title' => 'Easy filter cloth change', 'description' => 'Quick-release mechanism for fast cleaning.',       'icon' => '🛠️'],
                ],
                'specifications'    => [
                    ['label' => 'Configuration', 'value' => '12 to 40 Plates'],
                    ['label' => 'Frame Material','value' => 'MS / SS (as selected)'],
                    ['label' => 'Filter Cloth',  'value' => 'PP Food Grade'],
                    ['label' => 'Working Pressure','value' => 'Up to 6 Bar'],
                    ['label' => 'Suitable For',  'value' => 'Coconut, Groundnut, Palm, Sesame Oil'],
                    ['label' => 'Country of Origin','value' => 'India'],
                ],
                'image' => null,
            ],

            // ── INDUSTRIAL BOILERS ───────────────────────────────────────
            [
                'category_slug'     => 'industrial-boilers',
                'title'             => 'Industrial Wood-Fired Boiler',
                'slug'              => 'industrial-wood-fired-boiler',
                'short_description' => 'Heavy-duty wood and coconut husk fired industrial boiler for oil mills, copra dryers, and process heating. Steam output from 200 to 1000 kg/hr. IBR design compliance available on request.',
                'price'             => '₹ 3,50,000',
                'price_unit'        => 'Unit',
                'min_order_qty'     => '1 Unit',
                'is_featured'       => true,
                'sort_order'        => 1,
                'features'          => [
                    ['title' => 'Multi-fuel capable',    'description' => 'Wood, coconut husk, rice husk & coir pith.',     'icon' => '🔥'],
                    ['title' => 'IBR design available',  'description' => 'Compliant with Indian Boiler Regulations.',      'icon' => '✅'],
                    ['title' => 'High steam output',     'description' => '200 to 1000 kg/hr steam output range.',         'icon' => '⚡'],
                    ['title' => 'Low ash generation',    'description' => 'Efficient combustion chamber design.',           'icon' => '🌱'],
                ],
                'specifications'    => [
                    ['label' => 'Steam Output',      'value' => '200 – 1000 Kg/Hr'],
                    ['label' => 'Working Pressure',  'value' => '5 – 10 Bar (customisable)'],
                    ['label' => 'Fuel Type',         'value' => 'Wood / Coconut Husk / Rice Husk'],
                    ['label' => 'IBR Compliance',    'value' => 'Available on Request'],
                    ['label' => 'Construction',      'value' => 'IS:2062 Grade MS Plates'],
                    ['label' => 'Country of Origin', 'value' => 'India'],
                ],
                'image' => null,
            ],

            // ── COPRA CUTTERS ────────────────────────────────────────────
            [
                'category_slug'     => 'copra-cutters',
                'title'             => 'Electric Copra Cutter Machine',
                'slug'              => 'electric-copra-cutter-machine',
                'short_description' => 'Motor-driven copra cutter for fast and uniform splitting of coconut copra. Designed for continuous commercial operation. Adjustable blade settings for different copra sizes. Low maintenance, high throughput.',
                'price'             => '₹ 25,000',
                'price_unit'        => 'Piece',
                'min_order_qty'     => '1 Piece',
                'is_featured'       => true,
                'sort_order'        => 1,
                'features'          => [
                    ['title' => 'High throughput',        'description' => 'Up to 1000 nuts per hour capacity.',              'icon' => '⚡'],
                    ['title' => 'Adjustable blade',       'description' => 'Set cut thickness as needed.',                    'icon' => '🔪'],
                    ['title' => 'Electric motor driven',  'description' => '1 HP single-phase or 2 HP three-phase motor.',   'icon' => '⚙️'],
                    ['title' => 'Low maintenance',        'description' => 'Simple blade replacement, no special tools.',     'icon' => '🛠️'],
                ],
                'specifications'    => [
                    ['label' => 'Capacity',        'value' => '500 – 1000 Nuts/Hour'],
                    ['label' => 'Motor Power',     'value' => '1 HP (Single) / 2 HP (Three Phase)'],
                    ['label' => 'Body Material',   'value' => 'Mild Steel'],
                    ['label' => 'Country of Origin','value' => 'India'],
                ],
                'image' => null,
            ],
        ];

        foreach ($products as $data) {
            $categorySlug = $data['category_slug'];
            $categoryId   = $cat($categorySlug);

            if (! $categoryId) {
                $this->command->warn("⚠️  Category '{$categorySlug}' not found — skipping product '{$data['title']}'");
                continue;
            }

            Service::updateOrCreate(
                ['slug' => $data['slug']],
                [
                    'category_id'       => $categoryId,
                    'title'             => $data['title'],
                    'slug'              => $data['slug'],
                    'short_description' => $data['short_description'],
                    'price'             => $data['price'],
                    'price_unit'        => $data['price_unit'],
                    'min_order_qty'     => $data['min_order_qty'] ?? null,
                    'is_featured'       => $data['is_featured'],
                    'is_active'         => true,
                    'sort_order'        => $data['sort_order'],
                    'features'          => $data['features']        ?? [],
                    'specifications'    => $data['specifications']  ?? [],
                    'image'             => $data['image']           ?? null,
                    'gallery'           => [],
                    'pricing'           => [],
                    'blocks'            => [],
                ]
            );
        }

        $this->command->info('✅ Essar Techins: ' . count($products) . ' products seeded');
    }
}
