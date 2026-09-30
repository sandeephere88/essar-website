<?php

namespace App\Http\Controllers;

use App\Models\Page;
use App\Models\ContactSubmission;
use App\Models\BusinessProfile;
use App\Mail\ContactSubmitted;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Inertia\Inertia;

class PageController extends Controller
{
    public function about()
    {
        $page = Page::with('seoMeta')->where('slug', 'about-us')->firstOrFail();

        return Inertia::render('Pages/About', [
            'page' => [
                'title' => $page->title,
                'content' => $page->content,
                'hero_image' => $page->hero_image ? asset('storage/' . $page->hero_image) : null,
                'blocks' => $this->hydrateBlocks($page->blocks),
                'seo_meta' => $page->seoMeta,
            ]
        ]);
    }

    public function contact()
    {
        $page = Page::with('seoMeta')->where('slug', 'contact-us')->firstOrFail();

        return Inertia::render('Pages/Contact', [
            'page' => [
                'title' => $page->title,
                'content' => $page->content,
                'hero_image' => $page->hero_image ? asset('storage/' . $page->hero_image) : null,
                'blocks' => $this->hydrateBlocks($page->blocks),
                'seo_meta' => $page->seoMeta,
            ]
        ]);
    }

    public function submitContact(Request $request)
    {
        $validated = $request->validate([
            'first_name' => 'nullable|string|max:255',
            'last_name'  => 'nullable|string|max:255',
            'name'       => 'nullable|string|max:255',
            'email'      => 'required|email|max:255',
            'phone'      => 'nullable|string|max:50',
            'role'       => 'nullable|string|in:health_care_organization,professional_looking_for_work,staffing_agency,others',
            'subject'    => 'nullable|string|max:255',
            'message'    => 'nullable|string',
            'captcha'    => [
                'required',
                'numeric',
                function ($attribute, $value, $fail) use ($request) {
                    if ($value != $request->session()->get('contact_captcha_answer')) {
                        $fail('The math captcha answer is incorrect.');
                    }
                },
            ],
        ]);

        // Clear captcha answer after successful validation
        $request->session()->forget('contact_captcha_answer');
        
        unset($validated['captcha']);

        // Format combined full name
        if (!empty($validated['first_name']) || !empty($validated['last_name'])) {
            $validated['name'] = trim(($validated['first_name'] ?? '') . ' ' . ($validated['last_name'] ?? ''));
        } elseif (empty($validated['name'])) {
            $validated['name'] = $validated['email'];
        }

        if (empty($validated['message'])) {
            $validated['message'] = 'N/A';
        }

        $submission = ContactSubmission::create($validated);

        // Send Notification Email
        try {
            $recipientEmail = BusinessProfile::current()->email ?? 'info@example.com';
            Mail::to($recipientEmail)->send(new ContactSubmitted($submission));
        } catch (\Exception $e) {
            // Log or ignore mail sending errors to avoid blocking form submission
            logger()->error('Failed sending contact notification: ' . $e->getMessage());
        }

        return redirect()->back()->with('success', 'Thank you for reaching out! We will contact you shortly.');
    }

    public function show(string $slug)
    {
        // Core pages should route to their respective specialized controller methods,
        // but if someone hits /about-us directly, we can redirect them to /about.
        if ($slug === 'about-us') {
            return redirect()->route('about');
        }
        if ($slug === 'contact-us') {
            return redirect()->route('contact');
        }

        $query = Page::with('seoMeta')->where('slug', $slug);
        
        if (!request()->hasValidSignature()) {
            $query->where('status', 'published');
        }

        $page = $query->firstOrFail();

        return Inertia::render('Pages/Show', [
            'page' => [
                'title' => $page->title,
                'content' => $page->content,
                'hero_image' => $page->hero_image ? asset('storage/' . $page->hero_image) : null,
                'blocks' => $this->hydrateBlocks($page->blocks),
                'seo_meta' => $page->seoMeta,
            ]
        ]);
    }

    private function hydrateBlocks($blocks): array
    {
        $blocks = is_array($blocks) ? $blocks : [];
        $hydratedBlocks = [];

        foreach ($blocks as $block) {
            $type = $block['type'] ?? null;
            $data = $block['data'] ?? [];

            switch ($type) {
                case 'department_grid':
                    $query = \App\Models\Department::active()->ordered();
                    if (($data['mode'] ?? 'all') === 'selected' && !empty($data['selected_department_ids'])) {
                        $query->whereIn('id', $data['selected_department_ids']);
                    }
                    if (!empty($data['limit'])) {
                        $query->limit($data['limit']);
                    }
                    $data['hydrated_departments'] = $query->get()->map(fn($d) => [
                        'id' => $d->id,
                        'name' => $d->name,
                        'slug' => $d->slug,
                        'short_desc' => $d->short_desc,
                        'icon' => $d->icon,
                    ]);
                    break;
                case 'doctor_grid':
                    $query = \App\Models\Doctor::active()->orderBy('sort_order');
                    if (!empty($data['department_id'])) {
                        $query->where('department_id', $data['department_id']);
                    }
                    if (!empty($data['limit'])) {
                        $query->limit($data['limit']);
                    }
                    $data['hydrated_doctors'] = $query->with('department')->get()->map(fn($doc) => [
                        'id' => $doc->id,
                        'name' => $doc->name,
                        'slug' => $doc->slug,
                        'image_url' => $doc->image_url,
                        'specialization' => $doc->specialization,
                        'designation' => $doc->designation,
                        'department' => $doc->department ? ['name' => $doc->department->name, 'slug' => $doc->department->slug] : null,
                    ]);
                    break;
                case 'testimonial_slider':
                    $query = \App\Models\Testimonial::active()->orderBy('sort_order');
                    if (($data['mode'] ?? 'featured') === 'selected' && !empty($data['selected_testimonial_ids'])) {
                        $query->whereIn('id', $data['selected_testimonial_ids']);
                    }
                    $data['hydrated_testimonials'] = $query->get();
                    break;
                case 'accreditation_strip':
                    $query = \App\Models\Accreditation::active()->orderBy('sort_order');
                    if (($data['mode'] ?? 'all') === 'selected' && !empty($data['selected_accreditation_ids'])) {
                        $query->whereIn('id', $data['selected_accreditation_ids']);
                    }
                    $data['hydrated_accreditations'] = $query->get();
                    break;
                case 'gallery_block':
                    if (!empty($data['album_id'])) {
                        $gallery = \App\Models\Gallery::with('media')->find($data['album_id']);
                        if ($gallery) {
                            $data['hydrated_gallery'] = [
                                'title' => $gallery->title,
                                'description' => $gallery->description,
                                'images' => $gallery->getMedia()->map(fn($media) => [
                                    'id' => $media->id,
                                    'url' => $media->getUrl('large'),
                                    'thumb' => $media->getUrl('thumb'),
                                    'name' => $media->name,
                                ])
                            ];
                        }
                    }
                    break;
                case 'unique_experiences':
                    if (!empty($data['image'])) {
                        $data['image_url'] = filter_var($data['image'], FILTER_VALIDATE_URL) ? $data['image'] : asset('storage/' . $data['image']);
                    }
                    break;
                case 'care_role_grid':
                    if (!empty($data['roles']) && is_array($data['roles'])) {
                        foreach ($data['roles'] as &$r) {
                            if (!empty($r['image'])) {
                                $r['image_url'] = filter_var($r['image'], FILTER_VALIDATE_URL) ? $r['image'] : asset('storage/' . $r['image']);
                            }
                        }
                    }
                    break;
                case 'profile_block':
                    if (!empty($data['image'])) {
                        $data['image_url'] = filter_var($data['image'], FILTER_VALIDATE_URL) ? $data['image'] : asset('storage/' . $data['image']);
                    }
                    break;
                case 'hero_banner':
                    if (!empty($data['image'])) {
                        $data['image_url'] = filter_var($data['image'], FILTER_VALIDATE_URL) ? $data['image'] : asset('storage/' . $data['image']);
                    }
                    break;
                case 'image_text':
                    if (!empty($data['image'])) {
                        $data['image_url'] = filter_var($data['image'], FILTER_VALIDATE_URL) ? $data['image'] : asset('storage/' . $data['image']);
                    }
                    break;
            }

            $hydratedBlocks[] = [
                'type' => $type,
                'data' => $data,
            ];
        }

        return $hydratedBlocks;
    }
}
