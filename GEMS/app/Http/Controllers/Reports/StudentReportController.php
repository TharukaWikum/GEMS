<?php

namespace App\Http\Controllers\Reports;

use App\Models\Student;
use App\Models\Course;
use App\Models\CourseStudent;
use App\Models\Staff;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use App\Models\Payment;


use Barryvdh\DomPDF\Facade\Pdf;

class StudentReportController extends Controller
{
    public function index(Request $request)
    {
        $allStudentStatuses = [
            'prospect', 'registered', 'placement_scheduled', 'placement_completed',
            'course_assigned', 'course_completed'
        ];

        $allCourseStudentStatuses = ['Registered', 'Dropped', 'Completed', 'Cancelled'];

        $activeStudents = Student::whereHas('user', fn($q) => $q->where('status', 'active'))->count();
        $activeStaff = Staff::whereHas('user', fn($q) => $q->where('status', 'active'))->count();
        $blockedStudents = Student::whereHas('user', fn($q) => $q->where('status', 'blocked'))->count();

        // 🟢 Students by status (count + details)
        $rawStatusCounts = Student::select('student_status', DB::raw('COUNT(*) as count'))
            ->groupBy('student_status')->pluck('count', 'student_status')->toArray();

        $studentsByStatus = collect($allStudentStatuses)->mapWithKeys(function ($status) use ($rawStatusCounts) {
            return [$status => $rawStatusCounts[$status] ?? 0];
        });

        // 🟢 Students by status (count + details)
$studentsByStatusDetails = collect($allStudentStatuses)->mapWithKeys(function ($status) {
    $students = Student::with('user')
        ->where('student_status', $status)
        ->get(['id', 'user_id', 'dob', 'gender', 'preferred_course', 'student_status']);

    return [$status => $students->map(function ($student) {
        return [
            'id' => $student->id,
            'name' => optional($student->user)->name,
            'email' => optional($student->user)->email,
            'gender' => $student->gender,
            'dob' => $student->dob,
            'preferred_course' => $student->preferred_course,
            'status' => $student->student_status,
        ];
    })];
});

        // 🟢 Course-wise count + details
        $studentsByCourse = Course::withCount('courseStudents')->get()->map(fn($course) => [
            'id' => $course->id,
    'course_name' => $course->name,
    'count' => $course->course_students_count,
]);

        $studentsByCourseDetails = Course::with('enrolledStudents.user')->get()->mapWithKeys(function ($course) {
    return [$course->name => $course->enrolledStudents->map(function ($student) {
        return [
            'id' => $student->id,
            'name' => optional($student->user)->name,
            'email' => optional($student->user)->email,
            'gender' => $student->gender,
            'preferred_course' => $student->preferred_course,
        ];
    })];
});


        // 🟢 CourseStudent status count + details
        $rawCourseStatusCounts = CourseStudent::select('status', DB::raw('COUNT(*) as count'))
            ->groupBy('status')->pluck('count', 'status')->toArray();

        $studentsByCourseStatus = collect($allCourseStudentStatuses)->mapWithKeys(function ($status) use ($rawCourseStatusCounts) {
            return [$status => $rawCourseStatusCounts[$status] ?? 0];
        });

        $studentsByCourseStatusDetails = collect($allCourseStudentStatuses)->mapWithKeys(function ($status) {
    $records = CourseStudent::with(['student.user', 'course'])
        ->where('status', $status)
        ->get();

    return [$status => $records->map(function ($item) {
        return [
            'student_name' => optional($item->student?->user)->name,
            'student_email' => optional($item->student?->user)->email,
            'course_name' => optional($item->course)->name,
            'status' => $item->status,
            'start_date' => optional($item->start_date ?? $item->created_at)->format('Y-m-d'),
        ];
    })];
});

//payments
$now = Carbon::now();
$yearStart = $now->copy()->startOfYear();
$monthStart = $now->copy()->startOfMonth();
$nextMonthStart = $now->copy()->addMonth()->startOfMonth();
$nextMonthEnd = $nextMonthStart->copy()->endOfMonth();

$thisMonthExpected = Payment::whereHas('application', function ($query) use ($now) {
        $query->whereMonth('next_payment_due_date', $now->month);
    })->sum('amount');

$nextMonthExpected = Payment::whereHas('application', function ($query) use ($nextMonthStart, $nextMonthEnd) {
        $query->whereBetween('next_payment_due_date', [$nextMonthStart, $nextMonthEnd]);
    })->sum('amount');

$duePayments = Payment::where('verified', false)
    ->where('rejected', false)
    ->whereHas('application', function ($query) {
        $query->whereNotNull('next_payment_due_date')
              ->where('next_payment_due_date', '<', now());
    })
    ->with(['student.user', 'application'])
    ->get();


$summary['payments_summary'] = [
    'total_yearly_income' => Payment::whereBetween('created_at', [$yearStart, $now])->sum('amount'),
    'last_month_income' => Payment::whereBetween('created_at', [$now->copy()->subMonth()->startOfMonth(), $now->copy()->subMonth()->endOfMonth()])->sum('amount'),
    'this_month_expected' => $thisMonthExpected,
    'next_month_expected' => $nextMonthExpected,
    'overdue_count' => $duePayments->count(),
    'overdue_amount' => $duePayments->sum('amount'),
];

$summary['due_payments'] = $duePayments->map(function ($payment) {
    return [
        'student_name' => optional($payment->student->user)->name,
        'email' => optional($payment->student->user)->email,
        'amount' => $payment->amount,
        'due_date' => optional($payment->application)->next_payment_due_date
                        ? Carbon::parse($payment->application->next_payment_due_date)->format('Y-m-d')
                        : 'N/A',
        'payment_type' => $payment->payment_type,
        'payment_method' => $payment->payment_method,
    ];
});


        return Inertia::render('Dashboard', [
            'summary' => [
                'active_students' => $activeStudents,
                'active_staff' => $activeStaff,
                'blocked_students' => $blockedStudents,
                'students_by_status' => $studentsByStatus,
                'students_by_course' => $studentsByCourse,
                'students_by_course_status' => $studentsByCourseStatus,
                'students_by_status_details' => $studentsByStatusDetails,
                'students_by_course_details' => $studentsByCourseDetails,
                'students_by_course_status_details' => $studentsByCourseStatusDetails,
                 'payments_summary' => $summary['payments_summary'], // 👈 include full payment summary
        'due_payments' => $summary['due_payments'],         // 👈 include due payment details
            ]
        ]);
    }

    public function download(Request $request)
    {
        $query = CourseStudent::with(['student', 'course']);

        if ($request->filled('course_id')) {
            $query->where('course_id', $request->course_id);
        }

        if ($request->filled('duration')) {
            $query->whereHas('course', fn($q) => $q->where('duration', $request->duration));
        }

        $data = $query->get();

        $filename = 'student_enrollment_report_' . now()->format('Ymd_His') . '.csv';

        $headers = [
            'Content-Type' => 'text/csv',
            'Content-Disposition' => "attachment; filename=\"$filename\"",
        ];

        $callback = function () use ($data) {
            $handle = fopen('php://output', 'w');
            fputcsv($handle, ['Student Name', 'Email', 'Course', 'Duration', 'Start Date', 'Status']);

            foreach ($data as $item) {
                fputcsv($handle, [
                    optional($item->student)->full_name,
                    optional($item->student->user)->email,
                    optional($item->course)->name,
                    optional($item->course)->duration,
                    optional($item->created_at)->format('Y-m-d'),
                    $item->status,
                ]);
            }

            fclose($handle);
        };

        return response()->stream($callback, 200, $headers);
    }
    public function statusDetails($status)
{
    $students = \App\Models\Student::with('user')
        ->where('student_status', $status)
        ->get()
        ->map(function ($student) {
            return [
                'id' => $student->id,
                'name' => $student->user->name,
                'email' => $student->user->email,
                // 'gender' => $student->gender,
                // 'nationality' => $student->nationality,
                'preferred_course' => $student->preferred_course,
                'target_country' => $student->target_country,
                'target_score' => $student->target_score,
                'status' => $student->student_status,
            ];
        });

    return Inertia::render('Reports/StudentStatusDetail', [
        'status' => $status,
        'students' => $students,
    ]);
}

public function courseDetails($id)
{
    $course = Course::with(['enrolledStudents.user', 'courseStudents', 'enrolledStudents.placementTestResults'])
        ->findOrFail($id);

    $students = $course->enrolledStudents->map(function ($student) use ($course) {
        $pivot = $student->pivot;
        $finalScore = optional($student->placementTestResults->last())->final_score;

        return [
            'name' => optional($student->user)->name,
            'email' => optional($student->user)->email,
            'gender' => $student->gender,
            'target_country' => $student->target_country,
            'preferred_course' => $student->preferred_course,
            'registered_date' => optional($student->created_at)->format('Y-m-d'),
            'placement_score' => $finalScore ?? 'N/A',
            'course_status' => $pivot->status ?? 'N/A',
        ];
    });

    return Inertia::render('Reports/CourseStudentDetail', [
        'course_name' => $course->name,
        'students' => $students,
    ]);
}


public function downloadAllStatusPdf()
{
    $statuses = ['prospect', 'registered', 'placement_scheduled', 'placement_completed', 'course_assigned', 'course_completed'];

    $statusData = [];

    foreach ($statuses as $status) {
        $students = Student::with('user')
            ->where('student_status', $status)
            ->get()
            ->map(function ($student) {
                return [
                    'name' => $student->user->name,
                    'email' => $student->user->email,
                    'gender' => $student->gender,
                    'nationality' => $student->nationality,
                    'preferred_course' => $student->preferred_course,
                'target_country' => $student->target_country,
                'target_score' => $student->target_score,
                'status' => $student->student_status,
                ];
            });

        $statusData[$status] = $students;
    }

    $pdf = Pdf::loadView('pdf.student_status_report', [
        'statusData' => $statusData,
    ])->setPaper('A4', 'portrait');

    return $pdf->download('student_status_report_' . now()->format('Ymd_His') . '.pdf');
}

public function downloadCourseStudents()
{
    $courses = Course::with(['enrolledStudents.user', 'enrolledStudents.placementTestResults', 'courseStudents'])->get();

    $courseData = [];

    foreach ($courses as $course) {
        $students = $course->enrolledStudents->map(function ($student) use ($course) {
            $pivot = $student->pivot;
            $finalScore = optional($student->placementTestResults->last())->final_score;

            return [
                'name' => optional($student->user)->name,
                'email' => optional($student->user)->email,
                'target_country' => $student->target_country,
                'preferred_course' => $student->preferred_course,
                'registered_date' => optional($student->created_at)->format('Y-m-d'),
                'placement_score' => $finalScore ?? 'N/A',
                'course_status' => $pivot->status ?? 'N/A',
            ];
        });

        $courseData[$course->name] = $students;
    }

    $pdf = \Barryvdh\DomPDF\Facade\Pdf::loadView('pdf.course_students_report', [
        'courseData' => $courseData
    ])->setPaper('A4', 'landscape');

    return $pdf->download('course_students_report_' . now()->format('Ymd_His') . '.pdf');
}

}
