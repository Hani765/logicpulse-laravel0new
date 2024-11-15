<?php

namespace App\Http\Controllers\Authenticated;


use Carbon\Carbon;

use App\Http\Controllers\Controller;
use App\Http\Requests\Authenticated\UserRequest;
use App\Models\Offers;
use App\Models\User;
use App\Models\Users;
use App\Services\CreateNotificationService;
use App\Services\MetricsService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Config;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use Illuminate\Validation\Rule;
use Inertia\Inertia;

class UserController extends Controller
{

    public function index(Request $request)
    {
        return Inertia::render('Users/index', );
    }
    public function fetchUsers(Request $request)
    {
        try {
            $metricsService = new MetricsService();
            // Get start_date and end_date from the request or set defaults (-7 days to today)
            $start_date = $request->input('from')
                ? $metricsService->convertToUserTimezone($request->input('from'))
                : $metricsService->getTodayDateInUserTimezone();
            $chart_start_date = $request->input('from')
                ? $metricsService->convertToUserTimezone($request->input('from'))
                : $metricsService->getDateInUserTimezone('-7 day');
            $end_date = $request->input('to')
                ? $metricsService->convertToUserTimezone($request->input('to'))
                : $metricsService->getTodayDateInUserTimezone();
            $start_date = Carbon::parse($start_date)->startOfDay(); // 2024-10-09 00:00:00
            $chart_start_date = Carbon::parse($chart_start_date)->startOfDay(); // 2024-10-09 00:00:00
            $end_date = Carbon::parse($end_date)->endOfDay(); // 2024-10-09 23:59:59
            $user = $metricsService->getUser();
            $perPage = $request->input('per_page', 50);
            $page = $request->input('page', 1);
            $q = $request->input('q', '');
            $status = $request->input('status', '');
            // Explicitly define the mapping of roles to column names
            $roleToColumnMap = [
                'administrator' => '',
                'admin' => 'admin_id',
                'manager' => 'manager_id',
            ];
            $role = $user->role;

            if (!isset($roleToColumnMap[$role])) {
                return response()->json(['error' => 'Invalid role'], 400);
            }


            if ($role === 'administrator') {
                $usersQuery = User::query()->where('unique_id', '!=', $user->unique_id);
            } elseif ($role === 'admin') {
                // Fetch offers where the offer's user_id matches the user's unique_id
                $usersQuery = User::where('admin_id', $user->unique_id);
            } elseif ($role === 'manager') {
                // Fetch offers where the offer's user_id matches the user's unique_id
                $usersQuery = User::where('manager_id', $user->unique_id);
            }
            if ($q) {
                $usersQuery->where(function ($query) use ($q) {
                    $query->where('username', 'like', "%$q%")
                        ->orWhere('email', 'like', "%$q%")
                        ->orWhere('name', 'like', "%$q%")
                        ->orWhere('phone', 'like', "%$q%");
                });
            }
            if ($status) {
                $usersQuery->where('status', 'like', "%$status%");
            }

            $users = $usersQuery->paginate($perPage, ['*'], 'page', $page);

            $response = [];
            $clickColumn = $roleToColumnMap[$role];
            foreach ($users as $fetchUser) {
                $metrics = $metricsService->getClicksAndConversions(
                    'user',
                    $fetchUser->unique_id,
                    $start_date,
                    $end_date,
                    $clickColumn
                );
                $response[] = [
                    'id' => $fetchUser->id,
                    'unique_id' => $fetchUser->unique_id,
                    'profile_image' => $fetchUser->profile_image,
                    'name' => $fetchUser->name,
                    'username' => $fetchUser->username,
                    'email' => $fetchUser->email,
                    'role' => $fetchUser->role,
                    'phone' => $fetchUser->phone ?: "",
                    'rate' => $fetchUser->rate ?: "",
                    'age' => $fetchUser->age ?: "",
                    'clicks' => $metrics['clicks'],
                    'conversions' => $metrics['conversions'],
                    'cvr' => $metrics['cvr'],
                    'progress' => $metricsService->getProgressData('user', $fetchUser->unique_id, $clickColumn, ),

                    'manager_username' => $fetchUser->manager ? $fetchUser->manager->username : "",
                    'admin_username' => $fetchUser->admin ? $fetchUser->admin->username : "",
                    'created_at' => $fetchUser->created_at,
                    'updated_at' => $fetchUser->updated_at,
                    'status' => $fetchUser->status,
                ];
            }
            $chartData = $metricsService->getChartData('user', $chart_start_date, $end_date, $clickColumn, );

            $paginationData = [
                'current_page' => $users->currentPage(),
                'last_page' => $users->lastPage(),
                'first_page' => 1, // First page is always 1 in Laravel pagination
                'per_page' => $users->perPage(),
                'total' => $users->total(),
                'next_page' => $users->currentPage() < $users->lastPage() ? $users->currentPage() + 1 : null,
                'prev_page' => $users->currentPage() > 1 ? $users->currentPage() - 1 : null,
            ];

            return response()->json([
                'data' => $response,
                'pagination' => $paginationData,
                'chart_data' => $chartData,
            ]);
        } catch (\Exception $err) {
            Log::error(message: "Users index error => " . $err->getMessage());
            return response()->json([
                "message" => "Something went wrong. Please try again later!"
            ], 500);
        }
    }


    public function create()
    {
        return Inertia::render('Users/components/create/index');
    }
    /**
     * Store a newly created resource in storage.
     */
    public function store(UserRequest $request)
    {
        $payload = $request->validated();
        $user = $request->user();

        // Set admin_id and manager_id based on user role
        if ($user->role === "admin" || $user->role === "administrator") {
            $payload["admin_id"] = $user->unique_id;
            $payload["manager_id"] = $user->unique_id;
        } elseif ($user->role === "manager") {
            $payload["manager_id"] = $user->unique_id;
        } else {
            return response()->json(['error' => 'Invalid Role'], 401);
        }

        // Generate unique ID for the new user
        $payload["unique_id"] = (string) Str::uuid();
        $newUser = User::create($payload);

        // Create the new user

        if (!empty($payload['offer_ids'])) {
            try {

                // Split offers string into an array of unique IDs
                DB::table('offer_user')->insert([
                    'user_unique_id' => $newUser->unique_id,
                    'offer_unique_ids' => $payload['offer_ids']
                ]);
            } catch (\Exception $e) {
                return response()->json(['error' => 'Something went wrong', 'message' => $e->getMessage()], 500);
            }
        }
        return redirect()->intended('/dashboard/users');
    }
    public function edit(string $uniqueId)
    {
        try {
            // Find the user by unique ID
            $user = User::where('unique_id', $uniqueId)->first();
            if (!$user) {
                return response()->json(['error' => 'User not found'], 404);
            }

            // Get the unique IDs of offers associated with the user
            $offerUniqueIds = DB::table('offer_user')
                ->where('user_unique_id', $uniqueId)
                ->pluck('offer_unique_ids')
                ->first();

            return Inertia::render('Users/components/update/index', [
                'user' => $user,
                'offer_unique_ids' => $offerUniqueIds
            ]);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Something went wrong', 'message' => $e->getMessage()], 500);
        }
    }
    public function update(Request $request, string $uniqueId)
    {
        $notificationSerive = new CreateNotificationService();
        // Validate request data
        $user = Users::where('unique_id', $uniqueId)->first();
        if (!$user) {
            return response()->json(['error' => 'User not found'], 404);
        }
        $payload = $request->validate([
            'username' => ['required', 'string', 'max:255', Rule::unique('users', 'username')->ignore($user->id)],
            'email' => ['required', 'string', 'email', 'max:255', Rule::unique('users', 'email')->ignore($user->id)],
            'role' => 'required|string|in:admin,manager,user',
            'phone' => 'required|string|max:20',
            'profile_image' => 'nullable|string',
            'password' => 'nullable|string|min:6',
            'rate' => 'required|numeric',
            'status' => 'required|string',
            'details' => 'nullable|string|min:20|max:10000',
            'domain_id' => 'required|string|uuid',
            'skype' => 'required|string|max:255',
            'notification' => 'required|string',
            'isVerified' => 'required|string',
            'offer_ids' => 'nullable|string',
        ]);

        // Check if the authenticated user is admin or manager
        $authUser = Auth::user();
        if ($authUser->role !== 'admin' && $authUser->role !== 'administrator' && $authUser->role !== 'manager') {
            return response()->json(['error' => 'Unauthorized'], 403);
        }

        // Update admin_id and manager_id based on the authenticated user's role
        if ($authUser->role === 'admin' || $authUser->role === 'administrator') {
            $payload['admin_id'] = $authUser->unique_id;
            $payload['manager_id'] = $authUser->unique_id;
        } elseif ($authUser->role === 'manager') {
            $payload['manager_id'] = $authUser->unique_id;
        }

        // Hash the password if it's present in the payload
        if (isset($payload['password'])) {
            $payload['password'] = bcrypt($payload['password']);
        } else {
            unset($payload['password']);
        }

        try {
            // Find the user by unique ID
            $user->update($payload);

            // Update the offer_user table
            if (!empty($payload['offer_ids'])) {
                DB::table('offer_user')
                    ->updateOrInsert(
                        ['user_unique_id' => $user->unique_id],
                        ['offer_unique_ids' => $payload['offer_ids']]
                    );
            } else {
                // If no offers provided, remove the association
                DB::table('offer_user')->where('user_unique_id', $user->unique_id)->delete();
            }

            $unique_ids = $authUser->unique_id . ',' . $user->unique_id;
            $notificationSerive->clickConversoin($unique_ids, '');
        } catch (\Exception $e) {
            return response()->json(['error' => 'Something went wrong', 'message' => $e->getMessage()], 500);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $uniqueId)
    {
        try {
            // Find the user by unique ID
            $user = User::where('unique_id', $uniqueId)->first();
            if (!$user) {
                return response()->json(['error' => 'User not found'], 404);
            }

            // Get the unique IDs of offers associated with the user
            $offerUniqueIds = DB::table('offer_user')
                ->where('user_unique_id', $uniqueId)
                ->pluck('offer_unique_ids')
                ->first();


            return response()->json([
                'user' => $user,
                'offer_unique_ids' => $offerUniqueIds
            ], 200);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Something went wrong', 'message' => $e->getMessage()], 500);
        }
    }




    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $uniqueId)
    {
        $notificationSerive = new CreateNotificationService();
        try {

            // Find the user by unique ID
            $deleteuser = User::where('unique_id', $uniqueId)->first();
            if (!$deleteuser) {
                return response()->json(['error' => 'User not found'], 404);
            }

            // Delete the user
            $deleteuser->delete();

            // Remove any associations in the offer_user table
            DB::table('offer_user')->where('user_unique_id', $uniqueId)->delete();
            $user = Auth::user();
            $notificationSerive->clickConversoin($user->unique_id, '');
        } catch (\Exception $e) {
            return response()->json(['error' => 'Something went wrong', 'message' => $e->getMessage()], 500);
        }
    }

    public function updateProfileImage(Request $request)
    {
        $payload = $request->validate([
            "profile_image" => "required|image|mimes:jpg,png,svg,webp,jpeg,gif|max:2048"
        ]);
        try {
            $user = $request->user();
            $filename = $payload["profile_image"]->store("images_" . $user->id);
            User::where("id", $user->id)->update(["profile_image" => $filename]);
            return response()->json(["image" => $filename]);
        } catch (\Exception $err) {
            Log::info("Profile image error =>" . $err->getMessage());
            return response()->json(["message" => "Something went wrong!"], 500);
        }
    }
    public function getUser(Request $request)
    {
        try {
            $user = $request->user();
            $response = [
                "name" => $user->name,
                "username" => $user->username,
                "email" => $user->email,
                "role" => $user->role,
                "profile_image" => $user->profile_image,
                "status" => $user->status,
            ];
            return response()->json($response);
        } catch (\Exception $err) {
            Log::info("Getting user error =>" . $err->getMessage());
            return response()->json(["message" => "Something went wrong!"], 500);
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
            'unique_ids.*' => 'exists:users,unique_id', // Validate each unique_id exists in your database
        ]);

        // Extract unique_ids from the request
        $uniqueIds = $request->input('unique_ids');

        try {
            // Delete rows from the database based on unique_ids
            User::whereIn('unique_id', $uniqueIds)->delete();

            return response()->json(['message' => 'Rows deleted successfully'], 200);
        } catch (\Exception $e) {
            // Handle any errors
            return response()->json(['error' => 'Failed to delete rows'], 500);
        }
    }
    public function UserReport(Request $request)
    {
        $user = Auth::user();
        $userTimezone = $user->time_zone;
        $applicationTimezone = config('app.timezone');

        date_default_timezone_set($applicationTimezone);

        $today = Carbon::now($applicationTimezone)->setTimezone($userTimezone)->toDateString();

        $startDate = $request->input('from', $today);
        $endDate = $request->input('to', $today);

        $perPage = $request->input('per_page', 50);
        $page = $request->input('page', 1);
        $offer_id = $request->input('offer', '');
        $admin = $request->input('admin', '');
        $manager = $request->input('manager', '');
        $fetchuser = $request->input('user', '');
        $network_id = $request->input('network', '');
        $tracker_id = $request->input('tracker', '');
        $domain_id = $request->input('domain', '');
        $country = $request->input('country', '');
        $cat = $request->input('cat', '');
        $status = $request->input('status', '');

        $roleToColumnMap = [
            'administrator' => '',
            'admin' => 'admin_id',
            'manager' => 'manager_id',
            'user' => 'user_id',
        ];

        if (!isset($roleToColumnMap[$user->role])) {
            return response()->json(['error' => 'Invalid role'], 400);
        }

        $usersQuery = $this->getUsersQuery($user, $roleToColumnMap, $offer_id, $admin, $manager, $fetchuser, $network_id, $tracker_id, $domain_id, $country, $cat, $status);

        $users = $usersQuery->paginate($perPage, ['*'], 'page', $page);

        $response = $this->getUsersResponse($users, $user, $roleToColumnMap[$user->role], $startDate, $endDate);

        $paginationData = [
            'current_page' => $users->currentPage(),
            'last_page' => $users->lastPage(),
            'first_page' => 1,
            'per_page' => $users->perPage(),
            'total' => $users->total(),
            'next_page' => $users->currentPage() < $users->lastPage() ? $users->currentPage() + 1 : null,
            'prev_page' => $users->currentPage() > 1 ? $users->currentPage() - 1 : null,
        ];

        return response()->json([
            'data' => $response,
            'pagination' => $paginationData,
        ]);
    }
    private function getUsersQuery($user, $roleToColumnMap, $offer_id, $admin, $manager, $fetchuser, $network_id, $tracker_id, $domain_id, $country, $cat, $status)
    {
        $role = $user->role;

        if ($role === 'administrator') {
            $usersQuery = User::query();
        } elseif ($role === 'admin') {
            $usersQuery = User::where('admin_id', $user->unique_id);
        } elseif ($role === 'manager') {
            $usersQuery = User::where('manager_id', $user->unique_id);
        } else {
            return User::query()->where('unique_id', 'invalid');  // Invalid role case
        }

        if ($offer_id) {
            $usersQuery->where('offer_id', 'like', "%$offer_id%");
        }
        if ($fetchuser) {
            $usersQuery->where('unique_id', 'like', "%$fetchuser%");
        }
        if ($role !== 'user' && $manager) {
            $usersQuery->where('manager_id', 'like', "%$manager%");
        }
        if ($role === 'administrator' && $admin) {
            $usersQuery->where('admin_id', 'like', "%$admin%");
        }
        if (($role === 'administrator' || $role === 'admin') && $network_id) {
            $usersQuery->where('network_id', 'like', "%$network_id%");
        }
        if (($role === 'administrator' || $role === 'admin') && $tracker_id) {
            $usersQuery->where('tracker_id', 'like', "%$tracker_id%");
        }
        if (($role === 'administrator' || $role === 'admin') && $domain_id) {
            $usersQuery->where('domain_id', 'like', "%$domain_id%");
        }
        if ($country) {
            $usersQuery->where('country', 'like', "%$country%");
        }
        if ($cat) {
            $usersQuery->where('cat', 'like', "%$cat%");
        }
        if ($status) {
            $usersQuery->where('status', 'like', "%$status%");
        }

        return $usersQuery;
    }
    private function getUsersResponse($users, $user, $click_column, $startDate, $endDate)
    {
        $response = [];
        $totalClicks = $totalApprovedClicks = $totalRejectedClicks = 0;
        $totalConversions = $totalApprovedConversions = $totalRejectedConversions = 0;
        $totalPayout = 0;

        foreach ($users as $userItem) {
            $clickCounts = $this->getClickCountsForUser($userItem->unique_id, $startDate, $endDate);
            $conversionCounts = $this->getConversionCountsForUser($userItem->unique_id, $startDate, $endDate);

            // Calculate payout based on user role
            if ($user->role === 'admin' || $user->role === 'administrator') {
                $payout = $conversionCounts['approved'] * $userItem->rate;
            } else {
                $payout = $conversionCounts['approved'] * $userItem->rate;
            }

            $response[] = [
                'id' => $userItem->id,
                'unique_id' => $userItem->unique_id,
                'name' => $userItem->name,
                'approvedClicks' => $clickCounts['approved'],
                'rejectedClicks' => $clickCounts['rejected'],
                'allClicks' => $clickCounts['all'],
                'approvedConversions' => $conversionCounts['approved'],
                'rejectedConversions' => $conversionCounts['rejected'],
                'allConversions' => $conversionCounts['all'],
                'payout' => $payout,
                'status' => $userItem->status,
            ];

            // Accumulate totals
            $totalClicks += $clickCounts['all'];
            $totalApprovedClicks += $clickCounts['approved'];
            $totalRejectedClicks += $clickCounts['rejected'];
            $totalConversions += $conversionCounts['all'];
            $totalApprovedConversions += $conversionCounts['approved'];
            $totalRejectedConversions += $conversionCounts['rejected'];
            $totalPayout += $payout;
        }

        // Add total row
        $response[] = [
            'id' => 'Total',
            'unique_id' => '',
            'name' => '',
            'approvedClicks' => $totalApprovedClicks,
            'rejectedClicks' => $totalRejectedClicks,
            'allClicks' => $totalClicks,
            'approvedConversions' => $totalApprovedConversions,
            'rejectedConversions' => $totalRejectedConversions,
            'allConversions' => $totalConversions,
            'payout' => $totalPayout,
            'status' => '',
        ];

        return $response;
    }
    private function getClickCountsForUser($userId, $startDate, $endDate)
    {
        $query = DB::table('clicks')->where('user_id', $userId)->whereBetween('created_at', [$startDate, $endDate]);

        return [
            'all' => $query->count(),
            'approved' => $query->where('status', 'approved')->count(),
            'rejected' => $query->where('status', 'rejected')->count(),
        ];
    }

    private function getConversionCountsForUser($userId, $startDate, $endDate)
    {
        $query = DB::table('conversions')->where('user_id', $userId)->whereBetween('created_at', [$startDate, $endDate]);

        return [
            'all' => $query->count(),
            'approved' => $query->where('status', 'approved')->count(),
            'rejected' => $query->where('status', 'rejected')->count(),
        ];
    }
}