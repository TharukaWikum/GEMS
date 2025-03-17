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


use App\Http\Controllers\Auth\PasswordResetController;
use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\Auth\RegisteredUserController;

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
