<?php

namespace App\Models;

use App\Enums\ContactRole;
use Illuminate\Database\Eloquent\Model;

class ContactSubmission extends Model
{
    protected $fillable = [
        'first_name',
        'last_name',
        'name',
        'email',
        'phone',
        'role',
        'subject',
        'message',
        'status',
    ];

    public function getRoleLabelAttribute(): string
    {
        if (!$this->role) {
            return 'General';
        }

        $enum = ContactRole::tryFrom($this->role);
        return $enum ? $enum->label() : ucfirst(str_replace('_', ' ', $this->role));
    }
}
