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
        $table->boolean('rejected')->default(false);
        $table->text('rejection_reason')->nullable();
        $table->timestamp('rejected_at')->nullable();
    });
}

public function down(): void
{
    Schema::table('payments', function (Blueprint $table) {
        $table->dropColumn(['rejected', 'rejection_reason', 'rejected_at']);
    });
}
};
