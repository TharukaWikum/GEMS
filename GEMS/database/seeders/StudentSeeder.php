<?php

// namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
// use Illuminate\Database\Seeder;

// class StudentSeeder extends Seeder
// {
//     /**
//      * Run the database seeds.
//      */
//     public function run(): void
//     {
//         //
//     }
// }


namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\Student;
use Illuminate\Support\Facades\Hash;

class StudentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Create a test student user
        $studentUser = User::factory()->create([
            'name' => 'Test Student',
            'email' => 'student@example.com',
            'password' => Hash::make('password'),
            'role' => 'student',
            'status' => 'active',
        ]);

        // Create corresponding student details
        Student::create([
            'user_id' => $studentUser->id,
            'dob' => '2000-01-01',
            'gender' => 'male',
            'nationality' => 'Sri Lankan',
            'nic' => '123456789V',
            'preferred_course' => 'IELTS Academic',
            'payment_method' => 'Bank Payment',
            'payment_receipt' => 'payments/test.pdf',
            'student_status' => 'prospect',
        ]);

        // Generate 10 random students
        User::factory(10)->asStudent()->create();
    }
}

