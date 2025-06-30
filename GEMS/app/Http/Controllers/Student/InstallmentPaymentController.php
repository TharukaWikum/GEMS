<?php

namespace App\Http\Controllers\Student;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use App\Models\StudentCourseApplication;
use App\Models\Payment;

class InstallmentPaymentController extends Controller
{
    public function pay(Request $request)
    {
        \Log::info('InstallmentPaymentController@pay called');

        $student = Auth::user()->student;

        $validated = $request->validate([
            'application_id' => 'required|exists:student_course_applications,id',
            'amount' => 'required|numeric|min:100',
            'payment_method' => 'required|in:Online Transfer,Bank Payment,Handover',
            'receipt' => 'nullable|file|mimes:jpg,jpeg,png,pdf|max:2048',
        ]);

        $application = StudentCourseApplication::with('course')
            ->where('id', $validated['application_id'])
            ->where('student_id', $student->id)
            ->firstOrFail();

        $course = $application->course;
        $fullAmount = $application->full_amount; // ✅ Define this here
        $amount = $validated['amount'];

        // Extract number from course duration (e.g., "3 Months" → 3)
        preg_match('/(\d+)/', $course->duration, $matches);
        $durationMonths = isset($matches[1]) ? (int)$matches[1] : 0;

        if ($durationMonths === 1) {
            return back()->withErrors(['amount' => 'Installments are not allowed for 1-month courses. Please pay full amount at once.']);
        }

        if (!in_array($durationMonths, [2, 3])) {
            return back()->withErrors(['amount' => 'Invalid course duration for installment payments.']);
        }

        $installmentAmount = $fullAmount / $durationMonths;

        if (round($amount, 2) !== round($installmentAmount, 2)) {
            return back()->withErrors(['amount' => "You must pay exactly Rs. {$installmentAmount} as your next installment."]);
        }

        $receiptPath = null;
        if ($request->hasFile('receipt') && $validated['payment_method'] !== 'Handover') {
            $receiptPath = $request->file('receipt')->store('receipts', 'public');
        }

        Payment::create([
            'student_id' => $student->id,
            'type' => 'course',
            'amount' => $amount,
            'method' => $validated['payment_method'],
            'receipt' => $receiptPath,
            'verified' => false,
            'rejected' => false,
            'application_id' => $application->id,
        ]);

        \Log::info("Installment submitted by student {$student->id} for application {$application->id}.");
        
        return redirect()->route('student.dashboard')->with('success', 'Installment submitted and pending verification.');
    }
}



// namespace App\Http\Controllers\Student;

// use App\Http\Controllers\Controller;
// use Illuminate\Http\Request;
// use Illuminate\Support\Facades\Auth;
// use Illuminate\Support\Facades\Storage;
// use App\Models\StudentCourseApplication;
// use App\Models\Payment;

// class InstallmentPaymentController extends Controller
// {

// public function pay(Request $request)
// {
//     \Log::info('InstallmentPaymentController@pay called');

//     $student = Auth::user()->student;

//     $validated = $request->validate([
//         'application_id' => 'required|exists:student_course_applications,id',
//         'amount' => 'required|numeric|min:100',
//         'payment_method' => 'required|in:Online Transfer,Bank Payment,Handover',
//         'receipt' => 'nullable|file|mimes:jpg,jpeg,png,pdf|max:2048',
//     ]);

//     $application = StudentCourseApplication::with('course')
//         ->where('id', $validated['application_id'])
//         ->where('student_id', $student->id)
//         ->firstOrFail();

//     $course = $application->course;
//     // $fullAmount = $application->full_amount;
//     // $alreadyPaid = $application->amount_paid;
//     $amount = $validated['amount'];

//     preg_match('/(\d+)/', $course->duration, $matches);
//     $durationMonths = isset($matches[1]) ? (int)$matches[1] : 0;

//     if ($durationMonths === 1) {
//         return back()->withErrors(['amount' => 'Installments are not allowed for 1-month courses. Please pay full amount at once.']);
//     }

//     if (!in_array($durationMonths, [2, 3])) {
//         return back()->withErrors(['amount' => 'Invalid course duration for installment payments.']);
//     }

//     $installmentAmount = $fullAmount / $durationMonths;

//     if (round($amount, 2) !== round($installmentAmount, 2)) {
//         return back()->withErrors(['amount' => "You must pay exactly Rs. {$installmentAmount} as your next installment."]);
//     }

//     $receiptPath = null;
//     if ($request->hasFile('receipt') && $validated['payment_method'] !== 'Handover') {
//         $receiptPath = $request->file('receipt')->store('receipts', 'public');
//     }

//     Payment::create([
//         'student_id' => $student->id,
//         'type' => 'course',
//         'amount' => $amount,
//         'method' => $validated['payment_method'],
//         'receipt' => $receiptPath,
//         'verified' => false,
//         'rejected' => false,
//         'application_id' => $application->id,
//     ]);

//     \Log::info("Installment submitted by student {$student->id} for application {$application->id}.");
    
//     return redirect()->route('student.dashboard')->with('success', 'Installment submitted and pending verification.');
// }


// }













    // public function pay(Request $request)
    // {
    //     $student = Auth::user()->student;

    //     $validated = $request->validate([
    //         'application_id' => 'required|exists:student_course_applications,id',
    //         'amount' => 'required|numeric|min:100',
    //         'payment_method' => 'required|in:Online Transfer,Bank Payment,Handover',
    //         'receipt' => 'nullable|file|mimes:jpg,jpeg,png,pdf|max:2048',
    //     ]);

    //     $application = StudentCourseApplication::where('id', $validated['application_id'])
    //         ->where('student_id', $student->id)
    //         ->firstOrFail();

    //     $receiptPath = null;
    //     if ($request->hasFile('receipt') && $validated['payment_method'] !== 'Handover') {
    //         $receiptPath = $request->file('receipt')->store('receipts', 'public');
    //     }

    //     Payment::create([
    //         'student_id' => $student->id,
    //         'type' => 'course',
    //         'amount' => $validated['amount'],
    //         'method' => $validated['payment_method'],
    //         'receipt' => $receiptPath,
    //         'verified' => false,
    //         'rejected' => false,
    //     ]);

    //     return redirect()->route('student.applications.index')->with('success', 'Installment submitted and pending verification.');
    // }










//     public function pay(Request $request)
// {
//     \Log::info('InstallmentPaymentController@pay called');

//     $student = Auth::user()->student;

//     $validated = $request->validate([
//         'application_id' => 'required|exists:student_course_applications,id',
//         'amount' => 'required|numeric|min:100',
//         'payment_method' => 'required|in:Online Transfer,Bank Payment,Handover',
//         'receipt' => 'nullable|file|mimes:jpg,jpeg,png,pdf|max:2048',
//     ]);

//     $application = StudentCourseApplication::with('course')
//         ->where('id', $validated['application_id'])
//         ->where('student_id', $student->id)
//         ->firstOrFail();

//     $course = $application->course;
//     $fullAmount = $application->full_amount;
//     $alreadyPaid = $application->amount_paid;
//     $amount = $validated['amount'];

//     // Parse course duration (e.g., "1 Month", "2 Months")
//     preg_match('/(\d+)/', $course->duration, $matches);
//     $durationMonths = isset($matches[1]) ? (int)$matches[1] : 0;

//     // Validate allowed installment options
//     if ($durationMonths === 1) {
//         return back()->withErrors(['amount' => 'Installments are not allowed for 1-month courses. Please pay full amount at once.']);
//     }

//     if (!in_array($durationMonths, [2, 3])) {
//         return back()->withErrors(['amount' => 'Invalid course duration for installment payments.']);
//     }

//     $installmentAmount = $fullAmount / $durationMonths;
//     $nextExpected = round($installmentAmount * (1 + floor($alreadyPaid / $installmentAmount)), 2);

//     // Prevent overpaying or underpaying
//     if (round($amount, 2) !== round($installmentAmount, 2)) {
//         return back()->withErrors(['amount' => "You must pay exactly Rs. {$installmentAmount} as your next installment."]);
//     }

//     // // Upload receipt if required
//     // $receiptPath = null;
//     // if ($request->hasFile('receipt') && $validated['payment_method'] !== 'Handover') {
//     //     $receiptPath = $request->file('receipt')->store('receipts', 'public');
//     // }

//     // // Save payment
//     // Payment::create([
//     //     'student_id' => $student->id,
//     //     'type' => 'course',
//     //     'amount' => $amount,
//     //     'method' => $validated['payment_method'],
//     //     'receipt' => $receiptPath,
//     //     'verified' => false,
//     //     'rejected' => false,
//     // ]);

//     // return redirect()->route('student.applications.index')
//     //     ->with('success', 'Installment submitted and pending verification.');

//     // Upload receipt if required
// $receiptPath = null;
// if ($request->hasFile('receipt') && $validated['payment_method'] !== 'Handover') {
//     $receiptPath = $request->file('receipt')->store('receipts', 'public');
// }

// // Save payment
// Payment::create([
//     'student_id' => $student->id,
//     'type' => 'course',
//     'amount' => $amount,
//     'method' => $validated['payment_method'],
//     'receipt' => $receiptPath,
//     'verified' => false,
//     'rejected' => false,
//     'application_id' => $application->id, // ✅ if your payments table has this field
// ]);

// // Update amount_paid and due date
// $application->amount_paid += $amount;
// $application->next_payment_due_date = now()->addDays(30); // or your business rule

// // ✅ If fully paid, update status to completed
// // if (round($application->amount_paid, 2) >= round($application->full_amount, 2)) {
// //     $application->status = 'completed';
// // }

// $application->save();

// // Optional: log for debugging
// \Log::info("Installment paid by student {$student->id} for application {$application->id}. New total paid: {$application->amount_paid}");

// return redirect()->route('student.dashboard')->with('success', 'Installment submitted and pending verification.');

// }

