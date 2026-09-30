<?php

namespace App\Models;

use App\Traits\HasSeoMeta;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Spatie\Sluggable\HasSlug;
use Spatie\Sluggable\SlugOptions;

class TeamMember extends Model
{
    use HasSlug, HasSeoMeta;

    protected $fillable = [
        'category_id',
        'name',
        'slug',
        'designation',
        'qualification',
        'experience_years',
        'image',
        'bio',
        'contact_info',
        'qualifications_list',
        'is_active',
        'sort_order',
        'custom_attributes',
    ];

    protected function casts(): array
    {
        return [
            'contact_info'        => 'array',
            'qualifications_list' => 'array',
            'custom_attributes'   => 'array',
            'is_active'           => 'boolean',
            'experience_years'    => 'integer',
            'sort_order'          => 'integer',
        ];
    }

    public function getSlugOptions(): SlugOptions
    {
        return SlugOptions::create()
            ->generateSlugsFrom('name')
            ->saveSlugsTo('slug')
            ->doNotGenerateSlugsOnUpdate();
    }

    public function getRouteKeyName(): string
    {
        return 'slug';
    }

    public function category(): BelongsTo
    {
        return $this->belongsTo(Category::class);
    }

    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }

    public function scopeOrdered($query)
    {
        return $query->orderBy('sort_order')->orderBy('name');
    }

    public function getImageUrlAttribute(): ?string
    {
        return $this->image ? asset('storage/' . $this->image) : null;
    }

    public function getMenuPanelTitleColumn(): string
    {
        return 'name';
    }

    public function getMenuPanelUrlUsing(): callable
    {
        return fn (self $model) => url('/team/' . ltrim($model->slug, '/'));
    }
}
