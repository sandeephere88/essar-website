<?php

namespace Tests\Feature;

use App\Models\ContactSubmission;
use App\Models\Service;
use App\Models\Category;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ProductInquiryTest extends TestCase
{
    use RefreshDatabase;

    public function test_can_submit_general_product_inquiry()
    {
        $response = $this->post(route('products.inquiry.general'), [
            'name'         => 'Test Customer',
            'email'        => 'customer@example.com',
            'phone'        => '+91 9876543210',
            'product_name' => 'Copra Dryer Machine',
            'quantity'     => '2 Units',
            'message'      => 'Need pricing details.',
        ]);

        $response->assertStatus(302);

        $this->assertDatabaseHas('contact_submissions', [
            'name'    => 'Test Customer',
            'email'   => 'customer@example.com',
            'phone'   => '+91 9876543210',
            'subject' => 'Product Inquiry: Copra Dryer Machine',
        ]);
    }

    public function test_can_submit_product_specific_inquiry_with_slug()
    {
        $category = Category::create([
            'name' => 'Copra Dryers',
            'slug' => 'copra-dryers',
        ]);

        $product = Service::create([
            'category_id'       => $category.id,
            'title'             => 'Automatic Copra Dryer',
            'slug'              => 'automatic-copra-dryer',
            'short_description' => 'Heavy duty copra dryer',
            'is_active'         => true,
        ]);

        $response = $this->post(route('products.inquiry', $product->slug), [
            'name'     => 'Rahul Nair',
            'email'    => 'rahul@example.com',
            'phone'    => '+91 9123456789',
            'quantity' => '1 Unit',
            'message'  => 'Interested in 10000 nuts capacity model.',
        ]);

        $response->assertStatus(302);

        $this->assertDatabaseHas('contact_submissions', [
            'name'    => 'Rahul Nair',
            'email'   => 'rahul@example.com',
            'subject' => 'Product Inquiry: Automatic Copra Dryer',
        ]);
    }
}
