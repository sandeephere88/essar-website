<?php

namespace App\Filament\Widgets;

use App\Models\Accreditation;
use App\Models\Blog;
use App\Models\ContactSubmission;
use App\Models\Department;
use App\Models\Doctor;
use App\Models\HeroBanner;
use App\Models\Page;
use App\Models\Testimonial;
use Filament\Widgets\Widget;

class QuickLinksWidget extends Widget
{
    protected static string $view = 'filament.widgets.quick-links-widget';

    protected static ?int $sort = -10;

    protected int | string | array $columnSpan = 'full';

    public function getLinks(): array
    {
        return [
            [
                'title'       => 'Hero Banners',
                'description' => 'Manage homepage slideshow images, titles, and call-to-actions.',
                'icon'        => 'heroicon-o-presentation-chart-bar',
                'url'         => route('filament.admin.resources.hero-banners.index'),
                'count'       => HeroBanner::count(),
                'countLabel'  => 'banners',
                'color'       => 'info',
            ],
            [
                'title'       => 'Departments',
                'description' => 'Manage medical fields like Cardiology, Pediatrics, etc.',
                'icon'        => 'heroicon-o-building-office-2',
                'url'         => route('filament.admin.resources.departments.index'),
                'count'       => Department::count(),
                'countLabel'  => 'departments',
                'color'       => 'success',
            ],
            [
                'title'       => \App\Services\DomainConfigService::getTeamLabel(true),
                'description' => 'Manage team member profiles, roles, and experience.',
                'icon'        => 'heroicon-o-users',
                'url'         => route('filament.admin.resources.team-members.index'),
                'count'       => \App\Models\TeamMember::count(),
                'countLabel'  => 'members',
                'color'       => 'success',
            ],
            [
                'title'       => 'CMS Pages',
                'description' => 'Edit layout content and main text for About Us and Contact Us.',
                'icon'        => 'heroicon-o-document-text',
                'url'         => route('filament.admin.resources.pages.index'),
                'count'       => Page::count(),
                'countLabel'  => 'pages',
                'color'       => 'primary',
            ],
            [
                'title'       => 'Blogs & News',
                'description' => 'Write news posts, clinical updates, and lifestyle articles.',
                'icon'        => 'heroicon-o-newspaper',
                'url'         => route('filament.admin.resources.blogs.index'),
                'count'       => Blog::count(),
                'countLabel'  => 'articles',
                'color'       => 'primary',
            ],
            [
                'title'       => 'Testimonials',
                'description' => 'View patient reviews displayed on the homepage.',
                'icon'        => 'heroicon-o-chat-bubble-bottom-center-text',
                'url'         => route('filament.admin.resources.testimonials.index'),
                'count'       => Testimonial::count(),
                'countLabel'  => 'reviews',
                'color'       => 'warning',
            ],
            [
                'title'       => 'Accreditations',
                'description' => 'Manage quality certifications (NABH, NABL, ISO, etc.).',
                'icon'        => 'heroicon-o-academic-cap',
                'url'         => route('filament.admin.resources.accreditations.index'),
                'count'       => Accreditation::count(),
                'countLabel'  => 'certificates',
                'color'       => 'warning',
            ],
            [
                'title'       => 'Contact Inbox',
                'description' => 'Manage inquiries submitted via the public contact form.',
                'icon'        => 'heroicon-o-envelope',
                'url'         => route('filament.admin.resources.contact-submissions.index'),
                'count'       => ContactSubmission::where('status', 'new')->count(),
                'countLabel'  => 'new messages',
                'color'       => 'danger',
            ],
            [
                'title'       => 'Business Settings',
                'description' => 'Configure contact emails, phones, social links, and robots.txt.',
                'icon'        => 'heroicon-o-cog-6-tooth',
                'url'         => '/admin/business-settings',
                'count'       => null,
                'countLabel'  => null,
                'color'       => 'gray',
            ],
        ];
    }
}
