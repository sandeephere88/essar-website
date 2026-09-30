<?php

namespace App\Http\Middleware;

use App\Models\BusinessProfile;
use Illuminate\Http\Request;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that is loaded on the first page visit.
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determine the current asset version.
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        if ($request->isMethod('get')) {
            $captchaNum1 = rand(1, 9);
            $captchaNum2 = rand(1, 9);
            $request->session()->put('contact_captcha_answer', $captchaNum1 + $captchaNum2);
            $request->session()->put('contact_captcha_question', "What is {$captchaNum1} + {$captchaNum2}?");
        }

        return [
            ...parent::share($request),

            'auth' => [
                'user' => $request->user(),
            ],

            /*
             * Globally available on every Inertia page:
             *   const { businessProfile } = usePage().props;
             *
             * Null values are normalized so Inertia's deep-merge never calls
             * Object.keys(null) during client-side navigation.
             */
            'businessProfile'    => fn () => $this->safeBusinessProfile(),
            'domainConfig'       => fn () => \App\Services\DomainConfigService::toArray(),
            'announcement'       => fn () => \App\Models\Announcement::where('is_active', true)->latest()->first(),
            'mainMenu'           => fn () => $this->getMenuByLocation('header'),
            'footerMenu'         => fn () => $this->getMenuByLocation('footer'),
            'footerServicesMenu' => fn () => $this->getMenuByLocation('footer_services'),
            'headerButtons'      => fn () => $this->resolveHeaderButtons(),
            'captcha'            => fn () => [
                'question' => $request->session()->get('contact_captcha_question', 'What is 2 + 2?'),
            ],
        ];
    }

    private function getMenuByLocation(string $locationSlug): array
    {
        try {
            $tree = app(\App\Services\MenuService::class)->getMenuTreeByLocation($locationSlug);
            return $this->flattenTreeForFrontend($tree);
        } catch (\Throwable $e) {
            return [];
        }
    }

    private function resolveHeaderButtons(): array
    {
        $attrs = BusinessProfile::current()->custom_attributes ?? [];
        return [
            'primary' => [
                'label' => $attrs['header_btn_primary_label'] ?? 'Register',
                'url'   => $attrs['header_btn_primary_url']   ?? '#',
            ],
            'secondary' => [
                'label' => $attrs['header_btn_secondary_label'] ?? 'Login',
                'url'   => $attrs['header_btn_secondary_url']   ?? '#',
            ],
        ];
    }

    private function flattenTreeForFrontend(array $items): array
    {
        return array_map(fn ($item) => [
            'label'    => $item['navigation_label'] ?: $item['title'],
            'href'     => $item['url'] ?? '#',
            'target'   => $item['target'] ?? '_self',
            'children' => $this->flattenTreeForFrontend($item['children'] ?? []),
        ], $items);
    }

    /**
     * Return the business profile as a plain JSON-safe array.
     * Replaces any null scalar values with '' so Inertia's lodash deep-merge
     * never encounters Object.keys(null) during partial navigation.
     */
    private function safeBusinessProfile(): array
    {
        $profile = BusinessProfile::current()->toArray();

        // Normalize working_hours: each day must be an array, open/close must be strings
        $days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
        $hours = $profile['working_hours'] ?? [];
        foreach ($days as $day) {
            $hours[$day] = [
                'open'  => $hours[$day]['open']  ?? '',
                'close' => $hours[$day]['close'] ?? '',
            ];
        }
        $profile['working_hours'] = $hours;

        // Normalize social_links: all keys must be strings
        $profile['social_links'] = array_merge(
            ['facebook' => '', 'instagram' => '', 'twitter' => '', 'youtube' => '', 'linkedin' => ''],
            array_map(fn ($v) => $v ?? '', $profile['social_links'] ?? [])
        );

        // Ensure arrays are never null
        $profile['phone_numbers']     = $profile['phone_numbers']     ?? [];
        $profile['emergency_numbers'] = $profile['emergency_numbers'] ?? [];

        return $profile;
    }
}
