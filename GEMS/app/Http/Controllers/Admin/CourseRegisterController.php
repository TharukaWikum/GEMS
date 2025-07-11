<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\Course;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CourseRegisterController extends Controller
{
    public function create()
    {
        $teachers = User::where('role', 'teacher')->select('id', 'name')->get();

        return Inertia::render('Admin/Courses/CourseForm', [
            'teachers' => $teachers,
        ]);
    }

    public function store(Request $request)
{
    $validated = $request->validate([
        'name' => 'required|string|max:255',
        'description' => 'nullable|string',
        'course_fee' => 'required|numeric|min:0',
        'duration' => 'required|string|max:100',
        'conductor_id' => 'required|exists:staff,id', // ✅ corrected field + table
        'status' => 'required|in:Active,Inactive,Completed,Cancelled', // ✅ match enum
        'type' => 'required|in:General Course,Academic Course',
    ]);

    Course::create([
        'name' => $validated['name'],
        'description' => $validated['description'],
        'course_fee' => $validated['course_fee'],
        'duration' => $validated['duration'],
        'conductor_id' => $validated['conductor_id'], // ✅ correct column
        'status' => $validated['status'],
        'type' => $validated['type'],
    ]);

    return redirect()->back()->with('success', 'Course added successfully!');
}
}
