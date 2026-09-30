<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    public function up(): void
    {
        // 1. Business Profiles
        if (!Schema::hasTable('business_profiles')) {
            Schema::create('business_profiles', function (Blueprint $table) {
                $table->id();
                $table->string('name');
                $table->string('tagline')->nullable();
                $table->string('logo')->nullable();
                $table->text('address')->nullable();
                $table->json('phone_numbers')->nullable();
                $table->json('emergency_numbers')->nullable();
                $table->string('email')->nullable();
                $table->json('social_links')->nullable();
                $table->json('working_hours')->nullable();
                $table->text('map_embed_url')->nullable();
                $table->text('robots_txt')->nullable();
                $table->json('custom_attributes')->nullable();
                $table->timestamps();
            });


        }

        // 2. Categories (Generalizing Departments)
        if (!Schema::hasTable('categories')) {
            Schema::create('categories', function (Blueprint $table) {
                $table->id();
                $table->string('name');
                $table->string('slug')->unique();
                $table->string('icon')->nullable();
                $table->string('image')->nullable();
                $table->text('description')->nullable();
                $table->foreignId('parent_id')->nullable()->constrained('categories')->nullOnDelete();
                $table->boolean('is_active')->default(true);
                $table->integer('sort_order')->default(0);
                $table->json('custom_attributes')->nullable();
                $table->timestamps();
            });

            // Migrate departments if exist
            if (Schema::hasTable('departments')) {
                $depts = DB::table('departments')->get();
                foreach ($depts as $d) {
                    DB::table('categories')->insert([
                        'id' => $d->id,
                        'name' => $d->name,
                        'slug' => $d->slug,
                        'icon' => $d->icon ?? null,
                        'image' => $d->image ?? null,
                        'description' => $d->description ?? null,
                        'is_active' => $d->is_active ?? true,
                        'sort_order' => $d->sort_order ?? 0,
                        'created_at' => $d->created_at ?? now(),
                        'updated_at' => $d->updated_at ?? now(),
                    ]);
                }
            }
        }

        // 3. Services (Domain offerings with block builder)
        if (!Schema::hasTable('services')) {
            Schema::create('services', function (Blueprint $table) {
                $table->id();
                $table->foreignId('category_id')->nullable()->constrained('categories')->nullOnDelete();
                $table->string('title');
                $table->string('slug')->unique();
                $table->text('short_description')->nullable();
                $table->longText('content')->nullable();
                $table->string('image')->nullable();
                $table->json('gallery')->nullable();
                $table->json('features')->nullable();
                $table->json('specifications')->nullable();
                $table->json('pricing')->nullable();
                $table->json('blocks')->nullable(); // Filament Content Block Builder
                $table->boolean('is_active')->default(true);
                $table->boolean('is_featured')->default(false);
                $table->integer('sort_order')->default(0);
                $table->json('custom_attributes')->nullable();
                $table->timestamps();
            });
        }

        // 4. Team Members (Generalizing Doctors)
        if (!Schema::hasTable('team_members')) {
            Schema::create('team_members', function (Blueprint $table) {
                $table->id();
                $table->foreignId('category_id')->nullable()->constrained('categories')->nullOnDelete();
                $table->string('name');
                $table->string('slug')->unique();
                $table->string('designation')->nullable();
                $table->string('qualification')->nullable();
                $table->integer('experience_years')->default(0);
                $table->string('image')->nullable();
                $table->text('bio')->nullable();
                $table->json('contact_info')->nullable();
                $table->json('qualifications_list')->nullable();
                $table->boolean('is_active')->default(true);
                $table->integer('sort_order')->default(0);
                $table->json('custom_attributes')->nullable();
                $table->timestamps();
            });

            // Migrate doctors if exist
            if (Schema::hasTable('doctors')) {
                $doctors = DB::table('doctors')->get();
                foreach ($doctors as $doc) {
                    DB::table('team_members')->insert([
                        'id' => $doc->id,
                        'category_id' => $doc->department_id ?? null,
                        'name' => $doc->name,
                        'slug' => $doc->slug,
                        'designation' => $doc->designation ?? null,
                        'qualification' => $doc->specialization ?? null,
                        'experience_years' => $doc->experience_years ?? 0,
                        'image' => $doc->image ?? null,
                        'bio' => $doc->bio ?? null,
                        'is_active' => $doc->is_active ?? true,
                        'sort_order' => $doc->sort_order ?? 0,
                        'created_at' => $doc->created_at ?? now(),
                        'updated_at' => $doc->updated_at ?? now(),
                    ]);
                }
            }
        }
    }

    public function down(): void
    {
        Schema::dropIfExists('team_members');
        Schema::dropIfExists('services');
        Schema::dropIfExists('categories');
        Schema::dropIfExists('business_profiles');
    }
};
