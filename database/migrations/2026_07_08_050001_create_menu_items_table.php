<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('menu_items', function (Blueprint $table) {
            $table->id();
            $table->foreignId('menu_id')->constrained()->cascadeOnDelete();
            $table->foreignId('parent_id')->nullable()->constrained('menu_items')->cascadeOnDelete();
            $table->string('title');
            $table->string('navigation_label')->nullable();
            $table->string('item_type'); 
            $table->string('url')->nullable();
            $table->string('route')->nullable();
            $table->foreignId('page_id')->nullable()->constrained('pages')->nullOnDelete();
            $table->unsignedBigInteger('category_id')->nullable(); 
            $table->integer('sort_order')->default(0);
            $table->string('target')->default('_self');
            $table->string('rel')->nullable();
            $table->string('css_classes')->nullable();
            $table->string('icon')->nullable();
            $table->string('visibility')->default('everyone'); 
            $table->boolean('status')->default(true);
            $table->text('description')->nullable();
            $table->string('tooltip')->nullable();
            $table->boolean('mega_menu_enabled')->default(false);
            $table->json('metadata')->nullable();
            $table->softDeletes();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('menu_items');
    }
};
