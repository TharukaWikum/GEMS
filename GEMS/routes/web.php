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

use App\Http\Controllers\Admin\PaymentVerificationController;
use App\Http\Controllers\Admin\PlacementTestController;
use App\Http\Controllers\Student\PlacementTestScheduleController;


use App\Http\Controllers\CourseMaterialController;

use App\Http\Controllers\Reports\StudentReportController;
use App\Http\Controllers\Reports\PaymentReportController;





Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

// Route::get('/dashboard', function () {
//     return Inertia::render('Dashboard');
// })->middleware(['auth', 'verified'])->name('dashboard');


// Route::get('/dashboard', [StudentReportController::class, 'index'])->middleware(['auth', 'verified'])->name('dashboard');

// Route::get('/dashboard', [StudentReportController::class, 'index'])
//     ->middleware(['auth', 'verified'])
//     ->name('dashboard');

// Route::middleware('auth')->group(function () {
//     Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
//     Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
//     Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
// });

// //reports
// Route::prefix('reports')->middleware(['auth', 'verified'])->group(function () {

//     // 🟢 1. Main Student Enrollment Report View (called inside Dashboard via Inertia)
//     Route::get('/student-enrollment', [StudentReportController::class, 'index'])->name('reports.student.enrollment');

//     // 🟢 2. Download Enrollment Report (CSV)
//     Route::get('/student-enrollment/download', [StudentReportController::class, 'download'])->name('reports.student.enrollment.download');

//     // 🟢 3. Monthly Registration Summary (JSON API for charts)
//     Route::get('/registration-summary', [StudentReportController::class, 'registrationSummary'])->name('reports.registration.summary');

//     // 🟢 4. Student Lifecycle Status Count (JSON API for charts)
//     Route::get('/lifecycle-status', [StudentReportController::class, 'lifecycleStatusReport'])->name('reports.lifecycle.status');

//     // 🟢 5. Enrollment vs Dropout (JSON API for charts)
//     Route::get('/enrollment-vs-dropout', [StudentReportController::class, 'enrollmentVsDropout'])->name('reports.enrollment.vs.dropout');

//     // 🟢 6. Nationality & Gender Distribution (JSON API for charts)
//     Route::get('/nationality-gender-distribution', [StudentReportController::class, 'nationalityGenderDistribution'])->name('reports.nationality.gender');

//     // 🟢 7. Course Enrollment Summary (JSON API for charts)
//     Route::get('/course-enrollment-summary', [StudentReportController::class, 'courseEnrollment'])->name('reports.course.enrollment');

//     Route::get('/reports/dashboard-summary', [StudentReportController::class, 'dashboardSummary'])
//     ->middleware(['auth', 'verified']);
// });


Route::get('/dashboard', [StudentReportController::class, 'index'])
    ->middleware(['auth', 'verified'])
    ->name('dashboard');

// 🟢 Authenticated user profile
Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

// 🟢 Reports
Route::prefix('reports')->middleware(['auth', 'verified'])->group(function () {
    Route::get('/student-enrollment/download', [StudentReportController::class, 'download'])
        ->name('reports.student.enrollment.download');

    // Detailed views
    Route::get('/student-status/{status}', [StudentReportController::class, 'statusDetails'])->name('reports.student.status.details');
    Route::get('/reports/student-status-pdf', [StudentReportController::class, 'downloadAllStatusPdf'])
    ->name('reports.student.status.all.pdf');

    // Route::get('/course/{id}/students', [StudentReportController::class, 'courseDetails'])->name('reports.course.details');
    Route::get('/course/{id}/students', [StudentReportController::class, 'courseDetails'])
    ->name('reports.course.details');
    Route::get('/course-students/download', [StudentReportController::class, 'downloadCourseStudents'])
    ->name('reports.course.students.download');


    Route::get('/course-enrollment-status/{status}', [StudentReportController::class, 'enrollmentStatusDetails'])->name('reports.enrollment.status.details');

    //payments
    Route::prefix('reports/payments')->group(function () {
    Route::get('/', [PaymentReportController::class, 'index'])->name('reports.payments');
    Route::get('/view', [PaymentReportController::class, 'viewAllPayments'])->name('reports.payments.view');
    Route::get('/download', [PaymentReportController::class, 'downloadAllPaymentsPdf'])->name('reports.payments.download');
});
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


//payemnt verify
Route::middleware(['auth', 'role:admin,teacher'])->prefix('admin')->group(function () {
    Route::get('/payments', [PaymentVerificationController::class, 'index'])->name('payments.index');
    Route::post('/payments/{id}/verify', [PaymentVerificationController::class, 'verify'])->name('payments.verify');
    Route::post('/payments/{id}/reject', [PaymentVerificationController::class, 'reject'])->name('payments.reject');
});






//placement test
// Route::middleware(['auth', 'role:admin,teacher'])->prefix('placement-tests')->group(function () {
//     Route::get('/{id}/download', [PlacementTestController::class, 'downloadMarksheet'])->name('placement.download');
//     Route::post('/{id}/upload', [PlacementTestController::class, 'uploadMarksheet'])->name('placement.upload');
// });
Route::middleware(['auth', 'role:admin,teacher'])->prefix('admin')->group(function () {
    Route::get('/placement-tests', [PlacementTestController::class, 'index'])->name('placement.index');
    Route::get('/placement-tests/{id}', [PlacementTestController::class, 'show'])->name('placement.show');
    Route::get('/placement-tests/{id}/download', [PlacementTestController::class, 'downloadMarksheet'])->name('placement.download');
    Route::post('/placement-tests/{id}/upload', [PlacementTestController::class, 'uploadMarksheet'])->name('placement.upload');
});

//schedule 
// Route::middleware(['auth', 'role:student'])->prefix('student')->group(function () {
//     Route::get('/dashboard', [StudentController::class, 'dashboard'])->name('student.dashboard');
//     Route::get('/placement-tests/schedule', [PlacementTestScheduleController::class, 'index'])->name('student.placement.schedule');
//     Route::post('/placement-tests/schedule', [PlacementTestScheduleController::class, 'schedule'])
//     ->name('student.placement.schedule.submit');
// });

Route::middleware(['auth', 'role:student'])->prefix('student')->group(function () {
    Route::get('/dashboard', [StudentController::class, 'dashboard'])->name('student.dashboard');

    // Show available dates
    Route::get('/placement-tests/schedule', [PlacementTestScheduleController::class, 'index'])
        ->name('student.placement.schedule');

    // Schedule or Reschedule
    Route::post('/placement-tests/schedule', [PlacementTestScheduleController::class, 'schedule'])
        ->name('student.placement.schedule.submit');
});



// Student course application routes
Route::prefix('student')->name('student.')->middleware('role:student')->group(function () {
    Route::get('courses', [\App\Http\Controllers\Student\CourseApplicationController::class, 'index'])->name('courses.index');
    Route::post('courses/apply', [\App\Http\Controllers\Student\CourseApplicationController::class, 'store'])->name('courses.apply');
    Route::get('applications', [\App\Http\Controllers\Student\CourseApplicationController::class, 'studentApplications'])->name('applications.index');
});


//installment paying
Route::post('installments/pay', [\App\Http\Controllers\Student\InstallmentPaymentController::class, 'pay'])
    ->name('student.installments.pay');





    //course material
    Route::middleware(['auth'])->group(function () {
    Route::post('/course-materials', [CourseMaterialController::class, 'store'])->name('materials.store');
    Route::get('/course-materials/{courseId}', [CourseMaterialController::class, 'index'])->name('materials.index');
});








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
