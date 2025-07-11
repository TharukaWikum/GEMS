<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ExamStudent extends Model
{
    use HasFactory;

    protected $table = 'exam_students'; // explicitly define table name

    protected $fillable = [
        'course_exam_id',
        'student_id',
        'writing_score',
        'writing_comment',
        'speaking_score',
        'speaking_comment',
        'listening_score',
        'listening_comment',
        'reading_score',
        'reading_comment',
        'final_score',
        'final_comment',
    ];

    public function exam()
    {
        return $this->belongsTo(CourseExam::class, 'course_exam_id');
    }

    public function student()
    {
        return $this->belongsTo(Student::class);
    }
}
