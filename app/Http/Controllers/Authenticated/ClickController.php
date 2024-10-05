<?php

namespace App\Http\Controllers\Authenticated;

use App\Http\Controllers\Controller;
use App\Models\Click;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class ClickController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $clicks = Click::orderBy("created_at", "desc")->get();
        return response()->json($clicks);
        // return Inertia::render('Reports/clicks/index', [
        // ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }


    public function getClickCount()
    {
        // Get the authenticated user
        $user = Auth::user();

        // Initialize the click count
        $clickCount = 0;

        // Check the user's role
        if ($user->role == 'user') {
            // Count clicks where the user is the owner
            $clickCount = Click::where('user_id', $user->unique_id)->count();
        } elseif ($user->role == 'manager') {
            // Count clicks where the manager is the owner
            $clickCount = Click::where('manager_id', $user->unique_id)->count();
        } elseif ($user->role == 'admin') {
            // Count clicks where the admin is the owner
            $clickCount = Click::where('admin_id', $user->unique_id)->count();
        }

        // Return the click count as a JSON response
        return response()->json(['click_count' => $clickCount]);
    }
}