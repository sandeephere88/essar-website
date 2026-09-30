<?php

namespace Database\Seeders;

use App\Models\Testimonial;
use Illuminate\Database\Seeder;

class EssarTestimonialsSeeder extends Seeder
{
    public function run(): void
    {
        $testimonials = [
            [
                'author'     => 'Rajan Mathew',
                'relation'   => 'Coconut Farmer, Thrissur, Kerala',
                'content'    => 'We purchased an Automatic Copra Dryer from Essar Techins and it has transformed our farm operations. The quality of copra has improved significantly and we save so much time and fuel. Excellent after-sales service too. Highly recommended!',
                'is_active'  => true,
                'sort_order' => 1,
            ],
            [
                'author'     => 'Suresh Nair',
                'relation'   => 'Oil Mill Owner, Alappuzha, Kerala',
                'content'    => 'The 9-Bolt Oil Expeller from Essar Techins is outstanding. High oil recovery rate and very low downtime. The team provided excellent installation support and the machine has been running smoothly for 2 years without any major issues.',
                'is_active'  => true,
                'sort_order' => 2,
            ],
            [
                'author'     => 'Abdul Rahman',
                'relation'   => 'Copra Processor, Kozhikode, Kerala',
                'content'    => 'Very satisfied with the Copra Dryer Machine. Compact design fits perfectly in our processing unit. The technical team from Essar Techins visited us for installation and training. Quality product at a very competitive price.',
                'is_active'  => true,
                'sort_order' => 3,
            ],
            [
                'author'     => 'Pradeep Kumar',
                'relation'   => 'Agro Processing Unit, Mangalore, Karnataka',
                'content'    => 'We installed a complete Oil Processing Plant from Essar Techins for our groundnut oil unit. The project was delivered on time, within budget, and the machinery performance has exceeded our expectations. Great team, great product.',
                'is_active'  => true,
                'sort_order' => 4,
            ],
            [
                'author'     => 'Jose Varghese',
                'relation'   => 'Trader, Kottayam, Kerala',
                'content'    => 'Ordered spare parts for our oil expeller and they were dispatched within 48 hours. Genuine quality parts, properly packed, and delivered on time. Will continue buying from Essar Techins. Very professional service.',
                'is_active'  => true,
                'sort_order' => 5,
            ],
            [
                'author'     => 'Biju Thomas',
                'relation'   => 'Coconut Processing Unit, Malappuram, Kerala',
                'content'    => 'The Filter Press we purchased is excellent. Very easy to operate and clean. Oil clarity has improved dramatically and we are getting better prices in the market for our filtered coconut oil. Thank you Essar Techins!',
                'is_active'  => true,
                'sort_order' => 6,
            ],
        ];

        foreach ($testimonials as $i => $data) {
            Testimonial::updateOrCreate(
                ['author' => $data['author']],
                $data
            );
        }

        $this->command->info('✅ Essar Techins: 6 customer testimonials seeded');
    }
}
