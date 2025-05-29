<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void {
        Schema::create('courses', function (Blueprint $table) {
            // $table->id();
            // $table->string('name');
            // $table->text('description')->nullable();
            // $table->decimal('course_fee', 10, 2);
            // $table->string('duration');
            // $table->foreignId('conductor_id')->constrained('staff')->onDelete('cascade'); // reference to staff
            // $table->enum('status', ['Active', 'Inactive', 'Completed', 'Cancelled'])->default('Inactive');
            // $table->enum('type', ['General Course', 'Academic Course'])->default('General Course')->after('status');
            // $table->timestamps();

             $table->id();
            $table->string('name');
            $table->text('description')->nullable();
            $table->decimal('course_fee', 10, 2);
            $table->string('duration');
            $table->foreignId('conductor_id')->constrained('staff')->onDelete('cascade');
            $table->enum('status', ['Active', 'Inactive', 'Completed', 'Cancelled'])->default('Inactive');
            $table->enum('type', ['General Course', 'Academic Course'])->default('General Course'); // ❌ Removed ->after()
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('courses');
    }
};
