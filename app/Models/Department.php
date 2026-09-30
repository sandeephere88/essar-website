<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Relations\HasMany;

class Department extends Category
{
    protected $table = 'categories';

    public function teamMembers(): HasMany
    {
        return $this->hasMany(TeamMember::class, 'category_id')->orderBy('sort_order');
    }

    public function members(): HasMany
    {
        return $this->teamMembers();
    }
}
