<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\CourseExam;
use App\Models\ExamStudent;
use App\Models\Staff;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use PhpOffice\PhpSpreadsheet\Spreadsheet;
use PhpOffice\PhpSpreadsheet\Writer\Xlsx;
use PhpOffice\PhpSpreadsheet\IOFactory;
use Illuminate\Support\Facades\Notification;
use App\Notifications\CourseExamResultsReleased;


class CourseExamController extends Controller
{
    public function show($id)
{
    $exam = \App\Models\CourseExam::with(['course', 'scheduledBy.user', 'students.user'])->findOrFail($id);

    return Inertia::render('Admin/CourseExams/Index', [
        'exam' => [
            'id' => $exam->id,
            'title' => $exam->title,
            'description' => $exam->description,
            'exam_date' => $exam->exam_date,
            'start_time' => $exam->start_time,
            'duration_minutes' => $exam->duration_minutes,
            'status' => $exam->status,
            'scheduled_by' => $exam->scheduledBy?->user?->name ?? 'N/A',
            'course_name' => $exam->course?->name,
            // 'students' => $exam->students->map(fn($s) => [
            //     'id' => $s->id,
            //     'name' => $s->user->name,
            //     'email' => $s->user->email,
            //     'status' => $s->pivot->status ?? '',
            // ]),
            'students' => $exam->students->map(fn($s) => [
    'id' => $s->id,
    'name' => $s->user->name,
    'email' => $s->user->email,
    'status' => $s->pivot->status ?? '',
    'writing_score' => $s->pivot->writing_score,
    'writing_comment' => $s->pivot->writing_comment,
    'speaking_score' => $s->pivot->speaking_score,
    'speaking_comment' => $s->pivot->speaking_comment,
    'listening_score' => $s->pivot->listening_score,
    'listening_comment' => $s->pivot->listening_comment,
    'reading_score' => $s->pivot->reading_score,
    'reading_comment' => $s->pivot->reading_comment,
    'final_score' => $s->pivot->final_score,
    'final_comment' => $s->pivot->final_comment,
]),

        ],
        'auth' => ['user' => auth()->user()],
    ]);
}

    public function store(Request $request)
    {
        $validated = $request->validate([
            'course_id' => 'required|exists:courses,id',
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'exam_date' => 'required|date|after_or_equal:today',
            'start_time' => 'required|date_format:H:i',
            'duration_minutes' => 'required|integer|min:1',
            'student_ids' => 'required|array|min:1',
            'student_ids.*' => 'exists:students,id',
        ]);

         $staff = Staff::where('user_id', Auth::id())->first();
    if (!$staff) {
        return redirect()->back()->withErrors(['You are not authorized to schedule this exam.']);
    }

        $exam = CourseExam::create([
            'course_id' => $validated['course_id'],
            'title' => $validated['title'],
            'description' => $validated['description'],
            'exam_date' => $validated['exam_date'],
            'start_time' => $validated['start_time'],
            'duration_minutes' => $validated['duration_minutes'],
            'status' => 'scheduled',
            // 'scheduled_by' => Auth::id(),
            'scheduled_by' => $staff->id,

        ]);

        $exam->students()->attach(
            collect($validated['student_ids'])->mapWithKeys(fn($id) => [$id => [
                'writing_score' => null,
                'writing_comment' => null,
                'speaking_score' => null,
                'speaking_comment' => null,
                'listening_score' => null,
                'listening_comment' => null,
                'reading_score' => null,
                'reading_comment' => null,
                'final_score' => null,
                'final_comment' => null,
            ]])->toArray()
        );

        return redirect()->back()->with('success', 'Course exam scheduled.');
    }

    public function update(Request $request, CourseExam $exam)
    {
        $validated = $request->validate([
            'course_id' => 'required|exists:courses,id',
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'exam_date' => 'required|date',
            'start_time' => 'required|date_format:H:i',
            'duration_minutes' => 'required|integer|min:1',
            'status' => 'required|in:scheduled,conducted,completed,rescheduled,cancelled',
            'student_ids' => 'required|array|min:1',
            'student_ids.*' => 'exists:students,id',
        ]);

        $exam->update([
            'course_id' => $validated['course_id'],
            'title' => $validated['title'],
            'description' => $validated['description'],
            'exam_date' => $validated['exam_date'],
            'start_time' => $validated['start_time'],
            'duration_minutes' => $validated['duration_minutes'],
            'status' => $validated['status'],
        ]);

        $exam->students()->sync(
            collect($validated['student_ids'])->mapWithKeys(fn($id) => [$id => [
                'writing_score' => null,
                'writing_comment' => null,
                'speaking_score' => null,
                'speaking_comment' => null,
                'listening_score' => null,
                'listening_comment' => null,
                'reading_score' => null,
                'reading_comment' => null,
                'final_score' => null,
                'final_comment' => null,
            ]])->toArray()
        );

        return redirect()->back()->with('success', 'Course exam updated.');
    }


public function downloadMarksheet($id)
{
    $exam = CourseExam::with('students.user')->findOrFail($id);
    $spreadsheet = new Spreadsheet();
    $sheet = $spreadsheet->getActiveSheet();

    $sheet->setCellValue('A1', 'Course Exam ID: ' . $exam->id);
    $sheet->setCellValue('A2', 'Title: ' . $exam->title);
    $sheet->setCellValue('A3', 'Status: ' . $exam->status);
    $sheet->setCellValue('A4', 'Export Date: ' . now()->toDateString());

    $sheet->fromArray([
        ['Student ID', 'Name', 'Email',
         'Writing', 'W Comment',
         'Speaking', 'S Comment',
         'Listening', 'L Comment',
         'Reading', 'R Comment',
         'Final Score', 'Final Comment']
    ], NULL, 'A6');

    $row = 7;
    foreach ($exam->students as $student) {
        $sheet->setCellValue("A{$row}", $student->id);
        $sheet->setCellValue("B{$row}", $student->user->name);
        $sheet->setCellValue("C{$row}", $student->user->email);

        $sheet->setCellValue("D{$row}", '');
        $sheet->setCellValue("E{$row}", '');
        $sheet->setCellValue("F{$row}", '');
        $sheet->setCellValue("G{$row}", '');
        $sheet->setCellValue("H{$row}", '');
        $sheet->setCellValue("I{$row}", '');
        $sheet->setCellValue("J{$row}", '');
        $sheet->setCellValue("K{$row}", '');
        $sheet->setCellValue("L{$row}", "=ROUND(AVERAGE(D{$row},F{$row},H{$row},J{$row}), 2)");
        $sheet->setCellValue("M{$row}", '');
        $row++;
    }

    $writer = new Xlsx($spreadsheet);
    $filename = "course_exam_{$id}_marksheet.xlsx";

    return response()->streamDownload(function () use ($writer) {
        $writer->save('php://output');
    }, $filename);
}

public function uploadMarksheet(Request $request, $id)
{
    $request->validate(['file' => 'required|mimes:xlsx,xls']);
    $sheet = IOFactory::load($request->file('file'))->getActiveSheet();
    $rows = $sheet->toArray();

    $exam = CourseExam::with('students.user')->findOrFail($id);

    for ($i = 6; $i < count($rows); $i++) {
        $data = $rows[$i];
        if (empty($data[0])) continue;

        $finalScore = is_numeric($data[10]) ? $data[10] : null;

        ExamStudent::updateOrCreate([
    'course_exam_id' => $id,
    'student_id' => $data[0],
], [
    'writing_score' => is_numeric($data[3]) ? $data[3] : null,
    'writing_comment' => $data[4] ?? null,

    'speaking_score' => is_numeric($data[5]) ? $data[5] : null,
    'speaking_comment' => $data[6] ?? null,

    'listening_score' => is_numeric($data[7]) ? $data[7] : null,
    'listening_comment' => $data[8] ?? null,

    'reading_score' => is_numeric($data[9]) ? $data[9] : null,
    'reading_comment' => $data[10] ?? null,

    'final_score' => is_numeric($data[11]) ? $data[11] : null,
    'final_comment' => $data[12] ?? null,
]);


        if ($student = \App\Models\Student::with('user')->find($data[0])) {
            $student->notify(new CourseExamResultsReleased($exam->title));
        }
    }

    $exam->update(['status' => 'completed']);

    return back()->with('success', 'Course exam results uploaded successfully.');
}

    public function destroy(CourseExam $exam)
    {
        $exam->delete();
        return redirect()->back()->with('success', 'Course exam deleted.');
    }
}

