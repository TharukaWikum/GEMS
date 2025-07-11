<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Payment extends Model
{
    use HasFactory;

    protected $fillable = [
        'student_id', 'type', 'amount', 'method', 'receipt', 'verified', 'verified_at', 'verified_by','rejected',  'rejected_at', 'rejected_by','rejection_reason','application_id',
    ];

    public function student()
    {
        return $this->belongsTo(Student::class);
    }

    public function getReceiptUrlAttribute(): ?string
    {
        return $this->receipt ? asset('storage/' . $this->receipt) : null;
    }

    public function verifier()
    {
        return $this->belongsTo(User::class, 'verified_by');
    }

    public function application()
{
    return $this->belongsTo(StudentCourseApplication::class, 'application_id');
}

// public function verifiedBy()
// {
//     return $this->belongsTo(\App\Models\Staff::class, 'verified_by');
// }

// public function rejectedBy()
// {
//     return $this->belongsTo(\App\Models\Staff::class, 'rejected_by');
// }

public function verifiedBy()
{
    return $this->belongsTo(\App\Models\User::class, 'verified_by');
}

public function rejectedBy()
{
    return $this->belongsTo(\App\Models\User::class, 'rejected_by');
}


}
