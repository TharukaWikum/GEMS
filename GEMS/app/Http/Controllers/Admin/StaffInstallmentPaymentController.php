<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Student;
use App\Models\StudentCourseApplication;
use App\Models\Payment;

class StaffInstallmentPaymentController extends Controller
{
    public function store(Request $request, $studentId)
    {
        $validated = $request->validate([
            'application_id' => 'required|exists:student_course_applications,id',
            'amount' => 'required|numeric|min:100',
            'payment_method' => 'required|in:Online Transfer,Bank Payment,Handover',
            'receipt' => 'nullable|file|mimes:jpg,jpeg,png,pdf|max:2048',
        ]);

        $student = Student::findOrFail($studentId);
        $application = StudentCourseApplication::with('course')
            ->where('id', $validated['application_id'])
            ->where('student_id', $student->id)
            ->firstOrFail();

        if ($application->payment_type !== 'installment' || $application->status !== 'registered') {
            return back()->withErrors(['application_id' => 'Invalid application for installment payment.']);
        }

        // Calculate due amount per installment
        preg_match('/(\d+)/', $application->course->duration, $matches);
        $months = $matches[1] ?? 1;
        $installmentAmount = round($application->full_amount / $months, 2);

        if (round($validated['amount'], 2) !== $installmentAmount) {
            return back()->withErrors(['amount' => "Installment amount must be Rs. {$installmentAmount}."]);
        }

        $receiptPath = null;
        if ($request->hasFile('receipt') && $validated['payment_method'] !== 'Handover') {
            $receiptPath = $request->file('receipt')->store('receipts', 'public');
        }

        Payment::create([
            'student_id' => $student->id,
            'type' => 'course',
            'amount' => $validated['amount'],
            'method' => $validated['payment_method'],
            'receipt' => $receiptPath,
            'verified' => false,
            'rejected' => false,
            'application_id' => $application->id,
        ]);

        return back()->with('success', 'Installment payment submitted and pending verification.');
    }
}
