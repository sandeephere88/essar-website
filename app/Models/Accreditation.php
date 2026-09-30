<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Accreditation extends Model
{
    protected $fillable = [
        'title',
        'description',
        'logo',
        'is_active',
        'sort_order',
    ];

    protected $casts = [
        'is_active' => 'boolean',
        'sort_order' => 'integer',
    ];

    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }
}
