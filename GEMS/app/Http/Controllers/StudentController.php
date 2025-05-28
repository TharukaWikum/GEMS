<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Student;
use Illuminate\Http\Request;
use Inertia\Inertia;

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
            'students.payment_method',
            'students.payment_receipt',
            'students.student_status'
        )
        ->get();

    return Inertia::render('Users/Students/Index', [
        'students' => $students,
        'auth' => [
            'user' => auth()->user(),
        ],
    ]);
}
// student profile view student
public function show($id)
{
    $student = User::where('users.role', 'student')
        ->where('users.id', $id)
        ->join('students', 'users.id', '=', 'students.user_id')
        ->select(
            'users.id',
            'users.name',
            'users.email',
            'users.status',
            'students.dob',
            'students.gender',
            'students.nationality',
            'students.preferred_course',
            'students.payment_method',
            'students.payment_receipt',
            'students.student_status'
        )
        ->firstOrFail();

    return Inertia::render('Admin/Students/StudentProfile', [
        'student' => $student,
        'auth' => [
            'user' => auth()->user(),
        ],
    ]);
}
}



