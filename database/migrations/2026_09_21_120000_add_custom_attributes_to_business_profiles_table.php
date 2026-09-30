<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        if (!Schema::hasColumn('business_profiles', 'custom_attributes')) {
            Schema::table('business_profiles', function (Blueprint $table) {
                // Stores arbitrary key-value settings such as header button
                // labels and URLs (header_btn_primary_label, header_btn_primary_url,
                // header_btn_secondary_label, header_btn_secondary_url).
                $table->json('custom_attributes')->nullable()->after('robots_txt');
            });
        }
    }

    public function down(): void
    {
        Schema::table('business_profiles', function (Blueprint $table) {
            $table->dropColumn('custom_attributes');
        });
    }
};
