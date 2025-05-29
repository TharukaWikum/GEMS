<?php

// use App\Http\Controllers\ProfileController;
// use Illuminate\Foundation\Application;
// use Illuminate\Support\Facades\Route;
// use Inertia\Inertia;
// use Illuminate\Http\Request;
// use Illuminate\Support\Facades\Password;

// Route::get('/', function () {
//     return Inertia::render('Welcome', [
//         'canLogin' => Route::has('login'),
//         'canRegister' => Route::has('register'),
//         'laravelVersion' => Application::VERSION,
//         'phpVersion' => PHP_VERSION,
//     ]);
// });

// Route::get('/dashboard', function () {
//     return Inertia::render('Dashboard');
// })->middleware(['auth', 'verified'])->name('dashboard');

// Route::middleware('auth')->group(function () {
//     Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
//     Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
//     Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
// });

// require __DIR__.'/auth.php';




// use App\Http\Controllers\ProfileController;
// use Illuminate\Foundation\Application;
// use Illuminate\Support\Facades\Route;
// use Inertia\Inertia;
// use Illuminate\Http\Request;
// use Illuminate\Support\Facades\Password;

// Route::get('/', function () {
//     return Inertia::render('Welcome', [
//         'canLogin' => Route::has('login'),
//         'canRegister' => Route::has('register'),
//         'laravelVersion' => Application::VERSION,
//         'phpVersion' => PHP_VERSION,
//     ]);
// });

// Route::get('/dashboard', function () {
//     return Inertia::render('Dashboard');
// })->middleware(['auth', 'verified'])->name('dashboard');

// Route::middleware('auth')->group(function () {
//     Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
//     Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
//     Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
// });

// /**
//  * ✅ Password Reset Routes
//  */

// // Show Forgot Password Form (React Component)
// Route::get('/forgot-password', function () {
//     return Inertia::render('Auth/ForgotPassword');
// })->middleware('guest')->name('password.request');

// // Handle Password Reset Link Request
// Route::post('/forgot-password', function (Request $request) {
//     $request->validate(['email' => 'required|email']);

//     $status = Password::sendResetLink($request->only('email'));

//     return $status === Password::RESET_LINK_SENT
//         ? back()->with(['status' => __($status)])
//         : back()->withErrors(['email' => __($status)]);
// })->middleware('guest')->name('password.email');

// // Show Reset Password Form (React Component)
// Route::get('/reset-password/{token}', function (string $token) {
//     return Inertia::render('Auth/ResetPassword', ['token' => $token]);
// })->middleware('guest')->name('password.reset');

// // Handle Reset Password Form Submission
// Route::post('/reset-password', function (Request $request) {
//     $request->validate([
//         'token' => 'required',
//         'email' => 'required|email',
//         'password' => 'required|min:8|confirmed',
//     ]);

//     $status = Password::reset(
//         $request->only('email', 'password', 'password_confirmation', 'token'),
//         function ($user, string $password) {
//             $user->forceFill([
//                 'password' => bcrypt($password),
//             ])->setRememberToken(\Illuminate\Support\Str::random(60));

//             $user->save();

//             event(new \Illuminate\Auth\Events\PasswordReset($user));
//         }
//     );

//     return $status === Password::PASSWORD_RESET
//         ? redirect()->route('login')->with('status', __($status))
//         : back()->withErrors(['email' => [__($status)]]);
// })->middleware('guest')->name('password.update');

// require __DIR__.'/auth.php';



// use App\Http\Controllers\Auth\PasswordResetController;
// use App\Http\Controllers\ProfileController;
// use Illuminate\Foundation\Application;
// use Illuminate\Support\Facades\Route;
// use Inertia\Inertia;
// use App\Http\Controllers\Auth\RegisteredUserController;

// Route::get('/', function () {
//     return Inertia::render('Welcome', [
//         'canLogin' => Route::has('login'),
//         'canRegister' => Route::has('register'),
//         'laravelVersion' => Application::VERSION,
//         'phpVersion' => PHP_VERSION,
//     ]);
// });


// Route::get('/dashboard', function () {
//     return Inertia::render('Dashboard');
// })->middleware(['auth', 'verified'])->name('dashboard');

// Route::middleware('auth')->group(function () {
//     Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
//     Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
//     Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
// });

// /**
//  * ✅ Password Reset Routes (Now Using a Controller)
//  */
// Route::get('/forgot-password', [PasswordResetController::class, 'showForgotPasswordForm'])
//     ->middleware('guest')->name('password.request');

// Route::post('/forgot-password', [PasswordResetController::class, 'sendResetLinkEmail'])
//     ->middleware('guest')->name('password.email');

// Route::get('/reset-password/{token}', [PasswordResetController::class, 'showResetPasswordForm'])
//     ->middleware('guest')->name('password.reset');

// Route::post('/reset-password', [PasswordResetController::class, 'resetPassword'])
//     ->middleware('guest')->name('password.update');

// require __DIR__.'/auth.php';



use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;


use App\Http\Controllers\Auth\RegisteredUserController;
use App\Http\Controllers\Auth\PasswordResetController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\StudentController;
use App\Http\Controllers\StaffController;
use App\Http\Controllers\CourseController;

use App\Http\Controllers\Admin\StudentRegisterController;
use App\Http\Controllers\Admin\StaffRegisterController;
use App\Http\Controllers\Admin\CourseRegisterController;





Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});



/**
 * ✅ Student Registration Routes
 */
Route::middleware('guest')->group(function () {
    Route::get('/register', [RegisteredUserController::class, 'create'])->name('register');
    Route::post('/register', [RegisteredUserController::class, 'store']);
});





Route::middleware(['auth', 'role:admin'])->group(function () {

        /**
 * ✅ View All Staff
 */
 

        /**
 * ✅ View All Courses
 */
    // Route::get('/courses', [CourseController::class, 'index'])->name('courses.index');

    /**
 * ✅ View All Students
 */
Route::get('/students', [StudentController::class, 'index'])->name('students.index');

           /**
 * ✅ Staff
 */


 // ✅ View All Staff
 Route::get('/staff', [StaffController::class, 'index'])->name('staff.index');

    //create Staff
    Route::get('/admin/staff/create', [StaffRegisterController::class, 'create'])->name('admin.staff.create');
    Route::post('/admin/staff/store', [StaffRegisterController::class, 'store'])->name('admin.staff.store');

    //view Staff
        Route::get('/staff', [StaffController::class, 'index'])->name('staff.index');



        // ✅ Create Course
        Route::get('/admin/courses/create', [CourseRegisterController::class, 'create'])->name('admin.courses.create');
        Route::post('/admin/courses/store', [CourseRegisterController::class, 'store'])->name('admin.courses.store');

        // View All Courses
        Route::get('/courses', [CourseController::class, 'index'])->name('courses.index');
});

//view a course
Route::get('/admin/courses/{id}', [CourseController::class, 'show'])->name('admin.courses.profile');


    /**
 * ✅ Create Internal Route for staff to Add Students
 */
Route::middleware(['auth', 'role:admin,teacher,frontdesk'])->group(function () {

           /**
 * ✅ Student
 */
    //create internal Student
    Route::get('/admin/students/create', [StudentRegisterController::class, 'create'])->name('admin.students.create');
    Route::post('/admin/students/store', [StudentRegisterController::class, 'store'])->name('admin.students.store');
});

//view student profile
Route::get('/admin/students/{id}', [StudentController::class, 'show'])->name('admin.students.profile');

// add course student
Route::post('/admin/students/{id}/assign-course', [StudentController::class, 'assignToCourse'])->name('admin.students.assignCourse');









/**
 * ✅ Password Reset Routes (Now Using a Controller)
 */
Route::get('/forgot-password', [PasswordResetController::class, 'showForgotPasswordForm'])
    ->middleware('guest')->name('password.request');

Route::post('/forgot-password', [PasswordResetController::class, 'sendResetLinkEmail'])
    ->middleware('guest')->name('password.email');

Route::get('/reset-password/{token}', [PasswordResetController::class, 'showResetPasswordForm'])
    ->middleware('guest')->name('password.reset');

Route::post('/reset-password', [PasswordResetController::class, 'resetPassword'])
    ->middleware('guest')->name('password.update');

require __DIR__.'/auth.php';
