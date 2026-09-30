<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Relations\Pivot;

class MenuLocationAssignment extends Pivot
{
    protected $table = 'menu_location_assignments';

    protected $fillable = [
        'menu_id',
        'menu_location_id',
    ];
}
