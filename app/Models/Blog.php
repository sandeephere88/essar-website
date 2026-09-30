<?php

namespace App\Models;

use App\Traits\HasSeoMeta;

use Illuminate\Database\Eloquent\Model;

class Blog extends Model
{
    use HasSeoMeta;

    protected $fillable = [
        'title',
        'slug',
        'content',
        'image',
        'gallery',
        'is_active',
        'published_at',
    ];

    protected $casts = [
        'is_active' => 'boolean',
        'published_at' => 'datetime',
        'gallery' => 'array',
    ];

    protected $appends = [
        'image_url',
        'gallery_urls',
    ];

    public function getImageUrlAttribute(): ?string
    {
        if (! $this->image) {
            return null;
        }

        if (str_starts_with($this->image, 'http://') || str_starts_with($this->image, 'https://')) {
            return $this->image;
        }

        if (str_starts_with($this->image, '/')) {
            return $this->image;
        }

        return asset('storage/' . $this->image);
    }

    public function getGalleryUrlsAttribute(): array
    {
        if (! $this->gallery || ! is_array($this->gallery)) {
            return [];
        }

        return array_values(array_map(function ($img) {
            if (str_starts_with($img, 'http://') || str_starts_with($img, 'https://') || str_starts_with($img, '/')) {
                return $img;
            }

            return asset('storage/' . $img);
        }, $this->gallery));
    }

    public function getMenuPanelTitleColumn(): string
    {
        return 'title';
    }

    public function getMenuPanelUrlUsing(): callable
    {
        return fn (self $model) => url('/blog/' . ltrim($model->slug, '/'));
    }
}
