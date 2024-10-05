<?php

use App\Http\Controllers\Authenticated\ClickController;
use App\Http\Controllers\Authenticated\DomainController;
use App\Http\Controllers\Authenticated\FetchController;
use App\Http\Controllers\Authenticated\NetworkController;
use App\Http\Controllers\Authenticated\NotificationsController;
use App\Http\Controllers\Authenticated\OffersController;
use App\Http\Controllers\Authenticated\RedirectController;
use App\Http\Controllers\Authenticated\SessionController;
use App\Http\Controllers\Authenticated\Settings\AccountsController;
use App\Http\Controllers\landing\HeroController;
use App\Http\Controllers\Authenticated\Settings\ProfileController;
use App\Http\Controllers\Authenticated\SourceController;
use App\Http\Controllers\Authenticated\TrackersController;
use App\Http\Controllers\Authenticated\UserController;
use App\Http\Controllers\Authenticated\OnBordingController;
use App\Http\Controllers\Authenticated\RoutesController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;



Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');
Route::apiResources([
    "/redirect" => RedirectController::class,
]);

Route::middleware('auth')->group(function () {

    Route::middleware(['checkRole:administrator'])->group(function () {
        Route::apiResources([
            "/settings/account" => AccountsController::class,
            "/dashboard/sources" => SourceController::class,
        ]);
    });
    Route::middleware(['checkRole:administrator,admin'])->group(function () {
        Route::apiResources([
            "/dashboard/domains" => DomainController::class,
            "/dashboard/trackers" => TrackersController::class,
            "/dashboard/networks" => NetworkController::class,
        ]);
        Route::get('/fetch/all-users', [FetchController::class, 'fetchFilterAllUsers']);
        Route::get('/fetch/trackers', [FetchController::class, 'fetchFilterTrackers']);
        Route::get('/fetch/networks', [FetchController::class, 'fetchFilterNetworks']);
    });

    Route::middleware(['checkRole:administrator,admin,manager'])->group(function () {
        Route::apiResources([
            "/dashboard/users" => UserController::class,
        ]);
        Route::get("/fetch-users", [
            UserController::class,
            'get'
        ]);
        Route::get('/fetch/users', [FetchController::class, 'fetchFilterUsers']);
        Route::get('/fetch/offers', [FetchController::class, 'fetchFilterOffers']);
        Route::get('/fetch/domains', [FetchController::class, 'fetchFilterDomains']);
    });

    Route::apiResources([
        "/dashboard/offers" => OffersController::class,
        "/onboarding" => OnBordingController::class,
        "/notifications" => NotificationsController::class,
        "/sessions" => SessionController::class,
        "/reports/clicks" => ClickController::class,
    ]);
    Route::get('/fetch/countriesData', [FetchController::class, 'fetchFilterCountries']);
    Route::get('/fetch/categories', [FetchController::class, 'fetchFilterCategories']);
    Route::get('/fetch/languagesData', [FetchController::class, 'fetchFilterLanguages']);
    Route::get('generate/session', [SessionController::class, 'update']);
    Route::get('/settings/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
    Route::patch('/update/timeZone', [ProfileController::class, 'changeLanguageTimeZone']);
    Route::get('/routes', [RoutesController::class, 'getRoutes']);
    Route::get('/click-conversion-count', [ClickController::class, 'getClickCount']);

    Route::get('/update/NotifcationSettings', [ProfileController::class, 'updateNotificationSettings']);

});
Route::apiResources([
    "/landing/hero" => HeroController::class,
]);
require __DIR__ . '/auth.php';