<?php

// use Illuminate\Database\Migrations\Migration;
// use Illuminate\Database\Schema\Blueprint;
// use Illuminate\Support\Facades\Schema;

// return new class extends Migration
// {
//     /**
//      * Run the migrations.
//      */
//     public function up(): void
//     {
//         Schema::create('students', function (Blueprint $table) {
//             $table->id();
//             $table->timestamps();
//         });
//     }

//     /**
//      * Reverse the migrations.
//      */
//     public function down(): void
//     {
//         Schema::dropIfExists('students');
//     }
// };

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up()
    {
        Schema::create('students', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->date('dob');
            $table->enum('gender', ['male', 'female']);
            $table->string('nationality');
            // $table->string('nic')->unique();
            $table->string('passport_no')->nullable();
            $table->string('profession')->nullable();
            $table->string('workplace_address')->nullable();
            $table->enum('preferred_course', ['IELTS Academic', 'IELTS General']);
            $table->string('targeted_country')->nullable();
            $table->decimal('targeted_score', 4, 2)->nullable();
            $table->enum('payment_method', ['Bank Payment', 'Online Transfer', 'Handover']);
            $table->string('payment_receipt');
            $table->enum('student_status', ['prospect', 'registered', 'enrolled_active', 'enrolled_hold', 'blocked', 'completed'])->default('prospect');
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('students');
    }
};

