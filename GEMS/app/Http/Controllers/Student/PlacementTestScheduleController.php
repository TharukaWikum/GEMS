<?php

// namespace App\Http\Controllers\Student;

// use App\Http\Controllers\Controller;
// use App\Models\PlacementTest;
// use Illuminate\Http\Request;
// use Illuminate\Support\Facades\Auth;
// use Inertia\Inertia;
// use Carbon\Carbon;

// class PlacementTestScheduleController extends Controller
// {

//     public function index()
// {
//     $student = Auth::user()->student;

//     $eligibleDates = [];
//     $today = Carbon::now();

//     for ($i = 0; $i < 14; $i++) {
//         $date = $today->copy()->addDays($i);
//         $dayName = $date->format('l');

//         if (in_array($dayName, ['Saturday', 'Sunday', 'Monday'])) {
//             $existingTest = PlacementTest::whereDate('test_date', $date)->first();
//             $studentCount = $existingTest ? $existingTest->results()->count() : 0;
//             $cancelled = $existingTest ? $existingTest->status === 'cancelled' : false;

//             if ($studentCount < 10 && !$cancelled) {
//                 $eligibleDates[] = $date->toDateString();
//             }
//         }
//     }

//     // 👇 Get the currently scheduled date if exists
//     $currentResult = $student->placementTestResults()
//         ->whereHas('placementTest', fn ($q) => $q->where('status', 'scheduled'))
//         ->latest()
//         ->first();

//     $currentScheduledDate = $currentResult?->placementTest?->test_date;

//     return Inertia::render('Student/PlacementTest/Schedule', [
//         'eligibleDates' => $eligibleDates,
//         'currentScheduledDate' => $currentScheduledDate,
//     ]);
// }



// public function schedule(Request $request)
// {
//     $request->validate([
//         'scheduled_date' => [
//             'required',
//             'date',
//             'after_or_equal:today',
//             function ($attribute, $value, $fail) {
//                 $day = Carbon::parse($value)->format('l');
//                 if (!in_array($day, ['Saturday', 'Sunday', 'Monday'])) {
//                     $fail('Only Saturday, Sunday, and Monday are allowed.');
//                 }
//             },
//         ],
//     ]);

//     $date = $request->scheduled_date;
//     $student = Auth::user()->student;

//     // ✅ Check for existing result not completed
//     $existingResult = $student->placementTestResults()
//         ->whereHas('placementTest', fn ($q) => $q->where('status', '!=', 'completed'))
//         ->latest()
//         ->first();

//     if ($existingResult) {
//         $oldTest = $existingResult->placementTest;
//         $existingResult->delete(); // ❌ remove old result

//         // ✅ If old test has no more students, delete it
//         if ($oldTest && $oldTest->results()->count() === 0) {
//             $oldTest->delete();
//         }
//     }

//     // ✅ Create or reuse test for new date
//     $test = PlacementTest::firstOrCreate(
//         ['test_date' => $date],
//         ['title' => 'Placement Test - ' . $date, 'status' => 'scheduled']
//     );

//     // ✅ Check limit
//     if ($test->results()->count() >= 10) {
//         return back()->withErrors(['scheduled_date' => 'Date limit reached. Choose another day.']);
//     }

//     // ✅ Register student to new test
//     $test->results()->create([
//         'student_id' => $student->id,
//     ]);

//     // ✅ Update student status
//     $student->update(['student_status' => 'placement_scheduled']);

//     return redirect()->route('student.dashboard')->with('success', 'Placement test scheduled for ' . $date);
// }



    
// }


namespace App\Http\Controllers\Student;

use App\Http\Controllers\Controller;
use App\Models\Student;
use App\Models\PlacementTest;
use App\Models\PlacementTestResult;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;

class PlacementTestScheduleController extends Controller
{
    public function index()
    {
        $student = Auth::user()->student;
        $eligibleDates = [];
        $today = Carbon::now();

        // 🔁 Loop next 14 days and allow Sat/Sun/Mon if < 10 students
        for ($i = 0; $i < 14; $i++) {
            $date = $today->copy()->addDays($i);
            $dayName = $date->format('l');

            if (in_array($dayName, ['Saturday', 'Sunday', 'Monday'])) {
                $existingTest = PlacementTest::whereDate('test_date', $date)->first();
                $studentCount = $existingTest ? $existingTest->results()->count() : 0;
                $cancelled = $existingTest ? $existingTest->status === 'cancelled' : false;

                if ($studentCount < 10 && !$cancelled) {
                    $eligibleDates[] = $date->toDateString();
                }
            }
        }

        // 👇 Check if student already scheduled a test
        $currentResult = $student->placementTestResults()
            ->whereHas('placementTest', fn ($q) => $q->where('status', 'scheduled'))
            ->latest()
            ->first();

        $currentScheduledDate = $currentResult?->placementTest?->test_date;

        // ✅ Detect ABSENT: test date passed + no marks
        if ($currentResult && Carbon::parse($currentScheduledDate)->isPast()) {
            $noMarks = is_null($currentResult->writing)
                && is_null($currentResult->speaking)
                && is_null($currentResult->reading)
                && is_null($currentResult->listening);

            if ($noMarks) {
                $oldTest = $currentResult->placementTest;
                $currentResult->delete();

                if ($oldTest && $oldTest->results()->count() === 0) {
                    $oldTest->delete();
                }

                $currentScheduledDate = null; // ✅ so frontend allows new scheduling
                $student->update(['student_status' => 'placement_scheduled']);
            }
        }

        return Inertia::render('Student/PlacementTest/Schedule', [
            'eligibleDates' => $eligibleDates,
            'currentScheduledDate' => $currentScheduledDate,
        ]);
    }

    public function schedule(Request $request)
    {
        $request->validate([
            'scheduled_date' => [
                'required',
                'date',
                'after_or_equal:today',
                function ($attribute, $value, $fail) {
                    $day = Carbon::parse($value)->format('l');
                    if (!in_array($day, ['Saturday', 'Sunday', 'Monday'])) {
                        $fail('Only Saturday, Sunday, and Monday are allowed.');
                    }
                },
            ],
        ]);

        $date = $request->scheduled_date;
        $student = Auth::user()->student;

        // ✅ Delete existing (incomplete) result
        $existingResult = $student->placementTestResults()
            ->whereHas('placementTest', fn ($q) => $q->where('status', '!=', 'completed'))
            ->latest()
            ->first();

        if ($existingResult) {
            $oldTest = $existingResult->placementTest;
            $existingResult->delete();

            if ($oldTest && $oldTest->results()->count() === 0) {
                $oldTest->delete();
            }
        }

        // ✅ Create or find test for selected date
        $test = PlacementTest::firstOrCreate(
            ['test_date' => $date],
            ['title' => 'Placement Test - ' . $date, 'status' => 'scheduled']
        );

        if ($test->results()->count() >= 10) {
            return back()->withErrors(['scheduled_date' => 'Date limit reached. Choose another day.']);
        }

        $test->results()->create(['student_id' => $student->id]);
        $student->update(['student_status' => 'placement_scheduled']);

        return redirect()->route('student.dashboard')->with('success', 'Placement test scheduled for ' . $date);
    }


      
public function scheduleForStudent(Request $request, $studentId)
{
    $request->validate([
        'scheduled_date' => [
            'required', 'date', 'after_or_equal:today',
            function ($attribute, $value, $fail) {
                $day = Carbon::parse($value)->format('l');
                if (!in_array($day, ['Saturday', 'Sunday', 'Monday'])) {
                    $fail('Only Saturday, Sunday, and Monday are allowed.');
                }
            },
        ],
    ]);

    $date = $request->scheduled_date;

    DB::transaction(function () use ($date, $studentId) {
        // Clean up any existing incomplete test
        $existing = PlacementTestResult::where('student_id', $studentId)
            ->whereHas('placementTest', fn ($q) => $q->where('status', 'scheduled'))
            ->first();

        if ($existing) {
            $test = $existing->placementTest;
            $existing->delete();
            if ($test && $test->results()->count() === 0) {
                $test->delete();
            }
        }

        // Create or reuse test
        $test = PlacementTest::firstOrCreate(
            ['test_date' => $date],
            ['title' => 'Placement Test - ' . $date, 'status' => 'scheduled']
        );

        if ($test->results()->count() >= 10) {
            throw new \Exception('Date full. Choose another.');
        }

        $test->results()->create(['student_id' => $studentId]);
        Student::findOrFail($studentId)->update(['student_status' => 'placement_scheduled']);
    });

    return back()->with('success', 'Placement Test scheduled for ' . $date);
}
}
