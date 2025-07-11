<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class CourseExam extends Model
{
    protected $fillable = [
        'course_id', 'title', 'description', 'status', 'exam_date','start_time','duration_minutes', 'scheduled_by'
    ];

    public function course()
    {
        return $this->belongsTo(Course::class);
    }

   public function scheduledBy()
{
    return $this->belongsTo(Staff::class, 'scheduled_by');
}


    public function students()
    {
        return $this->belongsToMany(Student::class, 'exam_students')
                    ->withPivot([
                        'writing_score', 'writing_comment',
                        'speaking_score', 'speaking_comment',
                        'listening_score', 'listening_comment',
                        'reading_score', 'reading_comment',
                        'final_score', 'final_comment'
                    ])
                    ->withTimestamps();
    }
}


