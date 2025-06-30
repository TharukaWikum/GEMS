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

        $table->unsignedBigInteger('rejected_by')->nullable();

        // Optional: Add foreign key to users table if needed
        // $table->foreign('rejected_by')->references('id')->on('users')->onDelete('set null');
    });
}

public function down(): void
{
    Schema::table('payments', function (Blueprint $table) {
        $table->dropColumn([ 'rejected_by']);
    });
}

};
