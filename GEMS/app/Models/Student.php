<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;

class Student extends Model
{
    use HasFactory, Notifiable;

    protected $fillable = [
        'user_id', 'dob', 'gender', 'nationality', 'preferred_course', 
        'payment_method', 'payment_receipt', 'student_status','target_country','target_score',
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

public function payments()
{
    return $this->hasMany(Payment::class);
}

  /**
     * This tells Laravel how to route the notification via email.
     */
    public function routeNotificationForMail()
    {
        return $this->user->email; // ✅ Ensure user relation is loaded when notifying
    }

    public function placementTestResults()
{
    return $this->hasMany(\App\Models\PlacementTestResult::class);
}

public function courseApplications()
{
    return $this->hasMany(StudentCourseApplication::class);
}

public function courses()
{
    return $this->belongsToMany(Course::class, 'course_students')
        ->withPivot('status', 'start_date', 'end_date')
        ->withTimestamps();
}



}
