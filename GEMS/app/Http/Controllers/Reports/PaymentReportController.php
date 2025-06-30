<?php

namespace App\Http\Controllers\Reports;

use App\Http\Controllers\Controller;
use App\Models\Payment;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Barryvdh\DomPDF\Facade\Pdf;

class PaymentReportController extends Controller
{
    public function index()
    {
        $now = Carbon::now();
        $yearStart = $now->copy()->startOfYear();
        $monthStart = $now->copy()->startOfMonth();
        $nextMonthStart = $now->copy()->addMonth()->startOfMonth();
        $nextMonthEnd = $nextMonthStart->copy()->endOfMonth();

        // Summary metrics
        $totalYearlyIncome = Payment::whereBetween('created_at', [$yearStart, $now])->sum('amount');
        $lastMonthIncome = Payment::whereBetween('created_at', [$now->copy()->subMonth()->startOfMonth(), $now->copy()->subMonth()->endOfMonth()])->sum('amount');
        $thisMonthExpected = Payment::whereMonth('due_date', $now->month)->sum('amount');
        $nextMonthExpected = Payment::whereBetween('due_date', [$nextMonthStart, $nextMonthEnd])->sum('amount');

        $duePayments = Payment::where('status', 'pending')
            ->where('due_date', '<', now())
            ->with(['student.user'])
            ->get();

        return Inertia::render('Reports/PaymentReport', [
            'summary' => [
                'total_yearly_income' => $totalYearlyIncome,
                'last_month_income' => $lastMonthIncome,
                'this_month_expected' => $thisMonthExpected,
                'next_month_expected' => $nextMonthExpected,
                'overdue_count' => $duePayments->count(),
                'overdue_amount' => $duePayments->sum('amount'),
            ],
            'overdue_details' => $duePayments->map(function ($payment) {
                return [
                    'student_name' => optional($payment->student->user)->name,
                    'email' => optional($payment->student->user)->email,
                    'amount' => $payment->amount,
                    'due_date' => $payment->due_date->format('Y-m-d'),
                    'payment_type' => $payment->payment_type,
                    'payment_method' => $payment->payment_method,
                ];
            }),
        ]);
    }



public function downloadAllPaymentsPdf()
{
    $payments = Payment::with(['student.user', 'verifiedBy', 'rejectedBy', 'application.course'])->get();

    $paymentDetails = $payments->map(function ($p) {
        return [
            'student_name' => optional($p->student->user)->name,
            'email' => optional($p->student->user)->email,
            'type' => $p->type,
            'amount' => $p->amount,
            'method' => $p->method,
            'verified' => $p->verified ? 'Yes' : 'No',
            'verified_by' => optional($p->verifiedBy)->name,
            'verified_at' => optional($p->verified_at)?->format('Y-m-d'),
            'rejected' => $p->rejected ? 'Yes' : 'No',
            'rejected_by' => optional($p->rejectedBy)->name,
            'rejected_at' => optional($p->rejected_at)?->format('Y-m-d'),
            'rejection_reason' => $p->rejection_reason,
            'course' => optional($p->application?->course)->name,
            'receipt' => $p->receipt,
            'created_at' => optional($p->created_at)->format('Y-m-d H:i'),
        ];
    });

    $pdf = Pdf::loadView('pdf.payment_report', [
        'payments' => $paymentDetails,
    ])->setPaper('A4', 'landscape');

    return $pdf->download('full_payment_report_' . now()->format('Ymd_His') . '.pdf');
}

public function viewAllPayments()
{
    $payments = Payment::with(['student.user', 'verifiedBy', 'rejectedBy', 'application.course'])->get();

    $paymentDetails = $payments->map(function ($p) {
        return [
            'student_name' => optional($p->student->user)->name,
            'email' => optional($p->student->user)->email,
            'type' => $p->type,
            'amount' => $p->amount,
            'method' => $p->method,
            'verified' => $p->verified ? 'Yes' : 'No',
            'verified_by' => optional($p->verifiedBy)->name,
            'verified_at' => optional($p->verified_at)?->format('Y-m-d'),
            'rejected' => $p->rejected ? 'Yes' : 'No',
            'rejected_by' => optional($p->rejectedBy)->name,
            'rejected_at' => optional($p->rejected_at)?->format('Y-m-d'),
            'rejection_reason' => $p->rejection_reason,
            'course' => optional($p->application?->course)->name,
            'receipt' => $p->receipt,
            'created_at' => optional($p->created_at)->format('Y-m-d H:i'),
        ];
    });

    return Inertia::render('Reports/AllPayments', [
        'payments' => $paymentDetails,
    ]);
}


}
