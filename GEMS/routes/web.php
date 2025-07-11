<?php

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
use App\Http\Controllers\Admin\CourseExamController;

use App\Http\Controllers\Reports\StudentReportController;
use App\Http\Controllers\Reports\PaymentReportController;


use App\Http\Controllers\Admin\StaffInstallmentPaymentController;
use App\Http\Controllers\Admin\StaffCourseApplicationController;





Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});



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

//resubmit registration payemnt
Route::middleware(['auth', 'role:student'])->group(function () {
    Route::post('/student/resubmit-registration-payment', [StudentController::class, 'resubmitRegistrationPayment']);
});

//staff registering a student to a course
Route::middleware(['auth', 'role:admin'])->group(function () {
    Route::post('/admin/students/{student}/course-application', [StaffCourseApplicationController::class, 'store'])->name('admin.students.course.apply');
});

// staff pay the installments
Route::post('/admin/students/{student}/installment-payment', [StaffInstallmentPaymentController::class, 'store'])
    ->name('admin.students.installment-payment');


    //staff schedule placement test
// Route::post('/admin/students/{student}/schedule-placement', [PlacementTestController::class, 'scheduleForStudent'])->name('admin.students.schedule-placement');


Route::middleware(['auth', 'role:admin'])->group(function () {
    Route::post('/admin/students/{student}/schedule-placement', [PlacementTestScheduleController::class, 'scheduleForStudent'])
        ->name('admin.students.schedule-placement');
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

Route::middleware(['auth', 'role:admin,teacher'])->prefix('admin')->group(function () {
    Route::get('/placement-tests', [PlacementTestController::class, 'index'])->name('placement.index');
    Route::get('/placement-tests/{id}', [PlacementTestController::class, 'show'])->name('placement.show');
    Route::get('/placement-tests/{id}/download', [PlacementTestController::class, 'downloadMarksheet'])->name('placement.download');
    Route::post('/placement-tests/{id}/upload', [PlacementTestController::class, 'uploadMarksheet'])->name('placement.upload');
});



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
// Route::middleware(['auth', 'role:admin,frontdesk'])->group(function () {
//     Route::post('/admin/students/{student}/staff-installment-payment', [StaffInstallmentPaymentController::class, 'store'])
//         ->name('admin.students.staff-installment-payment');
// });







    //course material
    Route::middleware(['auth'])->group(function () {
    Route::post('/course-materials', [CourseMaterialController::class, 'store'])->name('materials.store');
    Route::get('/course-materials/{courseId}', [CourseMaterialController::class, 'index'])->name('materials.index');
});

//course exam
Route::middleware(['auth', 'role:admin,teacher'])->prefix('admin')->name('admin.')->group(function () {
    // Create new course exam
    Route::post('/course-exams', [CourseExamController::class, 'store'])->name('course_exams.store');

    // Update existing course exam
    Route::put('/course-exams/{exam}', [CourseExamController::class, 'update'])->name('course_exams.update');

    // Delete course exam
    Route::delete('/course-exams/{exam}', [CourseExamController::class, 'destroy'])->name('course_exams.destroy');

    //view exam
    Route::get('/exams/{exam}', [CourseExamController::class, 'show'])->name('exams.show');

    //exam results
    Route::get('/course-exams/{id}/download', [CourseExamController::class, 'downloadMarksheet'])->name('course_exams.download');
Route::post('/course-exams/{id}/upload', [CourseExamController::class, 'uploadMarksheet'])->name('course_exams.upload');



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
