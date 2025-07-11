<?php

namespace App\Http\Controllers;

use App\Models\Course;
use App\Models\Staff;
use App\Models\CourseExam;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Validator;


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



// public function show($id)
// {
//     $course = Course::with(['conductorRelation.user', 'enrolledStudents.user', 'exams.scheduledBy.user'])->findOrFail($id);
//     'teachers' => Staff::with('user')
//     ->whereHas('user', fn ($q) => $q->where('role', 'teacher'))
//     ->get()
//     ->map(fn ($staff) => [
//         'id' => $staff->id,
//         'name' => $staff->user->name,
//     ]),

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
//         'students' => $course->enrolledStudents->map(fn($student) => [
//             'id' => $student->id,
//             'name' => $student->user->name,
//             'email' => $student->user->email,
//             'status' => $student->pivot->status,
//             'start_date' => $student->pivot->start_date,
//             'end_date' => $student->pivot->end_date,
//         ]),
//         'exams' => $course->exams->map(fn($exam) => [
//             'id' => $exam->id,
//             'title' => $exam->title,
//             'description' => $exam->description,
//             'exam_date' => $exam->exam_date,
//             'start_time' => $exam->start_time,
//             'duration_minutes' => $exam->duration_minutes,
//             'status' => $exam->status,
//             'scheduled_by' => $exam->scheduledBy?->user?->name ?? 'N/A',
//         ]),
//         'auth' => ['user' => auth()->user()],
//     ]);
// }

public function show($id)
{
    $course = Course::with(['conductorRelation.user', 'enrolledStudents.user', 'exams.scheduledBy.user'])->findOrFail($id);

    $teachers = Staff::with('user')
        ->whereHas('user', fn ($q) => $q->where('role', 'teacher'))
        ->get()
        ->map(fn ($staff) => [
            'id' => $staff->id,
            'name' => $staff->user->name,
        ]);

    return Inertia::render('Admin/Courses/CourseProfile', [
        'course' => [
            'id' => $course->id,
            'name' => $course->name,
            'description' => $course->description,
            'type' => $course->type,
            'course_fee' => $course->course_fee,
            'duration' => $course->duration,
            'status' => $course->status,
            'conductor_id' => $course->conductor_id,
            'conductor_name' => $course->conductorRelation?->user?->name ?? 'N/A',
        ],
        'students' => $course->enrolledStudents->map(fn($student) => [
            'id' => $student->id,
            'name' => $student->user->name,
            'email' => $student->user->email,
            'status' => $student->pivot->status,
            'start_date' => $student->pivot->start_date,
            'end_date' => $student->pivot->end_date,
        ]),
        'exams' => $course->exams->map(fn($exam) => [
            'id' => $exam->id,
            'title' => $exam->title,
            'description' => $exam->description,
            'exam_date' => $exam->exam_date,
            'start_time' => $exam->start_time,
            'duration_minutes' => $exam->duration_minutes,
            'status' => $exam->status,
            'scheduled_by' => $exam->scheduledBy?->user?->name ?? 'N/A',
        ]),
        'teachers' => $teachers,
        'auth' => ['user' => auth()->user()],
    ]);
}

public function update(Request $request, $id)
{
    $course = Course::findOrFail($id);

    $validated = $request->validate([
        'course_fee' => 'required|numeric|min:0',
        'status' => 'required|in:Active,Inactive',
        'conductor_id' => 'required|exists:staff,id',
    ]);

    $course->update([
        'course_fee' => $validated['course_fee'],
        'status' => $validated['status'],
        'conductor_id' => $validated['conductor_id'],
    ]);

    return redirect()->back()->with('success', 'Course details updated successfully.');
}


}
