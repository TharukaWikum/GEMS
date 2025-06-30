<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('placement_test_results', function (Blueprint $table) {
            $table->id();
            $table->foreignId('placement_test_id')->constrained()->onDelete('cascade');
            $table->foreignId('student_id')->constrained()->onDelete('cascade');

            $table->decimal('writing_score', 5, 2)->nullable();
            $table->text('writing_comment')->nullable();

            $table->decimal('speaking_score', 5, 2)->nullable();
            $table->text('speaking_comment')->nullable();

            $table->decimal('listening_score', 5, 2)->nullable();
            $table->text('listening_comment')->nullable();

            $table->decimal('reading_score', 5, 2)->nullable();
            $table->text('reading_comment')->nullable();

            $table->decimal('final_score', 5, 2)->nullable();
            $table->text('final_comment')->nullable();

            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('placement_test_results');
    }
};
