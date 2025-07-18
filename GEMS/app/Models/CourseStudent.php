<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CourseStudent extends Model
{
    use HasFactory;

    protected $fillable = [
        'student_id',
        'course_id',
        'status',
        'start_date',
        'end_date',
    ];

    // Optional relationships
    public function course()
    {
        return $this->belongsTo(Course::class);
    }

    public function student()
{
    return $this->belongsTo(Student::class, 'student_id');
}
}
