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

use App\Models\PlacementTest;
use App\Models\StudentCourseApplication;
use App\Models\Payment;
use Illuminate\Support\Facades\Auth;



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
            // 'students.payment_method',
            // 'students.payment_receipt',
            'students.student_status',
            'students.target_country',
            'students.target_score',
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
            // 'students.payment_method',
            // 'students.payment_receipt',
            'students.student_status',
            'students.target_country',
            'students.target_score',

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

// Student Dashboard for the logged-in student
public function dashboard()
{
    $user = Auth::user();
    $student = $user->student;
    $studentStatus = $student->student_status;

    $registeredCourses = $student->courses()
    ->with(['courseMaterials', 'conductor.user:id,name']) // include conductor name
    ->wherePivot('status', 'Registered')
    ->get([
        'courses.id',
        'courses.name',
        'courses.description',
        'courses.course_fee',
        'courses.duration',
        'courses.type',
        'courses.conductor_id'
    ])
    ->map(function ($course) {
        return [
            'id' => $course->id,
            'name' => $course->name,
            'description' => $course->description,
            'course_fee' => $course->course_fee,
            'duration' => $course->duration,
            'type' => $course->type,
            'conductor_name' => optional($course->conductor->user)->name,
            'materials' => $course->courseMaterials->map(function ($mat) {
                return [
                    'id' => $mat->id,
                    'title' => $mat->title,
                    'type' => $mat->type,
                    'file_path' => $mat->file_path,
                ];
            }),
        ];
    });


    // Same logic from PlacementTestScheduleController
    $eligibleDates = [];
$today = Carbon::now();
$endDate = $today->copy()->addMonths(2);

while ($today->lte($endDate)) {
    $dayName = $today->format('l');

    if (in_array($dayName, ['Saturday', 'Sunday', 'Monday'])) {
        $existingTest = PlacementTest::whereDate('test_date', $today)->first();
        $studentCount = $existingTest ? $existingTest->results()->count() : 0;
        $cancelled = $existingTest ? in_array($existingTest->status, ['cancelled', 'completed']) : false;

        if ($studentCount < 10 && !$cancelled) {
            $eligibleDates[] = $today->toDateString();
        }
    }

    $today->addDay();
}


    // return Inertia::render('Users/Students/StudentDashboard', [
    //     'auth' => ['user' => $user],
    //     'studentStatus' => $studentStatus,
    //     'eligibleDates' => $eligibleDates, // ✅ pass this
    // ]);
    // Fetch latest test and result for the student
$placementResult = $student->placementTestResults()->latest()->with('placementTest')->first();

$placementTestDetails = null;

if ($placementResult && $placementResult->placementTest) {
    $test = $placementResult->placementTest;

    $placementTestDetails = [
        'title' => $test->title,
        'date' => $test->test_date,
        'status' => $test->status,
        'results' => $test->status === 'completed' ? [
            'writing_score' => $placementResult->writing_score,
            'writing_comment' => $placementResult->writing_comment,
            'speaking_score' => $placementResult->speaking_score,
            'speaking_comment' => $placementResult->speaking_comment,
            'listening_score' => $placementResult->listening_score,
            'listening_comment' => $placementResult->listening_comment,
            'reading_score' => $placementResult->reading_score,
            'reading_comment' => $placementResult->reading_comment,
            'final_score' => $placementResult->final_score,
            'final_comment' => $placementResult->final_comment,
        ] : null,
    ];
}

$preferredMap = [
    'IELTS Academic' => 'Academic Course',
    'IELTS General' => 'General Course',
];

$matchedCourseType = $preferredMap[$student->preferred_course] ?? null;

$courses = $studentStatus === 'placement_completed' && $matchedCourseType
    ? Course::where('status', 'Active')
        ->where('type', $matchedCourseType)
        ->get(['id', 'name', 'course_fee', 'duration', 'type'])
    : [];

// Calculate installment info for course_assigned students
$installments = null;

// if ($studentStatus === 'course_assigned') {
//     $application = $student->courseApplications()
//         ->where('status', 'registered')
//         ->latest()
//         ->first();

//     $duration = 1; // Default to 1 month if parsing fails
// if ($application->course && preg_match('/(\d+)/', $application->course->duration, $match)) {
//     $duration = (int)$match[1];
// }

//     if ($application && $application->payment_type === 'installment') {
//         $installments = [
//             'due' => $application->full_amount - $application->amount_paid,
//             'next_due_date' => $application->next_payment_due_date,
//             'application_id' => $application->id,
//             'full_amount' => $application->full_amount,
//             'paid' => $application->amount_paid,
//             'course_name' => optional($application->course)->name,
//             'duration_months' => $duration,
//         ];
//     }
$application = $student->courseApplications()
    ->where('status', 'registered')
    ->latest()
    ->first();

// if ($application && $application->course) {
//     $duration = 1;
//     if (preg_match('/(\d+)/', $application->course->duration, $match)) {
//         $duration = (int)$match[1];
//     }

//     if ($application->payment_type === 'installment') {
//         $installments = [
//             'due' => $application->full_amount - $application->amount_paid,
//             'next_due_date' => $application->next_payment_due_date,
//             'application_id' => $application->id,
//             'full_amount' => $application->full_amount,
//             'paid' => $application->amount_paid,
//             'course_name' => optional($application->course)->name,
//             'duration_months' => $duration,
//         ];
//     }

// }

if ($application && $application->course) {
    $duration = 1;
    if (preg_match('/(\d+)/', $application->course->duration, $match)) {
        $duration = (int)$match[1];
    }

    if ($application->payment_type === 'installment') {
        $paid = $application->payments()
            ->where('rejected', false) // ✅ count both verified + pending
            ->sum('amount');

        $installments = [
            'due' => $application->full_amount - $paid,
            'next_due_date' => $application->next_payment_due_date,
            'application_id' => $application->id,
            'full_amount' => $application->full_amount,
            'paid' => $paid,
            'course_name' => optional($application->course)->name,
            'duration_months' => $duration,
        ];
    }
}

   // Get all payments for the logged-in student, ordered by latest
    $payments = Payment::with('application.course')
        ->where('student_id', $student->id)
        ->orderByDesc('created_at')
        ->get();


return Inertia::render('Users/Students/StudentDashboard', [
    'auth' => ['user' => $user],
    'studentStatus' => $studentStatus,
    'eligibleDates' => $eligibleDates,
    'placementTest' => $placementTestDetails,
    'placementTest' => $placementTestDetails,
    'courses' => $courses,

    // 👇 Only send course/application data if student has passed placement test
    // 'courses' => $studentStatus === 'placement_completed'
    // ? Course::where('status', 'Active')
    //     ->where('type', $student->preferred_course) // 🔒 Filter based on preferred_course
    //     ->get(['id', 'name', 'course_fee', 'duration', 'type'])
    // : [],
    


    'applications' => $studentStatus === 'placement_completed'
        ? $student->courseApplications()->with('course')->get()
        : [],
    'installments' => $installments,
    'payments' => $payments,
    'registeredCourses' => $registeredCourses,
    
]);

}


}



