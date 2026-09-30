<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // 1. Roles & Permissions
        $this->call(RolesAndPermissionsSeeder::class);

        // 2. Business Profile — Essar Techins
        $this->call(BusinessProfileSeeder::class);

        // 3. Hero Banners — industrial machinery slides
        $this->call(HeroBannerSeeder::class);

        // 4. CMS Pages (home, about, contact)
        $this->call(PageSeeder::class);

        // 5. Product Categories (must run before products)
        $this->call(EssarCategoriesSeeder::class);

        // 6. Products (services) — real Essar Techins catalogue
        $this->call(EssarProductsSeeder::class);

        // 7. Customer Testimonials
        $this->call(EssarTestimonialsSeeder::class);

        // 8. Default Super Admin user
        $admin = User::firstOrCreate(
            ['email' => 'admin@essartechins.co.in'],
            [
                'name'              => 'Super Admin',
                'password'          => bcrypt('Admin@123'),
                'email_verified_at' => now(),
            ]
        );
        $admin->syncRoles('Super Admin');

        $this->command->info('✅ Admin: admin@essartechins.co.in / Admin@123');
        $this->command->info('✅ All Essar Techins content seeded successfully.');
    }
}
