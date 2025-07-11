<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('students', function (Blueprint $table) {
            // You may need to use raw SQL here as enum alteration isn't directly supported in all DBs
            DB::statement("ALTER TABLE students MODIFY student_status ENUM('prospect', 'registered', 'placement_scheduled', 'placement_completed', 'course_assigned', 'course_completed') NOT NULL");
        });
    }

    public function down(): void
{
    // Update all unknown statuses to a safe value before shrinking ENUM
    DB::table('students')
        ->whereNotIn('student_status', ['prospect', 'registered'])
        ->update(['student_status' => 'prospect']);

    DB::statement("ALTER TABLE students MODIFY student_status ENUM('prospect', 'registered') NOT NULL");
}
};
