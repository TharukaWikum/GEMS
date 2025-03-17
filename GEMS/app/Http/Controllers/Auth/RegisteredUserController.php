<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\Student;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use Inertia\Inertia;
use Inertia\Response;

class RegisteredUserController extends Controller
{
    /**
     * Display the registration view.
     */
    public function create(): Response
    {
        return Inertia::render('Auth/Register');
    }

    /**
     * Handle an incoming registration request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            // User fields
            'name' => 'required|string|max:255',
            'email' => 'required|string|lowercase|email|max:255|unique:users,email',
            'password' => ['required', 'confirmed', Rules\Password::defaults()],

            // Student-specific fields
            'dob' => 'required|date',
            'gender' => 'required|in:male,female',
            'nationality' => 'required|string',
            'nic' => 'required|string|unique:students,nic',
            'identification_document' => 'required|file|mimes:pdf,jpg,png|max:2048',
            'preferred_course' => 'required|string|in:IELTS Academic,IELTS General',
            'payment_method' => 'required|string|in:Bank Payment,Online Transfer,Handover',
            'payment_receipt' => 'required|file|mimes:pdf,jpg,png|max:2048',
        ]);

        // Create the user with role = student
        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'role' => 'student',
            'status' => 'active', // Default active status
        ]);

        // Store student-specific data
        Student::create([
            'user_id' => $user->id,
            'dob' => $request->dob,
            'gender' => $request->gender,
            'nationality' => $request->nationality,
            'nic' => $request->nic,
            'identification_document' => $request->file('identification_document')->store('documents'),
            'preferred_course' => $request->preferred_course,
            'payment_method' => $request->payment_method,
            'payment_receipt' => $request->file('payment_receipt')->store('payments'),
            'student_status' => 'prospect', // Default status for new students
        ]);

        // Fire Laravel registration event
        event(new Registered($user));

        // Log in the student after successful registration
        Auth::login($user);

        return redirect(route('dashboard', absolute: false))->with('success', 'Registration successful!');
    }
}


// namespace App\Http\Controllers\Auth;

// use App\Http\Controllers\Controller;
// use App\Models\User;
// use Illuminate\Auth\Events\Registered;
// use Illuminate\Http\RedirectResponse;
// use Illuminate\Http\Request;
// use Illuminate\Support\Facades\Auth;
// use Illuminate\Support\Facades\Hash;
// use Illuminate\Validation\Rules;
// use Inertia\Inertia;
// use Inertia\Response;

// class RegisteredUserController extends Controller
// {
//     /**
//      * Display the registration view.
//      */
//     public function create(): Response
//     {
//         return Inertia::render('Auth/Register');
//     }

//     /**
//      * Handle an incoming registration request.
//      *
//      * @throws \Illuminate\Validation\ValidationException
//      */
//     public function store(Request $request): RedirectResponse
//     {
//         $request->validate([
//             'name' => 'required|string|max:255',
//             'email' => 'required|string|lowercase|email|max:255|unique:'.User::class,
//             'password' => ['required', 'confirmed', Rules\Password::defaults()],
//         ]);

//         $user = User::create([
//             'name' => $request->name,
//             'email' => $request->email,
//             'password' => Hash::make($request->password),
//         ]);

//         event(new Registered($user));

//         Auth::login($user);

//         return redirect(route('dashboard', absolute: false));
//     }
// }
