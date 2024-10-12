<?php

namespace App\Http\Controllers\Authenticated\Dashboard;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class DashboardMessage extends Controller
{
    public function index()
    {
        return 'hello';
    }
}
