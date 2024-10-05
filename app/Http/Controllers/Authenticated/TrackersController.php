<?php

namespace App\Http\Controllers\Authenticated;

use App\Http\Requests\Authenticated\TrackerRequest;
use Carbon\Carbon;

use App\Http\Controllers\Controller;
use App\Models\Tracker;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Config;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\Rule;
use Inertia\Inertia;
use Inertia\Response;

class TrackersController extends Controller
{

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request): Response
    {
        try {
            $user = Auth::user();
            $role = $user->role;
            $userTimezone = $user->time_zone; // Assuming the user's timezone is stored in the user's table
            $applicationTimezone = Config::get('app.timezone');

            // Set the default timezone to the application timezone
            // This ensures that the queries are executed using the application's timezone
            date_default_timezone_set($applicationTimezone);

            // Convert today's date to the user's timezone for filtering
            $today = Carbon::now($applicationTimezone)->setTimezone($userTimezone)->toDateString();

            $perPage = $request->input('per_page', 50); // Default to 50 items per page
            $page = $request->input('page', 1);
            $q = $request->input('q', ''); // Get the search query from the request, default to empty string if not provided

            // Explicitly define the mapping of roles to column names
            $roleToColumnMap = [
                'administrator' => '',
                'admin' => 'admin_id',
                'manager' => 'manager_id',
                'user' => 'user_id',
            ];

            if (!isset($roleToColumnMap[$role])) {
                return response()->json(['error' => 'Invalid role'], 400);
            }

            if ($user->role === 'administrator') {
                $TrackerQuery = Tracker::query();
            } elseif ($user->role === 'admin') {
                $TrackerQuery = Tracker::query()->where('user_id', $user->unique_id);
            } else {
                // Invalid role, return error message
                return response()->json([
                    "message" => "Invalid role. You are not allowed to access this resource."
                ], 403);
            }

            if ($q) {
                $TrackerQuery->where('name', 'like', "%$q%");
            }

            // Paginate results
            $Trackers = $TrackerQuery->paginate($perPage, ['*'], 'page', $page);

            // Adding pagination meta data
            $response = [];
            $click_column = $roleToColumnMap[$role];
            foreach ($Trackers as $traker) {
                if ($role == 'administrator') {
                    $clicksCount = DB::table('clicks')
                        ->where('tracker_id', $traker->unique_id)->whereDate('created_at', '=', $today)
                        ->count();

                    $conversionsCount = DB::table('conversions')
                        ->where('tracker_id', $traker->unique_id)->whereDate('created_at', '=', $today)
                        ->where('status', 'approved')
                        ->count();
                } else {
                    $clicksCount = DB::table('clicks')
                        ->where('tracker_id', $traker->unique_id)
                        ->where($click_column, $user->unique_id)->whereDate('created_at', '=', $today)
                        ->count();

                    $conversionsCount = DB::table('conversions')
                        ->where('tracker_id', $traker->unique_id)
                        ->where($click_column, $user->unique_id)->whereDate('created_at', '=', $today)
                        ->where('status', 'approved')
                        ->count();
                }

                $cvr = $clicksCount > 0 ? ($conversionsCount / $clicksCount) * 100 : 0;

                $response[] = [
                    'id' => $traker->id,
                    'unique_id' => $traker->unique_id,
                    'name' => $traker->name,
                    'param' => $traker->param,
                    'value' => $traker->value,
                    'clicks' => $clicksCount,
                    'conversions' => $conversionsCount,
                    'cvr' => $cvr,
                    'created_at' => $traker->created_at,
                    'updated_at' => $traker->updated_at,
                    "status" => $traker->status,
                ];
            }
            $paginationData = [
                'current_page' => $Trackers->currentPage(),
                'last_page' => $Trackers->lastPage(),
                'first_page' => 1, // First page is always 1 in Laravel pagination
                'per_page' => $Trackers->perPage(),
                'total' => $Trackers->total(),
                'next_page' => $Trackers->currentPage() < $Trackers->lastPage() ? $Trackers->currentPage() + 1 : null,
                'prev_page' => $Trackers->currentPage() > 1 ? $Trackers->currentPage() - 1 : null,
            ];
            return Inertia::render('Trackers/index', [
                'data' => $response,
                'pagination' => $paginationData,
            ]);
        } catch (\Exception $err) {
            Log::info("Traker index error =>" . $err->getMessage());
            return response()->json([
                "message" => "Something went wrong. Please try again later!"
            ], 500);
        }
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(TrackerRequest $request)
    {
        $payload = $request->validated();
        try {
            $user = $request->user();
            $payload['user_id'] = $user->unique_id;
            $payload["unique_id"] = Str::uuid();
            $Traker = Tracker::create($payload);
        } catch (\Exception $err) {
            Log::info("Traker creaate error =>" . $err->getMessage());
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $uniqueId)
    {
        $tracker = Tracker::where('unique_id', $uniqueId)->first();

        $payload = $request->validate([
            'name' => ['required', 'string', 'max:255', Rule::unique('trackers', 'name')->ignore($tracker->id)],
            'param' => 'required|string|max:255',
            'value' => 'required|string|max:255',
            'status' => 'required|string|in:active,inactive',
        ]);
        try {
            $tracker->update($payload);
        } catch (\Exception $err) {
            Log::info("Traker creaate error =>" . $err->getMessage());
        }
    }


    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request, string $uniqueId)
    {
        try {
            // Ensure the user is authenticated
            if (!Auth::check()) {
                return response()->json(['message' => 'Unauthenticated'], 401);
            }
            // Find the domain by its unique_id
            $traker = Tracker::where('unique_id', $uniqueId)->firstOrFail();

            // Delete the domain
            $traker->delete();

            // Return success response
        } catch (\Exception $err) {
            Log::error('Error in TrackersController@show: ' . $err->getMessage());
            return response()->json(['message' => 'Failed to delete Network'], 500);
        }
    }

    public function deleteRows(Request $request)
    {
        if (!Auth::check()) {
            return response()->json(['message' => 'Unauthenticated'], 401);
        }
        // Validate the request data
        $request->validate([
            'unique_ids' => 'required|array', // Make sure unique_ids is an array
            'unique_ids.*' => 'exists:trackers,unique_id', // Validate each unique_id exists in your database
        ]);

        // Extract unique_ids from the request
        $uniqueIds = $request->input('unique_ids');

        try {
            // Delete rows from the database based on unique_ids
            Tracker::whereIn('unique_id', $uniqueIds)->delete();

            return response()->json(['message' => 'Rows deleted successfully'], 200);
        } catch (\Exception $e) {
            // Handle any errors
            return response()->json(['error' => 'Failed to delete rows'], 500);
        }
    }
}
