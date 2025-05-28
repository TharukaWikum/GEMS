<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\Staff;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class StaffRegisterController extends Controller
{
    public function create()
    {
        return Inertia::render('Users/Teachers/Pages/StaffForm');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string',
            'email' => 'required|email|unique:users',
            'role' => 'required|in:admin,teacher,frontdesk',
            'address' => 'required|string',
            // 'nic' => 'required|string|unique:staff',
            'contact_no' => 'required|string',
            'description' => 'nullable|string',
        ]);

        DB::beginTransaction();

        try {
            $user = User::create([
                'name' => $validated['name'],
                'email' => $validated['email'],
                'password' => Hash::make('12345678'), // default password
                'role' => $validated['role'], 
                'status' => 'active',
            ]);

            Staff::create([
                'user_id' => $user->id,
                'address' => $validated['address'],
                // 'nic' => $validated['nic'],
                'contact_no' => $validated['contact_no'],
                'description' => $validated['description'] ?? '',
            ]);

            DB::commit();

            return redirect()->route('staff.index')->with('success', 'Staff added successfully!');
        } catch (\Exception $e) {
            DB::rollBack();
            return back()->withErrors(['error' => 'Failed to add staff.']);
        }
    }
}
