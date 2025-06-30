<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Course extends Model
{
    use HasFactory;

    protected $fillable = [
        'name', 'description', 'course_fee', 'duration','type', 'conductor_id', 'status'
    ];

    public function conductorRelation()
    {
        return $this->belongsTo(Staff::class, 'conductor_id');
    }

    public function enrolledStudents()
{
    return $this->belongsToMany(Student::class, 'course_students')
                ->withPivot('status', 'start_date', 'end_date')
                ->withTimestamps();
}

public function studentApplications()
{
    return $this->hasMany(StudentCourseApplication::class);
}

public function courseMaterials()
{
    return $this->hasMany(CourseMaterial::class);
}

public function conductor()
{
    return $this->belongsTo(Staff::class, 'conductor_id'); // assuming foreign key
}

public function students()
{
    return $this->hasMany(\App\Models\CourseStudent::class);
}


public function courseStudents()
{
    return $this->hasMany(CourseStudent::class);
}



}
