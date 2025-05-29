<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Student;
use App\Models\Course;
use App\Models\CourseStudent;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Carbon\Carbon;
use Carbon\CarbonInterval;

class StudentController extends Controller
{
    public function index()
{
    $students = User::where('role', 'student')
        ->join('students', 'users.id', '=', 'students.user_id')
        ->select(
            'users.id',
            'users.name',
            'users.email',
            'users.status',
            'students.dob',
            'students.gender',
            'students.nationality',
            // 'students.nic',
            'students.preferred_course',
            'students.payment_method',
            'students.payment_receipt',
            'students.student_status'
        )
        ->get();

    return Inertia::render('Users/Students/Index', [
        'students' => $students,
        'auth' => [
            'user' => auth()->user(),
        ],
    ]);
}
// student profile view student
public function show($id)
{
    $student = User::where('users.role', 'student')
        ->where('users.id', $id)
        ->join('students', 'users.id', '=', 'students.user_id')
        ->select(
            'users.id',
            'users.name',
            'users.email',
            'users.status',
            'students.dob',
            'students.gender',
            'students.nationality',
            'students.preferred_course',
            'students.payment_method',
            'students.payment_receipt',
            'students.student_status'
        )
        ->firstOrFail();

        // 🔽 Add this to fetch available courses
    $courses = Course::select('id', 'name', 'duration')->get();

    return Inertia::render('Admin/Students/StudentProfile', [
        'student' => $student,
        'courses' => $courses,
        'auth' => [
            'user' => auth()->user(),
        ],
    ]);
}

//add student to a course
public function assignToCourse(Request $request, $id)
{
    $request->validate([
        'course_id' => 'required|exists:courses,id',
        'start_date' => 'required|date',
    ]);

    $student = Student::where('user_id', $id)->firstOrFail();
    $course = Course::findOrFail($request->course_id);

    $normalizedDuration = strtolower(trim($course->duration)); // e.g., "1 Month" → "1 month"
    $end_date = Carbon::parse($request->start_date)->add(CarbonInterval::fromString($normalizedDuration));


    CourseStudent::create([
        'student_id' => $student->id,
        'course_id' => $course->id,
        'status' => 'Registered',
        'start_date' => $request->start_date,
        'end_date' => $end_date,
    ]);

    return redirect()->back()->with('success', 'Student assigned to course.');
}
}



