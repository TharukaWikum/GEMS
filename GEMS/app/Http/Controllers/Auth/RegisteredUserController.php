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
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\Rules;
use Inertia\Inertia;
use Inertia\Response;

class RegisteredUserController extends Controller
{
    public function create(): Response
    {
        return Inertia::render('Auth/Register');
    }

    public function store(Request $request): RedirectResponse
    {
        Log::info('🚀 Register Request Received', $request->all()); // Debug request data

        $validated = $request->validate([
            // User validation
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users,email',
            'password' => ['required', 'confirmed', Rules\Password::defaults()],

            // Student validation
            'dob' => 'required|date',
            'gender' => 'required|in:male,female',
            'nationality' => 'required|string',
            'nic' => 'required|string|unique:students,nic',
            'identification_document' => 'required|file|mimes:pdf,jpg,png|max:2048',
            'preferred_course' => 'required|string|in:IELTS Academic,IELTS General',
            'payment_method' => 'required|string|in:Bank Payment,Online Transfer,Handover',
            'payment_receipt' => 'required|file|mimes:pdf,jpg,png|max:2048',
        ]);

        Log::info('✅ Validation Passed', $validated); // Log successful validation

        try {
            DB::beginTransaction(); // Begin database transaction

            // Store the user
            $user = User::create([
                'name' => $request->name,
                'email' => $request->email,
                'password' => Hash::make($request->password),
                'role' => 'student',
                'status' => 'active',
            ]);

            Log::info('✅ User Created', ['user_id' => $user->id]);

            // Handle file uploads
            $identificationPath = $request->file('identification_document')->store('documents');
            $paymentReceiptPath = $request->file('payment_receipt')->store('payments');

            // Store the student details
            $student = Student::create([
                'user_id' => $user->id,
                'dob' => $request->dob,
                'gender' => $request->gender,
                'nationality' => $request->nationality,
                'nic' => $request->nic,
                'identification_document' => $identificationPath,
                'preferred_course' => $request->preferred_course,
                'payment_method' => $request->payment_method,
                'payment_receipt' => $paymentReceiptPath,
                'student_status' => 'prospect',
            ]);

            Log::info('✅ Student Created', ['student_id' => $student->id]);

            DB::commit(); // Commit the transaction

            event(new Registered($user));
            Auth::login($user);

            return redirect(route('dashboard'));
        } catch (\Exception $e) {
            DB::rollBack(); // Rollback transaction if an error occurs
            Log::error('❌ Error Saving Student', ['error' => $e->getMessage()]);
            return back()->withErrors(['error' => 'Failed to register student.']);
        }
    }
}

// namespace App\Http\Controllers\Auth;

// use App\Http\Controllers\Controller;
// use App\Models\User;
// use App\Models\Student;
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
//     public function create(): Response
//     {
//         return Inertia::render('Auth/Register');
//     }

//     public function store(Request $request): RedirectResponse
//     {
//         $request->validate([
//             // User validation
//             'name' => 'required|string|max:255',
//             'email' => 'required|string|email|max:255|unique:users,email',
//             'password' => ['required', 'confirmed', Rules\Password::defaults()],

//             // Student validation
//             'dob' => 'required|date',
//             'gender' => 'required|in:male,female',
//             'nationality' => 'required|string',
//             'nic' => 'required|string|unique:students,nic',
//             'identification_document' => 'required|file|mimes:pdf,jpg,png|max:2048',
//         ]);

//         // Store the user
//         $user = User::create([
//             'name' => $request->name,
//             'email' => $request->email,
//             'password' => Hash::make($request->password),
//             'role' => 'student',
//             'status' => 'active',
//         ]);

//         // Store the student details
//         Student::create([
//             'user_id' => $user->id,
//             'dob' => $request->dob,
//             'gender' => $request->gender,
//             'nationality' => $request->nationality,
//             'nic' => $request->nic,
//             'identification_document' => $request->file('identification_document')->store('documents'),
//             'preferred_course' => $request->preferred_course,
//             'payment_method' => $request->payment_method,
//             'payment_receipt' => $request->file('payment_receipt')->store('payments'),
//             'student_status' => 'prospect',
//         ]);

//         event(new Registered($user));

//         Auth::login($user);

//         return redirect(route('dashboard'));
//     }
// }











// namespace App\Http\Controllers\Auth;

// use App\Http\Controllers\Controller;
// use App\Models\User;
// use App\Models\Student;
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
//             // User fields
//             'name' => 'required|string|max:255',
//             'email' => 'required|string|lowercase|email|max:255|unique:users,email',
//             'password' => ['required', 'confirmed', Rules\Password::defaults()],

//             // Student-specific fields
//             'dob' => 'required|date',
//             'gender' => 'required|in:male,female',
//             'nationality' => 'required|string',
//             'nic' => 'required|string|unique:students,nic',
//             'identification_document' => 'required|file|mimes:pdf,jpg,png|max:2048',
//             'preferred_course' => 'required|string|in:IELTS Academic,IELTS General',
//             'payment_method' => 'required|string|in:Bank Payment,Online Transfer,Handover',
//             'payment_receipt' => 'required|file|mimes:pdf,jpg,png|max:2048',
//         ]);

//         // Create the user with role = student
//         $user = User::create([
//             'name' => $request->name,
//             'email' => $request->email,
//             'password' => Hash::make($request->password),
//             'role' => 'student',
//             'status' => 'active', // Default active status
//         ]);

//         // Store student-specific data
//         Student::create([
//             'user_id' => $user->id,
//             'dob' => $request->dob,
//             'gender' => $request->gender,
//             'nationality' => $request->nationality,
//             'nic' => $request->nic,
//             'identification_document' => $request->file('identification_document')->store('documents'),
//             'preferred_course' => $request->preferred_course,
//             'payment_method' => $request->payment_method,
//             'payment_receipt' => $request->file('payment_receipt')->store('payments'),
//             'student_status' => 'prospect', // Default status for new students
//         ]);

//         // Fire Laravel registration event
//         event(new Registered($user));

//         // Log in the student after successful registration
//         Auth::login($user);

//         return redirect(route('dashboard', absolute: false))->with('success', 'Registration successful!');
//     }
// }











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
