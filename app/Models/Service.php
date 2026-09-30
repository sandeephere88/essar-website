<?php

namespace App\Models;

use App\Traits\HasSeoMeta;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Spatie\Sluggable\HasSlug;
use Spatie\Sluggable\SlugOptions;

class Service extends Model
{
    use HasSlug, HasSeoMeta;

    protected $fillable = [
        'category_id',
        'title',
        'slug',
        'short_description',
        'content',
        'image',
        'gallery',
        'features',
        'specifications',
        'pricing',
        'blocks',
        'is_active',
        'is_featured',
        'sort_order',
        // Pricing fields (Phase 3)
        'price',
        'price_unit',
        'min_order_qty',
        'custom_attributes',
    ];

    protected function casts(): array
    {
        return [
            'gallery'           => 'array',
            'features'          => 'array',
            'specifications'    => 'array',
            'pricing'           => 'array',
            'blocks'            => 'array',
            'custom_attributes' => 'array',
            'is_active'         => 'boolean',
            'is_featured'       => 'boolean',
            'sort_order'        => 'integer',
        ];
    }

    public function getSlugOptions(): SlugOptions
    {
        return SlugOptions::create()
            ->generateSlugsFrom('title')
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

    public function scopeFeatured($query)
    {
        return $query->where('is_featured', true);
    }

    public function scopeOrdered($query)
    {
        return $query->orderBy('sort_order')->orderBy('title');
    }

    public function getImageUrlAttribute(): ?string
    {
        return $this->image ? asset('storage/' . $this->image) : null;
    }

    public function getMenuPanelTitleColumn(): string
    {
        return 'title';
    }

    public function getMenuPanelUrlUsing(): callable
    {
        return fn (self $model) => url('/services/' . ltrim($model->slug, '/'));
    }
}
