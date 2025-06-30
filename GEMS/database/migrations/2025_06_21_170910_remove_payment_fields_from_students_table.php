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
        $table->dropColumn(['payment_method', 'payment_receipt']);
    });
}

public function down(): void
{
    Schema::table('students', function (Blueprint $table) {
        $table->enum('payment_method', ['Bank Payment', 'Online Transfer', 'Handover']);
        $table->string('payment_receipt')->nullable();
    });
}

};
