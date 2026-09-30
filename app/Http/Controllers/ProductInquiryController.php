<?php

namespace App\Http\Controllers;

use App\Models\ContactSubmission;
use App\Models\BusinessProfile;
use App\Models\Service;
use App\Mail\ContactSubmitted;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;

class ProductInquiryController extends Controller
{
    public function store(Request $request, string $slug = null)
    {
        $validated = $request->validate([
            'name'         => 'required|string|max:255',
            'email'        => 'required|email|max:255',
            'phone'        => 'required|string|max:50',
            'product_slug' => 'nullable|string',
            'product_name' => 'nullable|string',
            'quantity'     => 'nullable|string|max:100',
            'message'      => 'nullable|string',
        ]);

        $productName = $validated['product_name'] ?? null;
        if (!$productName && ($slug || !empty($validated['product_slug']))) {
            $targetSlug = $slug ?: $validated['product_slug'];
            $product = Service::where('slug', $targetSlug)->first();
            if ($product) {
                $productName = $product->title;
            }
        }

        $subject = $productName
            ? "Product Inquiry: {$productName}"
            : "General Product Inquiry";

        $fullMessage = "Product: " . ($productName ?? 'General') . "\n";
        if (!empty($validated['quantity'])) {
            $fullMessage .= "Required Quantity: " . $validated['quantity'] . "\n";
        }
        $fullMessage .= "\nMessage:\n" . ($validated['message'] ?? 'User requested quote/information for this product.');

        $submission = ContactSubmission::create([
            'name'    => $validated['name'],
            'email'   => $validated['email'],
            'phone'   => $validated['phone'],
            'subject' => $subject,
            'message' => $fullMessage,
        ]);

        try {
            $recipientEmail = BusinessProfile::current()->email ?? config('mail.from.address');
            if ($recipientEmail) {
                Mail::to($recipientEmail)->send(new ContactSubmitted($submission));
            }
        } catch (\Exception $e) {
            logger()->error('Failed sending product inquiry notification: ' . $e->getMessage());
        }

        return redirect()->back()->with('success', 'Thank you! Your product inquiry has been submitted. Our team will contact you shortly.');
    }
}
