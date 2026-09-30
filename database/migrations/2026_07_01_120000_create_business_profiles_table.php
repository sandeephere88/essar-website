<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        if (!Schema::hasTable('business_profiles')) {
            Schema::create('business_profiles', function (Blueprint $table) {
                $table->id();
                $table->string('name');
                $table->string('tagline')->nullable();
                $table->string('logo')->nullable();          // relative path in storage
                $table->text('address')->nullable();
                $table->json('phone_numbers')->nullable();   // e.g. [{"label":"Main","number":"..."}]
                $table->json('emergency_numbers')->nullable();
                $table->string('email')->nullable();
                $table->json('social_links')->nullable();    // {facebook, instagram, twitter, youtube, linkedin}
                $table->json('working_hours')->nullable();   // {monday:{open,close}, ...}
                $table->text('map_embed_url')->nullable();
                $table->timestamps();
            });
        }
    }

    public function down(): void
    {
        Schema::dropIfExists('business_profiles');
    }
};
