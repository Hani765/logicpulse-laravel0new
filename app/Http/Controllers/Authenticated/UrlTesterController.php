<?php

namespace App\Http\Controllers\Authenticated;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;

class UrlTesterController extends Controller
{
    public function index()
    {
        return Inertia::render("UrlTester/index");
    }
}
