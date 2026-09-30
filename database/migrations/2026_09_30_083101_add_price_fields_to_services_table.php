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
        Schema::table('services', function (Blueprint $table) {
            // Dedicated price display string – e.g. "₹ 8,00,000"
            $table->string('price')->nullable()->after('sort_order');

            // Unit of sale – e.g. "Unit", "Piece", "Set", "Kg"
            $table->string('price_unit')->nullable()->after('price');

            // Minimum order quantity – e.g. "1 Piece", "5 Units"
            $table->string('min_order_qty')->nullable()->after('price_unit');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('services', function (Blueprint $table) {
            $table->dropColumn(['price', 'price_unit', 'min_order_qty']);
        });
    }
};
