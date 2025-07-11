<?php
namespace App\Http\Controllers;

use App\Models\CourseMaterial;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class CourseMaterialController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'course_id' => 'required|exists:courses,id',
            'title' => 'required|string|max:255',
            'file' => 'required|file|max:10240',
        ]);

        $file = $request->file('file');
        // $path = $file->store('materials', 'public');
        $path = $file->storeAs('materials', $file->getClientOriginalName(), 'public');
        $type = $file->getClientOriginalExtension();

        CourseMaterial::create([
            'course_id' => $request->course_id,
            'title' => $request->title,
            'file_path' => $path,
            'type' => $type,
            'uploaded_by' => Auth::id(),
        ]);

        return back()->with('success', 'Material uploaded successfully.');
    }

    // public function index($courseId)
    // {
    //     $user = Auth::user();

    //     if ($user->isStudent()) {
    //         $isEnrolled = $user->student->courses()->where('course_id', $courseId)->exists();
    //         abort_unless($isEnrolled, 403);
    //     }

    //     $materials = CourseMaterial::where('course_id', $courseId)->get();
    //     return response()->json($materials);
    // }
    public function index($courseId)
{
    $user = Auth::user();

    if ($user->isStudent()) {
        $isEnrolled = $user->student->courses()->where('course_id', $courseId)->exists();
        abort_unless($isEnrolled, 403);
    }

    // ✅ Allow admin and teacher by default
    if ($user->isAdmin() || $user->isTeacher()) {
        // optionally, you could check if the teacher is assigned to the course
        // but if you allow all admins/teachers to view materials, no check is needed
    }

    $materials = CourseMaterial::where('course_id', $courseId)->get();
    return response()->json($materials);
}

}
