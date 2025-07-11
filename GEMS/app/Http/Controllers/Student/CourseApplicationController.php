<?php

namespace App\Http\Controllers\Student;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\StudentCourseApplication;
use App\Models\Course;
use Illuminate\Support\Facades\Auth;
use App\Models\Payment;
use Illuminate\Support\Facades\Storage;
use Carbon\Carbon;

class CourseApplicationController extends Controller
{
    // Show available courses (filtered based on student preferences if needed)
    public function index()
    {
        $courses = Course::where('status', 'Active')->get();

        return inertia('Student/Courses/AvailableCourses', [
            'courses' => $courses,
        ]);
    }


public function store(Request $request)
{
    $student = Auth::user()->student;

    //  $hasActiveApplication = StudentCourseApplication::where('student_id', $student->id)
    //     ->whereIn('status', ['pending', 'registered'])
    //     ->exists();

    // if ($hasActiveApplication) {
    //     return back()->withErrors(['error' => 'You already have an active course application.']);
    // }

    $existingRejected = StudentCourseApplication::where('student_id', $student->id)
    ->where('status', 'cancelled') // reuse 'cancelled' for rejected initial payments
    ->latest()
    ->first();

if ($existingRejected) {
    // Reuse the rejected application and create a new Payment
    $validated = $request->validate([
        'payment_type' => 'required|in:full,installment',
        'payment_method' => 'required|in:Online Transfer,Bank Payment,Handover',
        'payment_receipt' => 'nullable|file|mimes:jpg,jpeg,png,pdf|max:2048',
    ]);

    $course = Course::findOrFail($existingRejected->course_id);
    $fullAmount = $course->course_fee;
    $months = intval($course->duration);
    $installment = round($fullAmount / $months, 2);
    $initialPayment = $validated['payment_type'] === 'installment' ? $installment : $fullAmount;
    $nextDueDate = $validated['payment_type'] === 'installment' ? now()->addMonth() : null;

    // Update application back to pending
    $existingRejected->update([
        'payment_type' => $validated['payment_type'],
        'next_payment_due_date' => $nextDueDate,
        'status' => 'pending',
        'applied_at' => now(),
    ]);

    $receiptPath = null;
    if ($request->hasFile('payment_receipt') && $validated['payment_method'] !== 'Handover') {
        $receiptPath = $request->file('payment_receipt')->store('receipts', 'public');
    }

    Payment::create([
        'student_id' => $student->id,
        'application_id' => $existingRejected->id,
        'type' => 'course',
        'amount' => $initialPayment,
        'method' => $validated['payment_method'],
        'receipt' => $receiptPath,
        'verified' => false,
        'rejected' => false,
    ]);

    return redirect()->route('student.applications.index')->with('success', 'Payment resubmitted for course application.');
}


    $validated = $request->validate([
        'course_id' => 'required|exists:courses,id',
        'payment_type' => 'required|in:full,installment',
        'payment_method' => 'required|in:Online Transfer,Bank Payment,Handover',
        'payment_receipt' => 'nullable|file|mimes:jpg,jpeg,png,pdf|max:2048',
    ]);

    $course = Course::findOrFail($validated['course_id']);
    $fullAmount = $course->course_fee;

    // Calculate installment amount if applicable
    $months = intval($course->duration);
    $installment = round($fullAmount / $months, 2);
    $initialPayment = $validated['payment_type'] === 'installment' ? $installment : $fullAmount;
    $nextDueDate = $validated['payment_type'] === 'installment' ? now()->addMonth() : null;

    // Handle receipt file
    $receiptPath = null;
    if ($request->hasFile('payment_receipt') && $validated['payment_method'] !== 'Handover') {
        $receiptPath = $request->file('payment_receipt')->store('receipts', 'public');
    }

    // ✅ 1. Create application with amount_paid = 0
    $application = StudentCourseApplication::create([
        'student_id' => $student->id,
        'course_id' => $course->id,
        'payment_type' => $validated['payment_type'],
        'full_amount' => $fullAmount,
        'amount_paid' => 0, // ✅ Start from 0 — will update after verification
        'next_payment_due_date' => $nextDueDate,
        'status' => 'pending',
        'applied_at' => now(),
    ]);

    // ✅ 2. Create unverified payment
    Payment::create([
        'student_id' => $student->id,
        'application_id' => $application->id, // ✅ link payment to application
        'type' => 'course',
        'amount' => $initialPayment,
        'method' => $validated['payment_method'],
        'receipt' => $receiptPath,
        'verified' => false,
        'rejected' => false,
        'rejected_by' => null,
        'rejection_reason' => null,
    ]);

    return redirect()->route('student.applications.index')->with('success', 'Course application submitted. Payment is pending verification.');
}


    // Show student’s course applications
    public function studentApplications()
    {
        $student = Auth::user()->student;

        $applications = StudentCourseApplication::with(['course', 'payments'])
            ->where('student_id', $student->id)
            ->orderByDesc('created_at')
            ->get();

        return inertia('Student/Courses/MyApplications', [
            'applications' => $applications,
        ]);
    }
}
