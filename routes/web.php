<?php

use App\Http\Controllers\DepartmentController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\DoctorController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\PageController;
use App\Http\Controllers\PolicyController;
use App\Http\Controllers\SitemapController;
use App\Http\Controllers\RobotsController;
use App\Http\Controllers\BlogController;
use App\Http\Controllers\GalleryController;
use App\Http\Controllers\SearchController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/* ── Public ───────────────────────────────────────────────── */

Route::get('/', [HomeController::class, 'index'])->name('home');
Route::get('/search', [SearchController::class, 'index'])->name('search');
Route::get('/about', [PageController::class, 'about'])->name('about');
Route::get('/contact', [PageController::class, 'contact'])->name('contact');
Route::post('/contact', [PageController::class, 'submitContact'])->name('contact.submit');

Route::get('/sitemap.xml', [SitemapController::class, 'index'])->name('sitemap');
Route::get('/robots.txt', [RobotsController::class, 'index'])->name('robots');

// Blogs
Route::get('/blog', [BlogController::class, 'index'])->name('blog.index');
Route::get('/blog/{blog:slug}', [BlogController::class, 'show'])->name('blog.show');

// Gallery
Route::get('/gallery', [GalleryController::class, 'index'])->name('gallery.index');

// Policies
Route::get('/policies', [PolicyController::class, 'index'])->name('policies.index');
Route::get('/policies/{policy}/view', [PolicyController::class, 'show'])->name('policies.show');
Route::get('/policies/{policy}/download', [PolicyController::class, 'download'])->name('policies.download');

// Services / Products
Route::get('/services', [\App\Http\Controllers\ServiceController::class, 'index'])->name('services.index');
Route::get('/services/{slug}', [\App\Http\Controllers\ServiceController::class, 'show'])->name('services.show');
Route::post('/products/inquiry', [\App\Http\Controllers\ProductInquiryController::class, 'store'])->name('products.inquiry.general');
Route::post('/products/{slug}/inquiry', [\App\Http\Controllers\ProductInquiryController::class, 'store'])->name('products.inquiry');

// Team Members
Route::get('/team', [\App\Http\Controllers\TeamController::class, 'index'])->name('team.index');
Route::get('/team/{slug}', [\App\Http\Controllers\TeamController::class, 'show'])->name('team.show');

// Categories
Route::get('/categories', [\App\Http\Controllers\CategoryController::class, 'index'])->name('categories.index');
Route::get('/categories/{slug}', [\App\Http\Controllers\CategoryController::class, 'show'])->name('categories.show');

// Backward-compatible Departments & Doctors routes
Route::get('/departments', [DepartmentController::class, 'index'])->name('departments.index');
Route::get('/departments/{department:slug}', [DepartmentController::class, 'show'])->name('departments.show');
Route::get('/doctors', [DoctorController::class, 'index'])->name('doctors.index');
Route::get('/doctors/{doctor:slug}', [DoctorController::class, 'show'])->name('doctors.show');

/* ── Authenticated ────────────────────────────────────────── */

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';

// Dynamic CMS pages catch-all
Route::get('/{slug}', [PageController::class, 'show'])->name('pages.show');
