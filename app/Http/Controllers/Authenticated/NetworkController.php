<?php

namespace App\Http\Controllers\Authenticated;



use Carbon\Carbon;
use App\Http\Controllers\Controller;
use App\Http\Requests\Authenticated\NetworkRequest;
use App\Models\Network;
use Illuminate\Foundation\Auth\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Config;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\Rule;
use Inertia\Inertia;

class NetworkController extends Controller
{
    public function index(Request $request)
    {
        try {
            $user = Auth::user();
            $role = $user->role;
            $userTimezone = $user->time_zone; // Assuming the user's timezone is stored in the user's table
            $applicationTimezone = Config::get('app.timezone');

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

            // Initialize the query based on the user's role
            if ($role === 'administrator') {
                $networksQuery = Network::query();
            } elseif ($role === 'admin') {
                $networksQuery = Network::query()->where('user_id', $user->unique_id);
            } else {
                return response()->json([
                    "message" => "Invalid role. You are not allowed to access this resource."
                ], 403);
            }

            // If search query is provided, apply search filter
            if ($q) {
                $networksQuery->where('name', 'like', "%$q%");
            }

            // Paginate results
            $networks = $networksQuery->paginate($perPage, ['*'], 'page', $page);
            $response = [];
            $click_column = $roleToColumnMap[$role];

            foreach ($networks as $network) {
                if ($role === 'administrator') {
                    $clicksCount = DB::table('clicks')
                        ->where('network_id', $network->unique_id)
                        ->whereDate('created_at', '=', $today)
                        ->count();

                    $conversionsCount = DB::table('conversions')
                        ->where('network_id', $network->unique_id)
                        ->whereDate('created_at', '=', $today)
                        ->where('status', 'approved')
                        ->count();
                } else {
                    $clicksCount = DB::table('clicks')
                        ->where('network_id', $network->unique_id)
                        ->where($click_column, $user->unique_id)
                        ->whereDate('created_at', '=', $today)
                        ->count();

                    $conversionsCount = DB::table('conversions')
                        ->where('network_id', $network->unique_id)
                        ->where($click_column, $user->unique_id)
                        ->whereDate('created_at', '=', $today)
                        ->where('status', 'approved')
                        ->count();
                }

                $cvr = $clicksCount > 0 ? ($conversionsCount / $clicksCount) * 100 : 0;

                $response[] = [
                    'id' => $network->id,
                    'unique_id' => $network->unique_id,
                    'name' => $network->name,
                    'tracker' => $network->tracker ? $network->tracker->name : null,  // Assuming 'name' is the column in trackers table
                    'tracker_id' => $network->tracker ? $network->tracker->unique_id : null,
                    'clicks' => $clicksCount,
                    'conversions' => $conversionsCount,
                    'cvr' => $cvr,
                    'created_at' => Carbon::parse($network->created_at)->format('Y-m-d H:i:s'),
                    'updated_at' => Carbon::parse($network->updated_at)->format('Y-m-d H:i:s'),
                    'status' => $network->status,
                ];
            }

            $paginationData = [
                'current_page' => $networks->currentPage(),
                'last_page' => $networks->lastPage(),
                'first_page' => 1,
                'per_page' => $networks->perPage(),
                'total' => $networks->total(),
                'next_page' => $networks->currentPage() < $networks->lastPage() ? $networks->currentPage() + 1 : null,
                'prev_page' => $networks->currentPage() > 1 ? $networks->currentPage() - 1 : null,
            ];

            return Inertia::render('Networks/index', [
                'data' => $response,
                'pagination' => $paginationData,
            ]);
        } catch (\Exception $err) {
            Log::error("Domain index error => " . $err->getMessage());
            return response()->json([
                "message" => "Something went wrong. Please try again later!"
            ], 500);
        }
    }

    public function store(NetworkRequest $request)
    {
        $payload = $request->validated();
        try {
            $user = $request->user();
            $payload['user_id'] = $user->unique_id;
            $payload["unique_id"] = Str::uuid();
            $network = Network::create($payload);
        } catch (\Exception $err) {
            Log::info("Network creaate error =>" . $err->getMessage());
            return response()->json([
                "message" => "Something went wrong. Please try again later!"
            ], 500);
        }
    }


    public function update(Request $request, string $unique_id)
    {
        // Authentication check

        $network = Network::where('unique_id', $unique_id)->firstOrFail();
        // Validation
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255', Rule::unique('networks', 'name')->ignore($network->id)],
            'tracker_id' => 'required',
            'status' => 'required|string|in:active,inactive,pause',
        ]);

        // Find and update the domain
        $network->name = $validated['name'];
        $network->status = $validated['status'];
        $network->tracker_id = $validated['tracker_id'];
        $network->save();
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request, $uniqueId)
    {
        try {
            // Ensure the user is authenticated
            if (!Auth::check()) {
                return response()->json(['message' => 'Unauthenticated'], 401);
            }
            // Find the domain by its unique_id
            $network = Network::where('unique_id', $uniqueId)->firstOrFail();

            // Delete the domain
            $network->delete();

            // Return success response
        } catch (\Exception $err) {
            // Return error response if domain not found or deletion fails
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
            'unique_ids.*' => 'exists:networks,unique_id', // Validate each unique_id exists in your database
        ]);

        // Extract unique_ids from the request
        $uniqueIds = $request->input('unique_ids');

        try {
            // Delete rows from the database based on unique_ids
            Network::whereIn('unique_id', $uniqueIds)->delete();

            return response()->json(['message' => 'Rows deleted successfully'], 200);
        } catch (\Exception $e) {
            // Handle any errors
            return response()->json(['error' => 'Failed to delete rows'], 500);
        }
    }
}
