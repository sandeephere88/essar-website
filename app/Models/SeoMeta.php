<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\MorphTo;

class SeoMeta extends Model
{
    protected $table = 'seo_metas';

    protected $fillable = [
        'seo_metable_type',
        'seo_metable_id',
        'meta_title',
        'meta_description',
        'meta_keywords',
        'og_image',
        'canonical_url',
    ];

    public function seo_metable(): MorphTo
    {
        return $this->morphTo();
    }
}
