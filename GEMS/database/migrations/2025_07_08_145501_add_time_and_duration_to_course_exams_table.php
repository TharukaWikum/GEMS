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
        Schema::table('course_exams', function (Blueprint $table) {
            $table->time('start_time')->nullable()->after('exam_date');
            $table->integer('duration_minutes')->nullable()->after('start_time'); // in minutes
        });
    }

    public function down(): void {
        Schema::table('course_exams', function (Blueprint $table) {
            $table->dropColumn(['start_time', 'duration_minutes']);
        });
    }
};
