<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::prefix('admin')->middleware(['web', 'auth'])->group(function () {
    Route::get('/menus/{menu}/builder', [\App\Http\Controllers\Api\MenuApiController::class, 'getBuilderData']);
    Route::post('/menus/{menu}/builder', [\App\Http\Controllers\Api\MenuApiController::class, 'saveBuilderData']);
    Route::get('/policies', fn() => \App\Models\Policy::active()
        ->orderBy('sort_order')
        ->orderBy('title')
        ->get(['id', 'title', 'category'])
        ->map(fn($p) => [
            'id'       => $p->id,
            'title'    => $p->title,
            'category' => $p->category,
            'view_url' => route('policies.show', $p),
        ]));
});

Route::get('/menus/location/{location}', [\App\Http\Controllers\Api\MenuApiController::class, 'getPublicMenu']);
