<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class MenuItem extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'menu_id',
        'parent_id',
        'title',
        'navigation_label',
        'item_type',
        'url',
        'route',
        'page_id',
        'category_id',
        'sort_order',
        'target',
        'rel',
        'css_classes',
        'icon',
        'visibility',
        'status',
        'description',
        'tooltip',
        'mega_menu_enabled',
        'metadata',
    ];

    protected $casts = [
        'status' => 'boolean',
        'mega_menu_enabled' => 'boolean',
        'metadata' => 'array',
    ];

    public function menu(): BelongsTo
    {
        return $this->belongsTo(Menu::class);
    }

    public function parent(): BelongsTo
    {
        return $this->belongsTo(MenuItem::class, 'parent_id');
    }

    public function children(): HasMany
    {
        return $this->hasMany(MenuItem::class, 'parent_id')->orderBy('sort_order');
    }

    public function allChildren(): HasMany
    {
        return $this->children()->with('allChildren');
    }
    
    public function page(): BelongsTo
    {
        return $this->belongsTo(Page::class);
    }

    protected static function booted(): void
    {
        static::saved(function (MenuItem $item) {
            app(\App\Services\MenuService::class)->clearCache($item->menu);
        });
        static::deleted(function (MenuItem $item) {
            app(\App\Services\MenuService::class)->clearCache($item->menu);
        });
    }
}
