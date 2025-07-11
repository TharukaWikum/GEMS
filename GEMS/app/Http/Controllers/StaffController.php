<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Staff;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB;

class StaffController extends Controller
{
    public function index()
    {
        $staffList = User::whereIn('role', ['admin', 'teacher', 'frontdesk'])
            ->join('staff', 'users.id', '=', 'staff.user_id')
            ->select(
                'users.id',
                'users.name',
                'users.email',
                'users.role',
                'users.status',
                'staff.address',
                'staff.nic',
                'staff.contact_no',
                'staff.description'
            )
            ->get();
    
        return Inertia::render('Users/Staff/Index', [
            'staffList' => $staffList,
            'auth' => [
                'user' => auth()->user(),
            ],
        ]);
    }


    public function updateStatus(Request $request, $id)
{
    $request->validate([
        'status' => 'required|in:active,inactive,blocked',
    ]);

    $user = User::where('id', $id)->firstOrFail();
    $user->status = $request->status;
    $user->save();

    return back()->with('success', 'Staff status updated successfully.');
}
    

    // Add other methods later like show, store, update, destroy if needed
}
