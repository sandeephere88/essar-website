<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class DoctorEducation extends Model
{
    protected $table = 'doctor_educations';

    protected $fillable = [
        'doctor_id', 'degree', 'institution', 'year', 'sort_order',
    ];

    protected function casts(): array
    {
        return [
            'year' => 'integer',
        ];
    }

    public function doctor(): BelongsTo
    {
        return $this->belongsTo(Doctor::class);
    }
}
