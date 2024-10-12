<?php

namespace App\Http\Controllers\Authenticated;

use App\Http\Controllers\Controller;
use App\Models\Click;
use App\Services\MetricsService;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class ClickController extends Controller
{
    /**
     * Display a listing of the resource.
     */

    public function index(Request $request)
    {
        $metricsService = new MetricsService();

        // Get start_date and end_date from the request or set defaults (-7 days to today)
        $start_date = $request->input('from')
            ? $metricsService->convertToUserTimezone($request->input('from'))
            : $metricsService->getTodayDateInUserTimezone();

        $end_date = $request->input('to')
            ? $metricsService->convertToUserTimezone($request->input('to'))
            : $metricsService->getTodayDateInUserTimezone();

        // Convert start and end date to Carbon instances
        $start_date = Carbon::parse($start_date)->startOfDay(); // 2024-10-09 00:00:00
        $end_date = Carbon::parse($end_date)->endOfDay();

        // Fetch clicks between the given dates
        $clicksQuery = DB::table('clicks')
            ->join('click_details', 'clicks.id', '=', 'click_details.click_id')
            ->whereBetween('clicks.created_at', [$start_date, $end_date])
            ->get();

        // Fetch conversions within the same date range and filter for approved status
        $conversionsQuery = DB::table('conversions')
            ->join('click_details', 'conversions.click_id', '=', 'click_details.click_id')
            ->whereBetween('conversions.created_at', [$start_date, $end_date])
            ->where('click_details.status', 'approved')
            ->get();

        // Return response with clicks and conversions data
        $response = [
            'clicks' => $clicksQuery,
            'conversions' => $conversionsQuery,
        ];

        return response()->json($response);
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