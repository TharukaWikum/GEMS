<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up()
    {
        Schema::create('student_course_applications', function (Blueprint $table) {
            $table->id();
            $table->foreignId('student_id')->constrained('students')->onDelete('cascade');
            $table->foreignId('course_id')->constrained('courses')->onDelete('cascade');

            $table->enum('payment_type', ['full', 'installment']);
            $table->decimal('full_amount', 10, 2);
            $table->decimal('amount_paid', 10, 2)->default(0.00);
            $table->date('next_payment_due_date')->nullable();

            $table->enum('status', ['pending', 'registered', 'cancelled', 'completed'])->default('pending');
            $table->timestamp('last_payment_verified_at')->nullable();
            $table->text('admin_note')->nullable();
            $table->timestamp('applied_at')->nullable();

            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('student_course_applications');
    }
};
