<?php

namespace Database\Seeders;

use App\Models\BusinessProfile;
use Illuminate\Database\Seeder;

class BusinessProfileSeeder extends Seeder
{
    public function run(): void
    {
        BusinessProfile::updateOrCreate(
            ['id' => 1],
            [
                'name'    => 'Essar Techins',
                'tagline' => 'Leading Manufacturer of Oil Processing Machinery',
                'logo'    => null, // upload via admin once ready

                'address' => 'Essar Techins, Near KSEB Office, Aluva, Kerala, India — 683101',
                'email'   => 'info@essartechins.co.in',

                'phone_numbers' => [
                    ['label' => 'Sales & Enquiry',  'number' => '+91 98470 00000'],
                    ['label' => 'Office',            'number' => '+91 484 000 0000'],
                ],

                'emergency_numbers' => [],

                'social_links' => [
                    'facebook'  => 'https://facebook.com/essartechins',
                    'instagram' => '',
                    'twitter'   => '',
                    'youtube'   => '',
                    'linkedin'  => '',
                ],

                'working_hours' => [
                    'monday'    => ['open' => '09:00 AM', 'close' => '06:00 PM'],
                    'tuesday'   => ['open' => '09:00 AM', 'close' => '06:00 PM'],
                    'wednesday' => ['open' => '09:00 AM', 'close' => '06:00 PM'],
                    'thursday'  => ['open' => '09:00 AM', 'close' => '06:00 PM'],
                    'friday'    => ['open' => '09:00 AM', 'close' => '06:00 PM'],
                    'saturday'  => ['open' => '09:00 AM', 'close' => '02:00 PM'],
                    'sunday'    => ['open' => null, 'close' => null], // Closed
                ],

                'map_embed_url' => 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3928.9!2d76.3537!3d10.1075!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b0808da5c5d96af%3A0xd4d78a1f8d7d5a3!2sAluva%2C%20Kerala!5e0!3m2!1sen!2sin!4v1234567890',

                'custom_attributes' => [
                    'gst_number'   => '32XXXXXXXXXXXXX',
                    'founded_year' => '2000',
                    'gstin_verified' => true,
                    'about_short'  => 'Essar Techins is a trusted manufacturer and service provider of Copra Dryers, Oil Processing Plants, Filter Presses, and Industrial Boilers based in Aluva, Kerala, India. With over 24 years of experience, we deliver quality industrial machinery across India.',
                    'certifications' => 'GST Verified · ISO Compliant · TrustSEAL Verified',
                    'export_markets' => 'India, Sri Lanka, Bangladesh',
                ],
            ]
        );

        $this->command->info('✅ Business profile seeded — Essar Techins');
    }
}
