<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Cache;

class BusinessProfile extends Model
{
    protected $appends = ['logo_url'];

    protected $fillable = [
        'name',
        'tagline',
        'logo',
        'address',
        'phone_numbers',
        'emergency_numbers',
        'email',
        'social_links',
        'working_hours',
        'map_embed_url',
        'robots_txt',
        'custom_attributes',
    ];

    protected function casts(): array
    {
        return [
            'phone_numbers'     => 'array',
            'emergency_numbers' => 'array',
            'social_links'      => 'array',
            'working_hours'     => 'array',
            'custom_attributes' => 'array',
        ];
    }

    /**
     * Always return the single profile record (creates default if missing).
     */
    public static function current(): self
    {
        return Cache::remember('business_profile', 3600, fn () =>
            static::firstOrCreate(
                ['id' => 1],
                ['name' => config('domain.business_type', 'Company')]
            )
        );
    }

    protected static function booted(): void
    {
        static::saved(fn () => Cache::forget('business_profile'));
    }

    public function getLogoUrlAttribute(): ?string
    {
        return $this->logo ? asset('storage/' . $this->logo) : null;
    }
}
