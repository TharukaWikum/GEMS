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
                    'type' => $course->type,
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

    //view course
// public function show($id)
// {
//     $course = Course::with('conductorRelation.user')->findOrFail($id);

//     return Inertia::render('Admin/Courses/CourseProfile', [
//         'course' => [
//             'id' => $course->id,
//             'name' => $course->name,
//             'description' => $course->description,
//             'type' => $course->type,
//             'course_fee' => $course->course_fee,
//             'duration' => $course->duration,
//             'status' => $course->status,
//             'conductor_name' => $course->conductorRelation?->user?->name ?? 'N/A',
//         ],
//         'auth' => ['user' => auth()->user()],
//     ]);
// }
public function show($id)
{
    $course = Course::with(['conductorRelation.user', 'enrolledStudents.user'])->findOrFail($id);

    return Inertia::render('Admin/Courses/CourseProfile', [
        'course' => [
            'id' => $course->id,
            'name' => $course->name,
            'description' => $course->description,
            'type' => $course->type,
            'course_fee' => $course->course_fee,
            'duration' => $course->duration,
            'status' => $course->status,
            'conductor_name' => $course->conductorRelation?->user?->name ?? 'N/A',
        ],
        'students' => $course->enrolledStudents->map(function ($student) {
            return [
                'name' => $student->user->name,
                'email' => $student->user->email,
                'status' => $student->pivot->status,
                'start_date' => $student->pivot->start_date,
                'end_date' => $student->pivot->end_date,
            ];
        }),
        'auth' => ['user' => auth()->user()],
    ]);
}


}
