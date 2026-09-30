<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class HeroBanner extends Model
{
    protected $fillable = [
        'title',
        'italic_title',
        'subtitle',
        'button_one_text',
        'button_one_url',
        'button_two_text',
        'button_two_url',
        'image',
        'is_active',
        'sort_order',
    ];

    protected $casts = [
        'is_active' => 'boolean',
        'sort_order' => 'integer',
    ];
}
