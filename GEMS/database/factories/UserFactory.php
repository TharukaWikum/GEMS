<?php

namespace Database\Factories;

use App\Models\User;
use App\Models\Student;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class UserFactory extends Factory
{
    public function definition(): array
    {
        return [
            'name' => fake()->name(),
            'email' => fake()->unique()->safeEmail(),
            'email_verified_at' => now(),
            'password' => Hash::make('password'),
            'role' => 'student',
            'status' => 'active',
            'remember_token' => Str::random(10),
        ];
    }

    public function asStudent(): static
    {
        return $this->state(['role' => 'student'])->afterCreating(function (User $user) {
            Student::create([
                'user_id' => $user->id,
                'dob' => fake()->date(),
                'gender' => fake()->randomElement(['male', 'female']),
                'nationality' => fake()->country(),
                'nic' => fake()->unique()->numerify('#########V'),
                'preferred_course' => fake()->randomElement(['IELTS Academic', 'IELTS General']),
                'payment_method' => fake()->randomElement(['Bank Payment', 'Online Transfer', 'Handover']),
                'payment_receipt' => 'payments/' . Str::random(10) . '.jpg',
                'student_status' => 'prospect',
            ]);
        });
    }
}


// namespace Database\Factories;

// use Illuminate\Database\Eloquent\Factories\Factory;
// use Illuminate\Support\Facades\Hash;
// use Illuminate\Support\Str;

// /**
//  * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\User>
//  */
// class UserFactory extends Factory
// {
//     /**
//      * The current password being used by the factory.
//      */
//     protected static ?string $password;

//     /**
//      * Define the model's default state.
//      *
//      * @return array<string, mixed>
//      */
//     public function definition(): array
//     {
//         return [
//             'name' => fake()->name(),
//             'email' => fake()->unique()->safeEmail(),
//             'email_verified_at' => now(),
//             'password' => static::$password ??= Hash::make('password'),
//             'remember_token' => Str::random(10),
//         ];
//     }

//     /**
//      * Indicate that the model's email address should be unverified.
//      */
//     public function unverified(): static
//     {
//         return $this->state(fn (array $attributes) => [
//             'email_verified_at' => null,
//         ]);
//     }
// }
