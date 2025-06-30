<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
   public function up(): void
{
    Schema::create('payments', function (Blueprint $table) {
        $table->id();
        $table->foreignId('student_id')->constrained()->onDelete('cascade');
        $table->enum('type', ['registration', 'course']);
        $table->decimal('amount', 10, 2);
        $table->enum('method', ['Bank Payment', 'Online Transfer', 'Handover']);
        $table->string('receipt')->nullable();
        $table->boolean('verified')->default(false);
        $table->timestamp('verified_at')->nullable();
        $table->foreignId('verified_by')->nullable()->constrained('users')->nullOnDelete();
        $table->timestamps();
    });
}


    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('payments');
    }
};
