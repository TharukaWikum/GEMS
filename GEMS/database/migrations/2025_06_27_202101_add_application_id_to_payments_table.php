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
    Schema::table('payments', function (Blueprint $table) {
        $table->unsignedBigInteger('application_id')->nullable()->after('student_id');

        // Optional: Add foreign key constraint
        $table->foreign('application_id')->references('id')->on('student_course_applications')->onDelete('cascade');
    });
}

public function down(): void
{
    Schema::table('payments', function (Blueprint $table) {
        $table->dropForeign(['application_id']);
        $table->dropColumn('application_id');
    });
}

};
