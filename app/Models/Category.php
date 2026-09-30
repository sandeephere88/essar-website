<?php

namespace App\Models;

use App\Traits\HasSeoMeta;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Spatie\Sluggable\HasSlug;
use Spatie\Sluggable\SlugOptions;

class Category extends Model
{
    use HasSlug, HasSeoMeta;

    protected $fillable = [
        'name',
        'slug',
        'icon',
        'image',
        'description',
        'parent_id',
        'is_active',
        'sort_order',
        'custom_attributes',
    ];

    protected function casts(): array
    {
        return [
            'is_active' => 'boolean',
            'sort_order' => 'integer',
            'custom_attributes' => 'array',
        ];
    }

    protected static function booted(): void
    {
        static::saved(function (Category $category) {
            if ($category->wasChanged('image') && $category->image) {
                $path = storage_path('app/public/' . $category->image);
                if (file_exists($path) && strtolower(pathinfo($path, PATHINFO_EXTENSION)) === 'png') {
                    try {
                        $im = @imagecreatefrompng($path);
                        if ($im) {
                            $width = imagesx($im);
                            $height = imagesy($im);
                            $out = imagecreatetruecolor($width, $height);
                            imagealphablending($out, false);
                            imagesavealpha($out, true);
                            $transparent = imagecolorallocatealpha($out, 0, 0, 0, 127);
                            imagefill($out, 0, 0, $transparent);
                            for ($x = 0; $x < $width; $x++) {
                                for ($y = 0; $y < $height; $y++) {
                                    $rgba = imagecolorat($im, $x, $y);
                                    $r = ($rgba >> 16) & 0xFF;
                                    $g = ($rgba >> 8) & 0xFF;
                                    $b = $rgba & 0xFF;
                                    if ($r >= 242 && $g >= 242 && $b >= 242) {
                                        imagesetpixel($out, $x, $y, $transparent);
                                    } else {
                                        imagesetpixel($out, $x, $y, $rgba);
                                    }
                                }
                            }
                            imagepng($out, $path);
                            imagedestroy($im);
                            imagedestroy($out);
                        }
                    } catch (\Throwable $e) {
                        // ignore error
                    }
                }
            }
        });
    }

    public function getSlugOptions(): SlugOptions
    {
        return SlugOptions::create()
            ->generateSlugsFrom('name')
            ->saveSlugsTo('slug')
            ->doNotGenerateSlugsOnUpdate();
    }

    public function parent(): BelongsTo
    {
        return $this->belongsTo(Category::class, 'parent_id');
    }

    public function children(): HasMany
    {
        return $this->hasMany(Category::class, 'parent_id')->orderBy('sort_order');
    }

    public function services(): HasMany
    {
        return $this->hasMany(Service::class)->orderBy('sort_order');
    }

    public function teamMembers(): HasMany
    {
        return $this->hasMany(TeamMember::class)->orderBy('sort_order');
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
        return fn (self $model) => url('/categories/' . ltrim($model->slug, '/'));
    }
}
