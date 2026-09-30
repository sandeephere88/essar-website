<?php

namespace App\Models;

use App\Traits\HasSeoMeta;

use Illuminate\Database\Eloquent\Model;

class Page extends Model
{
    use HasSeoMeta;

    protected $fillable = [
        'slug',
        'title',
        'content',
        'hero_image',
        'blocks',
        'status',
    ];

    protected $casts = [
        'blocks' => 'array',
    ];

    protected static function booted()
    {
        static::saving(function ($model) {
            $reserved = [
                'departments', 'doctors', 'blog', 'gallery', 'admin', 'api', 
                'sitemap.xml', 'robots.txt', 'storage', 'contact-submissions',
                'about', 'contact', 'pages', 'dashboard', 'profile'
            ];
            
            if (in_array(strtolower($model->slug), $reserved)) {
                throw \Illuminate\Validation\ValidationException::withMessages([
                    'slug' => 'This slug is reserved and cannot be used.'
                ]);
            }
        });
    }

    public function getMenuPanelTitleColumn(): string
    {
        return 'title';
    }

    public function getMenuPanelUrlUsing(): callable
    {
        return fn (self $model) => url('/' . ltrim($model->slug, '/'));
    }
}
