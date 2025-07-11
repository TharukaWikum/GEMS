<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Student;
use App\Models\StudentCourseApplication;
use App\Models\Payment;
use Illuminate\Support\Facades\Storage;
use Carbon\Carbon;

class StaffCourseApplicationController extends Controller
{
//     public function store(Request $request, $studentId)
//     {
//         $validated = $request->validate([
//             'course_id' => 'required|exists:courses,id',
//             'payment_type' => 'required|in:full,installment',
//             'payment_method' => 'required|in:Online Transfer,Bank Payment,Handover',
//             'receipt' => 'nullable|file|mimes:jpg,jpeg,png,pdf|max:2048',
//         ]);

//         $student = Student::findOrFail($studentId);

//         $hasActiveApplication = StudentCourseApplication::where('student_id', $student->id)
//     ->whereIn('status', ['pending', 'registered'])
//     ->exists();

// if ($hasActiveApplication) {
//     return back()->withErrors(['course_id' => 'Student already has an active course application or registration.']);
// }


//         $fullAmount = $student->preferred_course === 'IELTS Academic' ? 30000 : 25000; // Adjust this logic as needed

//         $application = StudentCourseApplication::create([
//             'student_id' => $student->id,
//             'course_id' => $validated['course_id'],
//             'status' => 'pending',
//             'payment_type' => $validated['payment_type'],
//             'full_amount' => $fullAmount,
//         ]);

//         $receiptPath = null;
//         if ($request->hasFile('receipt') && $validated['payment_method'] !== 'Handover') {
//             $receiptPath = $request->file('receipt')->store('receipts', 'public');
//         }

//         $amount = $validated['payment_type'] === 'installment'
//             ? round($fullAmount / (preg_match('/(\d+)/', $application->course->duration, $m) ? $m[1] : 1), 2)
//             : $fullAmount;

//         Payment::create([
//             'student_id' => $student->id,
//             'type' => 'course',
//             'amount' => $amount,
//             'method' => $validated['payment_method'],
//             'receipt' => $receiptPath,
//             'verified' => false,
//             'rejected' => false,
//             'application_id' => $application->id,
//         ]);

//         return back()->with('success', 'Course application and payment submitted!');
//     }

public function store(Request $request, $studentId)
    {
        $validated = $request->validate([
            'course_id' => 'required|exists:courses,id',
            'payment_type' => 'required|in:full,installment',
            'payment_method' => 'required|in:Online Transfer,Bank Payment,Handover',
            'receipt' => 'nullable|file|mimes:jpg,jpeg,png,pdf|max:2048',
        ]);

        $student = Student::findOrFail($studentId);

        $hasActiveApplication = StudentCourseApplication::where('student_id', $student->id)
            ->whereIn('status', ['pending', 'registered'])
            ->exists();

        if ($hasActiveApplication) {
            return back()->withErrors(['course_id' => 'Student already has an active course application or registration.']);
        }

        // Get full amount from course
        $course = $student->preferred_course === 'IELTS Academic' ? 'Academic Course' : 'General Course';
        $courseModel = \App\Models\Course::findOrFail($validated['course_id']);
        $fullAmount = $courseModel->course_fee;

        // Calculate installment & due date if applicable
        $months = intval($courseModel->duration);
        $installment = round($fullAmount / $months, 2);
        $initialPayment = $validated['payment_type'] === 'installment' ? $installment : $fullAmount;
        $nextDueDate = $validated['payment_type'] === 'installment' ? Carbon::now()->addMonth() : null;

        // Create course application
        $application = StudentCourseApplication::create([
            'student_id' => $student->id,
            'course_id' => $validated['course_id'],
            'status' => 'pending',
            'payment_type' => $validated['payment_type'],
            'full_amount' => $fullAmount,
            'amount_paid' => 0,
            'next_payment_due_date' => $nextDueDate,
            'applied_at' => now(),
        ]);

        // Upload receipt if applicable
        $receiptPath = null;
        if ($request->hasFile('receipt') && $validated['payment_method'] !== 'Handover') {
            $receiptPath = $request->file('receipt')->store('receipts', 'public');
        }

        // Create payment
        Payment::create([
            'student_id' => $student->id,
            'type' => 'course',
            'amount' => $initialPayment,
            'method' => $validated['payment_method'],
            'receipt' => $receiptPath,
            'verified' => false,
            'rejected' => false,
            'application_id' => $application->id,
        ]);

        return back()->with('success', 'Course application and initial payment submitted by staff!');
    }
}
