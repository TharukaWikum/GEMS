<?php

namespace Database\Factories;

use App\Models\Student;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends Factory<Student>
 */
class StudentFactory extends Factory
{
    protected $model = Student::class;

    public function definition(): array
    {
        return [
            'user_id' => User::factory(),
            'dob' => fake()->date(),
            'gender' => fake()->randomElement(['male', 'female']),
            'nationality' => fake()->country(),
            'nic' => fake()->unique()->numerify('#########V'),
            'identification_document' => 'documents/' . Str::random(10) . '.pdf',
            'preferred_course' => fake()->randomElement(['IELTS Academic', 'IELTS General']),
            'payment_method' => fake()->randomElement(['Bank Payment', 'Online Transfer', 'Handover']),
            'payment_receipt' => 'receipts/' . Str::random(10) . '.jpg',
            'student_status' => 'prospect',
        ];
    }
}
