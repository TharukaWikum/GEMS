<?php

namespace App\Http\Controllers;

use App\Models\Course;
use App\Models\Staff;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CourseController extends Controller
{
    public function index()
    {
        // Fetch courses with conductor relation (which links to Staff, which links to User)
        $courses = Course::with('conductorRelation.user')
            ->get()
            ->map(function ($course) {
                return [
                    'id' => $course->id,
                    'name' => $course->name,
                    'description' => $course->description,
                    'course_fee' => $course->course_fee,
                    'duration' => $course->duration,
                    'status' => $course->status,
                    'conductor_name' => $course->conductorRelation?->user?->name ?? 'N/A',
                ];
            });

        // (Optional) fetch teachers for dropdowns
        $teachers = Staff::with('user')
            ->whereHas('user', fn ($q) => $q->where('role', 'teacher'))
            ->get()
            ->map(fn ($staff) => [
                'id' => $staff->id,
                'name' => $staff->user->name,
            ]);

        return Inertia::render('Admin/Courses/Index', [
            'courses' => $courses,
            'teachers' => $teachers,
            'auth' => [
                'user' => auth()->user(),
            ],
        ]);
    }
}
