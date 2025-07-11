<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Student;
use App\Models\Payment;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB; 

class StudentRegisterController extends Controller
{
    public function create()
    {
        return Inertia::render('Users/Students/Pages/Register');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required',
            'email' => 'required|email|unique:users',
            'dob' => 'required|date',
            'gender' => 'required',
            'nationality' => 'required',
            // 'nic' => 'required|unique:students',
            'preferred_course' => 'required',
            'payment_method' => 'required|in:Bank Payment,Online Transfer,Handover',
            'payment_receipt' => 'nullable|file|mimes:jpg,jpeg,png,pdf|max:2048',
            'target_country' => 'required|string|max:255','target_score' => 'required|numeric|min:0|max:9.0',
        ]);

        $user = User::create([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'password' => Hash::make('12345678'), // or generate random
            'role' => 'student',
            'status' => 'active',
        ]);

        $student = Student::create([
    'user_id' => $user->id,
    'dob' => $validated['dob'],
    'gender' => $validated['gender'],
    'nationality' => $validated['nationality'],
    'preferred_course' => $validated['preferred_course'],
    'student_status' => 'prospect',
    'target_country' => $validated['target_country'],
    'target_score' => $validated['target_score'],
]);

        $receiptPath = null;
    if ($request->hasFile('payment_receipt') && in_array($validated['payment_method'], ['Online Transfer', 'Bank Payment'])) {
    $receiptPath = $request->file('payment_receipt')->store('receipts', 'public');
}

        Payment::create([
        'student_id' => $student->id,
        'type' => 'registration',
        'amount' => 2500.00, // Optional: can be filled if known
        'method' => $validated['payment_method'],
        'receipt' => $receiptPath,
        'verified' => false,
    ]);

    
    return redirect()->route('students.index')->with('success', 'Student registered with payment successfully.');

        
    }
}
