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

use App\Models\CourseExam;
use App\Models\ExamStudent;

use Illuminate\Support\Facades\Storage;


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
            // 'students.target_score',
        )
        ->get();

    return Inertia::render('Users/Students/Index', [
        'students' => $students,
        'auth' => [
            'user' => auth()->user(),
        ],
    ]);
}

public function updateUserStatus(Request $request, $id)
{
    $request->validate([
        'status' => 'required|in:active,inactive,blocked',
    ]);

    $user = User::findOrFail($id);
    $user->status = $request->status;
    $user->save();

    return back()->with('success', 'User status updated successfully.');
}

public function resubmitRegistrationPayment(Request $request)
{
    $request->validate([
        'payment_method' => 'required|in:Bank Payment,Online Transfer,Handover',
        'payment_receipt' => 'required_if:payment_method,Bank Payment,Online Transfer'
            . '|nullable|file|mimes:pdf,jpg,png|max:2048',
    ]);

    $student = Auth::user()->student;

    $receiptPath = null;

    if ($request->hasFile('payment_receipt') && in_array($request->payment_method, ['Bank Payment', 'Online Transfer'])) {
        $receiptPath = $request->file('payment_receipt')->store('receipts', 'public');
    }

    // Create new payment record for resubmission
    Payment::create([
        'student_id' => $student->id,
        'type' => 'registration',
        'amount' => 2500.00, // same as initial
        'method' => $request->payment_method,
        'receipt' => $receiptPath,
        'verified' => false,
        'rejected' => false,
    ]);

    return back()->with('success', 'Payment resubmitted successfully. Please wait for verification.');
}



public function show($id)
{
    $user = User::where('users.role', 'student')
        ->where('users.id', $id)
        ->join('students', 'users.id', '=', 'students.user_id')
        ->select(
            'users.id as user_id',
            'users.name',
            'users.email',
            'users.status',
            'students.id as student_id', // ✅ Get the real student ID
            'students.dob',
            'students.gender',
            'students.nationality',
            'students.preferred_course',
            'students.student_status',
            'students.target_country',
            'students.target_score',
        )
        ->firstOrFail();

    $studentModel = Student::findOrFail($user->student_id);

    $preferredMap = [
        'IELTS Academic' => 'Academic Course',
        'IELTS General' => 'General Course',
    ];

    $matchedCourseType = $preferredMap[$user->preferred_course] ?? null;

    $courses = Course::where('status', 'Active')
        ->when($matchedCourseType, function ($query, $type) {
            $query->where('type', $type);
        })
        ->select('id', 'name', 'duration', 'type')
        ->get();

    $enrollments = CourseStudent::with(['course.exams.students', 'student'])
        ->where('student_id', $studentModel->id)
        ->get();

    $applications = StudentCourseApplication::with('course', 'payments')
        ->where('student_id', $studentModel->id)
        ->get();

    $payments = Payment::with('application.course')
        ->where('student_id', $studentModel->id)
        ->orderByDesc('created_at')
        ->get();

     // ✅ Add this: Get exams where this student is assigned (like StudentDashboard)
    $examResults = $studentModel->courses()
        ->with(['exams' => function ($query) use ($studentModel) {
            $query->with(['students' => function ($q) use ($studentModel) {
                $q->where('students.id', $studentModel->id);
            }]);
        }])
        ->get()
        ->flatMap(function ($course) use ($studentModel) {
            return $course->exams
                ->filter(fn($exam) => $exam->students->isNotEmpty())
                ->map(function ($exam) use ($course) {
                    return [
                        'exam_id' => $exam->id,
                        'exam_title' => $exam->title,
                        'exam_date' => $exam->exam_date,
                        'status' => $exam->status,
                        'course_id' => $course->id,
                        'course_name' => $course->name,
                        'results' => $exam->students->map(function ($s) {
                            return [
                                'student_id' => $s->id,
                                'student_name' => $s->user->name,
                                'writing_score' => $s->pivot->writing_score,
                                'speaking_score' => $s->pivot->speaking_score,
                                'listening_score' => $s->pivot->listening_score,
                                'reading_score' => $s->pivot->reading_score,
                                'final_score' => $s->pivot->final_score,
                                'writing_comment' => $s->pivot->writing_comment,
                                'speaking_comment' => $s->pivot->speaking_comment,
                                'listening_comment' => $s->pivot->listening_comment,
                                'reading_comment' => $s->pivot->reading_comment,
                                'final_comment' => $s->pivot->final_comment,
                            ];
                        }),
                    ];
                });
        });

    // Add this to the bottom of show method
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

    

    return Inertia::render('Admin/Students/StudentProfile', [
        'student' => [
            'user_id' => $user->user_id,
            'student_id' => $user->student_id, // ✅ Use this in routes
            'name' => $user->name,
            'email' => $user->email,
            'status' => $user->status,
            'dob' => $user->dob,
            'gender' => $user->gender,
            'nationality' => $user->nationality,
            'preferred_course' => $user->preferred_course,
            'student_status' => $user->student_status,
            'target_country' => $user->target_country,
            'target_score' => $user->target_score,
        ],
        'courses' => $courses,
        'enrollments' => $enrollments,
        'applications' => $applications,
        'payments' => $payments,
        'eligibleDates' => $eligibleDates,
        'examResults' => $examResults,
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


$application = $student->courseApplications()
    ->where('status', 'registered')
    ->latest()
    ->first();


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


$examResults = $student->courses()
    ->with(['exams' => function ($query) use ($student) {
        $query->whereHas('students', function ($q) use ($student) {
            $q->where('students.id', $student->id);
        })->with(['students' => function ($q) use ($student) {
            $q->where('students.id', $student->id)->with('user');
        }]);
    }])
    ->get()
    ->flatMap(function ($course) use ($student) {
        return $course->exams
            ->filter(fn($exam) => $exam->students->isNotEmpty()) // ensure student is selected
            ->map(function ($exam) use ($course, $student) {
                $result = $exam->students->first();

                return [
                    'exam_id' => $exam->id,
                    'exam_title' => $exam->title,
                    'exam_date' => $exam->exam_date,
                    'status' => $exam->status,
                    'course_id' => $course->id,
                    'course_name' => $course->name,
                    'results' => $result ? [
                        'student_id' => $result->id,
                        'student_name' => optional($result->user)->name,
                        'writing_score' => $result->pivot->writing_score,
                        'writing_comment' => $result->pivot->writing_comment,
                        'speaking_score' => $result->pivot->speaking_score,
                        'speaking_comment' => $result->pivot->speaking_comment,
                        'listening_score' => $result->pivot->listening_score,
                        'listening_comment' => $result->pivot->listening_comment,
                        'reading_score' => $result->pivot->reading_score,
                        'reading_comment' => $result->pivot->reading_comment,
                        'final_score' => $result->pivot->final_score,
                        'final_comment' => $result->pivot->final_comment,
                    ] : null,
                ];
            });
    });


    



return Inertia::render('Users/Students/StudentDashboard', [
    'auth' => ['user' => $user],
    'studentStatus' => $studentStatus,
    'eligibleDates' => $eligibleDates,
    'placementTest' => $placementTestDetails,
    'placementTest' => $placementTestDetails,
    'courses' => $courses,
    'examResults' => $examResults,

    // 👇 Only send course/application data if student has passed placement test
    // 'courses' => $studentStatus === 'placement_completed'
    // ? Course::where('status', 'Active')
    //     ->where('type', $student->preferred_course) // 🔒 Filter based on preferred_course
    //     ->get(['id', 'name', 'course_fee', 'duration', 'type'])
    // : [],
    


    // 'applications' => $studentStatus === 'placement_completed'
    //     ? $student->courseApplications()->with('course')->get()
    //     : [],
    'applications' => $student->courseApplications()->with(['course', 'payments'])->get(),
    'installments' => $installments,
    'payments' => $payments,
    'registeredCourses' => $registeredCourses,
    
]);

}


}



