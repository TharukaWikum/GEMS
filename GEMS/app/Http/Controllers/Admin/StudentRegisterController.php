<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Student;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

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
            'nic' => 'required|unique:students',
            'preferred_course' => 'required',
            'payment_method' => 'required',
            'payment_receipt' => 'required|file|mimes:jpg,jpeg,png,pdf|max:2048',
        ]);

        $user = User::create([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'password' => Hash::make('12345678'), // or generate random
            'role' => 'student',
            'status' => 'active',
        ]);

        Student::create([
            'user_id' => $user->id,
            'dob' => $validated['dob'],
            'gender' => $validated['gender'],
            'nationality' => $validated['nationality'],
            'nic' => $validated['nic'],
            'preferred_course' => $validated['preferred_course'],
            'payment_method' => $validated['payment_method'],
            'payment_receipt' => $request->file('payment_receipt')->store('receipts', 'public'),
            'student_status' => 'prospect',
        ]);

        return redirect()->route('students.index')->with('success', 'Student added successfully');

        
    }
}
