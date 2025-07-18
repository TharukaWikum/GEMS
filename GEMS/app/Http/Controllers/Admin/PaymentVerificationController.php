<?php


namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Payment;
use App\Models\Student;
use App\Models\User;
use App\Models\StudentCourseApplication;
use App\Models\CourseStudent;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Notifications\PaymentRejectedNotification;
use App\Notifications\RegistrationPaymentVerified;
use App\Notifications\CourseEnrollmentConfirmed;
use App\Notifications\InstallmentPaymentReceived;




class PaymentVerificationController extends Controller
{
    public function index()
    {
        $pendingPayments = Payment::with('student.user')
            ->whereIn('type', ['registration', 'course'])
            ->where('verified', false)
            ->where('rejected', false)
            ->get();

        $verifiedPayments = Payment::with(['student.user', 'verifier'])
            ->whereIn('type', ['registration', 'course'])
            ->where('verified', true)
            ->get();

        $rejectedPayments = Payment::with(['student.user'])
            ->whereIn('type', ['registration', 'course'])
            ->where('rejected', true)
            ->get()
            ->map(function ($p) {
                $p->rejected_by_name = User::find($p->rejected_by)?->name ?? 'N/A';
                return $p;
            });

        return Inertia::render('Admin/Payments/Index', [
            'pendingPayments' => $pendingPayments,
            'verifiedPayments' => $verifiedPayments,
            'rejectedPayments' => $rejectedPayments,
        ]);
    }

    public function reject(Request $request, $id)
    {
        $request->validate([
            'reason' => 'required|string|max:1000',
        ]);

        $payment = Payment::with('student.user')->findOrFail($id);

        $payment->update([
            'rejected' => true,
            'rejected_at' => now(),
            'rejected_by' => auth()->id(),
            'rejection_reason' => $request->reason,
        ]);

          // 🔁 If this is the first course payment, mark the application as rejected_initial
    if ($payment->type === 'course' && $payment->application_id) {
        $application = StudentCourseApplication::find($payment->application_id);
        if ($application && $application->status === 'pending') {
    $application->update(['status' => 'cancelled']);
}
    }

        $user = $payment->student->user;
        $user->notify(new PaymentRejectedNotification(ucfirst($payment->type), $request->reason));

        return redirect()->back()->with('success', 'Payment rejected and user notified.');
    }

    public function verify($id)
{
    $payment = Payment::with('student.user')->findOrFail($id);

    // Mark payment as verified
    $payment->update([
        'verified' => true,
        'verified_at' => now(),
        'verified_by' => auth()->id(),
    ]);

    $student = $payment->student;

    // ✅ 1. REGISTRATION PAYMENT
    if ($payment->type === 'registration') {
        $student->update(['student_status' => 'registered']);
        $student->user->notify(new RegistrationPaymentVerified());

        return redirect()->back()->with('success', 'Registration payment verified and student registered.');
    }


if ($payment->type === 'course') {
    $application = StudentCourseApplication::where('student_id', $student->id)
        ->latest()
        ->first();

    if (!$application) {
        return redirect()->back()->with('error', 'No course application found.');
    }

    $newAmountPaid = $application->amount_paid + $payment->amount;
    $isFullPayment = $newAmountPaid >= $application->full_amount;

    $application->update([
        'amount_paid' => $newAmountPaid,
        'last_payment_verified_at' => now(),
    ]);

    $course = $application->course;

    // ✅ First time payment – handle only first installment or full payment
    // if ($application->status === 'pending') {
    if (in_array($application->status, ['pending', 'cancelled'])) {
        $application->update(['status' => 'registered']);

        CourseStudent::create([
            'student_id' => $student->id,
            'course_id' => $course->id,
            'status' => 'Registered',
            'start_date' => now(),
            'end_date' => now()->addMonths((int)$course->duration),
        ]);

        $student->update(['student_status' => 'course_assigned']);

        $student->user->notify(new CourseEnrollmentConfirmed(
            $course->name,
            $payment->amount,
            $payment->method
        ));

        // ✅ Optional: if full paid at once
        if ($isFullPayment) {
            $application->update([
                'next_payment_due_date' => null,
                'status' => 'completed'
            ]);

            $student->user->notify(new \App\Notifications\FinalCoursePaymentCompleted(
                $course->name,
                $newAmountPaid,
                $payment->method
            ));
        }
    } else {
        // ✅ Installment payments
        $student->user->notify(new \App\Notifications\InstallmentPaymentReceived(
            $payment->amount,
            $payment->method,
            $application->full_amount,
            $newAmountPaid
        ));

        if ($isFullPayment) {
            $application->update([
                'next_payment_due_date' => null,
                'status' => 'completed'
            ]);

            $student->user->notify(new \App\Notifications\FinalCoursePaymentCompleted(
                $course->name,
                $newAmountPaid,
                $payment->method
            ));
        }
    }

    return redirect()->back()->with('success', 'Course payment verified and updated.');
}


    return redirect()->back()->with('info', 'No action taken. Unknown payment type.');
}


}

