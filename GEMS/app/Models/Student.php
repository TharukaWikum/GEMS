<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Student extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id', 'dob', 'gender', 'nationality', 'preferred_course', 
        'payment_method', 'payment_receipt', 'student_status'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function enrolledCourses()
{
    return $this->belongsToMany(Course::class, 'course_students')
                ->withPivot('status', 'start_date', 'end_date')
                ->withTimestamps();
}

}
