<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class StudentCourseApplication extends Model
{
    use HasFactory;

    protected $fillable = [
        'student_id',
        'course_id',
        'payment_type',
        'full_amount',
        'amount_paid',
        'next_payment_due_date',
        'status',
        'last_payment_verified_at',
        'admin_note',
        'applied_at',
    ];

    public function student()
    {
        return $this->belongsTo(Student::class);
    }

    public function course()
    {
        return $this->belongsTo(Course::class);
    }

public function payments()
{
    return $this->hasMany(Payment::class, 'application_id');
}
}
