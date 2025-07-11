<?php

namespace App\Http\Controllers\Admin;
use Inertia\Inertia;

use App\Http\Controllers\Controller;
use App\Models\PlacementTest;
use App\Models\PlacementTestResult;
use App\Models\Student;
use Illuminate\Http\Request;
use PhpOffice\PhpSpreadsheet\IOFactory;
use PhpOffice\PhpSpreadsheet\Spreadsheet;
use PhpOffice\PhpSpreadsheet\Writer\Xlsx;
use Illuminate\Support\Facades\Notification;
use App\Notifications\PlacementTestResultsReleased;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;

class PlacementTestController extends Controller
{


    public function downloadMarksheet($id)
{
    $test = PlacementTest::with('results.student.user')->findOrFail($id);
    $spreadsheet = new Spreadsheet();
    $sheet = $spreadsheet->getActiveSheet();

    // Header info
    $sheet->setCellValue('A1', 'Placement Test ID: ' . $test->id);
    $sheet->setCellValue('A2', 'Title: ' . $test->title);
    $sheet->setCellValue('A3', 'Status: ' . $test->status);
    $sheet->setCellValue('A4', 'Export Date: ' . now()->toDateString());

    // Table headings
    $sheet->fromArray([
        ['Student ID', 'Name', 'Email',
        'Target Country', 'Target Score',
         'Writing', 'W Comment',
         'Speaking', 'S Comment',
         'Listening', 'L Comment',
         'Reading', 'R Comment',
         'Final Score', 'Final Comment']
    ], NULL, 'A6');

    // Fill student data with formula for Final Score
    $row = 7;
    foreach ($test->results as $result) {
    $sheet->setCellValue("A{$row}", $result->student->id);
    $sheet->setCellValue("B{$row}", $result->student->user->name);
    $sheet->setCellValue("C{$row}", $result->student->user->email);

    // Target Country & Score
    $sheet->setCellValue("D{$row}", $result->student->target_country ?? '');
    $sheet->setCellValue("E{$row}", $result->student->target_score ?? '');

    // Writing
    $sheet->setCellValue("F{$row}", '');
    $sheet->setCellValue("G{$row}", '');

    // Speaking
    $sheet->setCellValue("H{$row}", '');
    $sheet->setCellValue("I{$row}", '');

    // Listening
    $sheet->setCellValue("J{$row}", '');
    $sheet->setCellValue("K{$row}", '');

    // Reading
    $sheet->setCellValue("L{$row}", '');
    $sheet->setCellValue("M{$row}", '');

    // Final Score (Excel formula)
    $sheet->setCellValue("N{$row}", "=ROUND(AVERAGE(F{$row},H{$row},J{$row},L{$row}), 2)");

    // Final Comment
    $sheet->setCellValue("O{$row}", '');

    $row++;
}

    // Export file
    $writer = new Xlsx($spreadsheet);
    $filename = "placement_test_{$id}_marksheet.xlsx";

    return response()->streamDownload(function () use ($writer) {
        $writer->save('php://output');
    }, $filename);
}


    public function uploadMarksheet(Request $request, $id)
{
    $request->validate(['file' => 'required|mimes:xlsx,xls']);
    $sheet = IOFactory::load($request->file('file'))->getActiveSheet();
    $rows = $sheet->toArray();

    $test = PlacementTest::with('results.student.user')->findOrFail($id); // Load test with results and student info

    for ($i = 6; $i < count($rows); $i++) {
        $data = $rows[$i];
        if (empty($data[0])) continue;


        // Skip if final score is not numeric (e.g., #DIV/0!, N/A, "")
$finalScore = is_numeric($data[11]) ? $data[11] : null;

PlacementTestResult::where([
            ['placement_test_id', $id],
            ['student_id', $data[0]],
        ])->update([
            'writing_score'     => is_numeric($data[5])  ? $data[5]  : null,
            'writing_comment'   => $data[6]  ?? null,
            'speaking_score'    => is_numeric($data[7])  ? $data[7]  : null,
            'speaking_comment'  => $data[8]  ?? null,
            'listening_score'   => is_numeric($data[9])  ? $data[9]  : null,
            'listening_comment' => $data[10] ?? null,
            'reading_score'     => is_numeric($data[11]) ? $data[11] : null,
            'reading_comment'   => $data[12] ?? null,
            'final_score'       => $finalScore,
            'final_comment'     => $data[14] ?? null,
        ]);

        // Update status
        $student = Student::with('user')->find($data[0]);
        // if ($student) {
        //     $student->update(['student_status' => 'placement_completed']);

        //     // Send result notification email
        //     $student->notify(new PlacementTestResultsReleased($test->title));
        // }
        if ($student && is_numeric($finalScore)) {
    $student->update(['student_status' => 'placement_completed']);
    $student->notify(new PlacementTestResultsReleased($test->title));
}

    }

    // Update test status
    $test->update(['status' => 'completed']);

    return back()->with('success', 'Results uploaded, saved, and notifications sent.');
}

public function show($id)
    {
        $test = PlacementTest::with('results.student.user')->findOrFail($id);

        return Inertia::render('Admin/PlacementTests/Show', [
            'test' => $test,
        ]);
    }

public function index()
    {
        $scheduled = PlacementTest::withCount('results')->where('status', 'scheduled')->orderByDesc('created_at')->get();
        $pending = PlacementTest::withCount('results')->where('status', 'pending')->orderByDesc('created_at')->get();
        $completed = PlacementTest::withCount('results')->where('status', 'completed')->orderByDesc('created_at')->get();

        return Inertia::render('Admin/PlacementTests/Index', [
            'scheduled' => $scheduled,
            'pending' => $pending,
            'completed' => $completed,
        ]);
    }

    public function markPending($id)
{
    $test = PlacementTest::findOrFail($id);
    $test->status = 'pending'; // or 'Pending' if you use capitalized enums
    $test->save();

    return redirect()->back()->with('success', 'Placement test status updated to pending.');
}


  


}
