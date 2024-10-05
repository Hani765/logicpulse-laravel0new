<?php

namespace App\Http\Controllers\Authenticated;

use Carbon\Carbon;

use App\Http\Controllers\Controller;
use App\Http\Requests\Authenticated\OffersRequest;
use App\Models\Domain;
use App\Models\Offers;
use Illuminate\Support\Facades\DB;
use App\Models\User;
use App\Services\MetricsService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Config;
use Illuminate\Support\Str;
use Illuminate\Validation\Rule;
use Inertia\Inertia;

class OffersController extends Controller
{
    /**
     * Display a listing of the resource.
     */


    public function index(Request $request)
    {
        $metricsService = new MetricsService();
        $today = $metricsService->getTodayDateInUserTimezone();
        $user = $metricsService->getUser();

        $perPage = $request->input('per_page', 50); // Default to 50 items per page
        $page = $request->input('page', 1);
        $q = $request->input('q', ''); // Get the search query from the request, default to empty string if not provided
        $status = $request->input('status', ''); // Get the search query from the request, default to empty string if not provided

        // Explicitly define the mapping of roles to column names
        $roleToColumnMap = [
            'administrator' => '',
            'admin' => 'admin_id',
            'manager' => 'manager_id',
            'user' => 'user_id',
        ];

        if (!isset($roleToColumnMap[$user->role])) {
            return response()->json(['error' => 'Invalid role'], 400);
        }

        $role = $user->role;
        if ($role === 'administrator') {
            // Fetch all offers for administrators
            $offersQuery = Offers::query();
        } elseif ($role === 'admin') {
            // Fetch offers where the offer's user_id matches the user's unique_id
            $offersQuery = Offers::where('user_id', $user->unique_id);
        } else {
            // Fetch offers where the user's unique_id is in the user_unique_ids field (comma-separated)
            $offerUser = DB::table('offer_user')->where('user_unique_id', $user->unique_id)->first();

            $offerUniqueIds = $offerUser ? explode(',', $offerUser->offer_unique_ids) : [];
            $offersQuery = Offers::whereIn('unique_id', $offerUniqueIds);
        }
        if ($q) {
            $offersQuery->where('offer_name', 'like', "%$q%");
        }
        if ($status) {
            $offersQuery->where('status', 'like', "%$status%");
        }
        $offers = $offersQuery->paginate($perPage, ['*'], 'page', $page);

        $response = [];
        $clickColumn = $roleToColumnMap[$role];

        foreach ($offers as $offer) {
            $metrics = $metricsService->getClicksAndConversions(
                'domain',
                $offer->unique_id,
                $today,
                $clickColumn
            );


            // Fetch the domain value by domain_id
            $domain = Domain::where('unique_id', $offer->domain_id)->value('name');

            // Construct the URL
            $url = $domain . 'redirect?p=' . $user->unique_id . '&o=' . $offer->id;

            // Set the limit for the combined offer name and countries to 100 characters
            $offerName = Str::limit($offer->offer_name . $offer->countries, 40);

            $response[] = [
                'id' => $offer->id,
                'unique_id' => $offer->unique_id,
                'name' => $offer->offer_name,
                'nameWithCountries' => $offerName,
                'age' => $offer->age,
                'rate' => $offer->rate,
                'clicks' => $metrics['clicks'],
                'conversions' => $metrics['conversions'],
                'cvr' => $metrics['cvr'],
                'url' => $url,
                'status' => $offer->status,
                'created_at' => $offer->created_at,
                'updated_at' => $offer->updated_at,
            ];
        }
        $paginationData = [
            'current_page' => $offers->currentPage(),
            'last_page' => $offers->lastPage(),
            'first_page' => 1, // First page is always 1 in Laravel pagination
            'per_page' => $offers->perPage(),
            'total' => $offers->total(),
            'next_page' => $offers->currentPage() < $offers->lastPage() ? $offers->currentPage() + 1 : null,
            'prev_page' => $offers->currentPage() > 1 ? $offers->currentPage() - 1 : null,
        ];
        return Inertia::render('Offers/index', [
            'user' => $user,
            'data' => $response,
            'pagination' => $paginationData,
        ]);
    }

    public function OfferReport(Request $request)
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
        $network_id = $request['network'] ?? '';
        $tracker_id = $request['tracker'] ?? '';
        $domain_id = $request['domain'] ?? '';
        $country = $request['country'] ?? '';
        $cat = $request['cat'] ?? '';
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

        $offersQuery = $this->getOffersQuery($user, $roleToColumnMap, $offer_id, $status, $admin, $manager, $fetchuser, $network_id, $tracker_id, $country, $domain_id, $cat);

        $offers = $offersQuery->paginate($perPage, ['*'], 'page', $page);

        $response = $this->getOffersResponse($offers, $user, $roleToColumnMap[$user->role], $startDate, $endDate);

        $paginationData = [
            'current_page' => $offers->currentPage(),
            'last_page' => $offers->lastPage(),
            'first_page' => 1,
            'per_page' => $offers->perPage(),
            'total' => $offers->total(),
            'next_page' => $offers->currentPage() < $offers->lastPage() ? $offers->currentPage() + 1 : null,
            'prev_page' => $offers->currentPage() > 1 ? $offers->currentPage() - 1 : null,
        ];

        return response()->json([
            'data' => $response,
            'pagination' => $paginationData,
        ]);
    }



    /**
     * Store a newly created resource in storage.
     */
    public function store(OffersRequest $request)
    {
        $payload = $request->validated();
        try {
            // Get the authenticated user
            $user = $request->user();

            // Add the user_id and unique_id to the payload
            $payload['user_id'] = $user->unique_id;
            $payload['unique_id'] = Str::uuid();
            // Convert 'urls' array to a JSON string or a comma-separated string
            if ($request->hasFile('image')) {
                $image = $request->file('image');
                $imageName = $payload['unique_id'] . '.' . $image->getClientOriginalExtension();
                $imagePath = $image->storeAs('offers', $imageName, 'public');

                // Store the path in the payload
                $payload['image'] = 'storage/' . $imagePath;
            }

            // Convert 'urls' array to a JSON string
            if (isset($payload['urls']) && is_array($payload['urls'])) {
                $payload['urls'] = json_encode($payload['urls']);
            }

            $offer = Offers::create($payload);

            // Assign users to the offer if user_unique_ids are provided
            if ($request->has('users_ids')) {
                // Convert the comma-separated string to an array
                $userIds = explode(',', $request->users_ids);

                // Iterate over the user IDs
                foreach ($userIds as $userId) {
                    // Retrieve the existing offer unique IDs for the user
                    $existingOfferIds = DB::table('offer_user')
                        ->where('user_unique_id', $userId)
                        ->value('offer_unique_ids');

                    // Concatenate the new offer unique ID with the existing IDs
                    $updatedOfferIds = $existingOfferIds ? $existingOfferIds . ',' . $offer->unique_id : $offer->unique_id;

                    // Update the offer unique IDs for the user
                    DB::table('offer_user')
                        ->updateOrInsert(
                            ['user_unique_id' => $userId],
                            ['offer_unique_ids' => $updatedOfferIds]
                        );
                }
            }

        } catch (\Exception $err) {
            Log::info("Offer create error => " . $err->getMessage());
            return response()->json([
                "message" => "Something went wrong. Please try again later!"
            ], 500);
        }
    }



    /**
     * Display the specified resource.
     */
    public function show(string $unique_id)
    {
        try {
            if (!Auth::check()) {
                return response()->json(['message' => 'Unauthenticated'], 401);
            }

            // Retrieve the offer based on the unique_id column
            $offer = Offers::where('unique_id', $unique_id)->first();

            if ($offer) {
                // Fetch the user unique IDs related to the offer
                $userIdsString = DB::table('offer_user')
                    ->whereRaw("FIND_IN_SET(?, offer_unique_ids)", [$offer->unique_id])
                    ->pluck('user_unique_id')
                    ->implode(',');

                return response()->json(['offer' => $offer, 'users' => $userIdsString]);
            } else {
                // Return an error response if the offer is not found
                return response()->json(['error' => 'Offer not found'], 404);
            }
        } catch (\Exception $err) {
            // Handle any errors that occur
            return response()->json(['error' => 'Something went wrong'], 500);
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $uniqueId)
    {
        // Find the offer by unique ID
        $offer = Offers::where('unique_id', $uniqueId)->first();

        // Validate request data
        $payload = $request->validate([
            'offer_name' => ['required', 'string', 'max:255', Rule::unique('offers', 'offer_name')->ignore($offer->id)],
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg,webp|max:10240',
            'age' => 'required|integer|min:18',
            'rate' => 'required|numeric',
            'encryption' => 'nullable|string',
            'network_id' => 'required|string',
            'domain_id' => 'required|string',
            'category_id' => 'required|string',
            'details' => 'nullable|string|max:255',
            'users_ids' => 'nullable|string',
            'urls' => 'array',
            'countries' => 'nullable|string',
            'proxy' => 'required|string',
            'status' => 'required|string',
        ]);

        try {
            // Check if user is authenticated
            if (!Auth::check()) {
                return response()->json(['message' => 'Unauthenticated'], 401);
            }

            // Handle image upload
            if ($request->hasFile('image')) {
                $image = $request->file('image');
                $imageName = $uniqueId . '.' . $image->getClientOriginalExtension();
                $imagePath = $image->storeAs('offers', $imageName, 'public');

                // Store the path in the payload
                $payload['image'] = 'storage/' . $imagePath;
            } else {
                // Preserve existing image path if no new image is uploaded
                $payload['image'] = $offer->image;
            }

            // Encode 'urls' field if it is an array
            if (isset($payload['urls']) && is_array($payload['urls'])) {
                $payload['urls'] = json_encode($payload['urls']);
            }

            // Update the offer with the new data
            $offer->update($payload);

            // Handle users_ids (comma-separated string to array)
            $newUserIds = $request->filled('users_ids') ? explode(',', $request->users_ids) : [];

            // Get all users currently associated with this offer
            $currentUserIds = DB::table('offer_user')
                ->where('offer_unique_ids', 'LIKE', '%' . $uniqueId . '%')
                ->pluck('user_unique_id')
                ->toArray();

            // Update user associations
            foreach ($newUserIds as $userId) {
                if (!in_array($userId, $currentUserIds)) {
                    $existingOfferIds = DB::table('offer_user')
                        ->where('user_unique_id', $userId)
                        ->value('offer_unique_ids');

                    $updatedOfferIds = $existingOfferIds ? $existingOfferIds . ',' . $uniqueId : $uniqueId;

                    DB::table('offer_user')
                        ->updateOrInsert(
                            ['user_unique_id' => $userId],
                            ['offer_unique_ids' => $updatedOfferIds]
                        );
                }
            }

            // Remove offer unique_id from users not in the new users list
            foreach ($currentUserIds as $userId) {
                if (!in_array($userId, $newUserIds)) {
                    $existingOfferIds = DB::table('offer_user')
                        ->where('user_unique_id', $userId)
                        ->value('offer_unique_ids');

                    $updatedOfferIds = collect(explode(',', $existingOfferIds))
                        ->reject(fn($value) => $value == $uniqueId)
                        ->implode(',');

                    DB::table('offer_user')
                        ->where('user_unique_id', $userId)
                        ->update(['offer_unique_ids' => $updatedOfferIds]);
                }
            }
        } catch (\Exception $err) {
            return response()->json(['error' => 'Something went wrong', 'message' => $err->getMessage()], 500);
        }
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
            $offer = Offers::where('unique_id', $uniqueId)->firstOrFail();

            // Delete the domain
            $offer->delete();
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
            'unique_ids.*' => 'exists:offers,unique_id', // Validate each unique_id exists in your database
        ]);

        // Extract unique_ids from the request
        $uniqueIds = $request->input('unique_ids');

        try {
            // Delete rows from the database based on unique_ids
            Offers::whereIn('unique_id', $uniqueIds)->delete();

            return response()->json(['message' => 'Rows deleted successfully'], 200);
        } catch (\Exception $e) {
            // Handle any errors
            return response()->json(['error' => 'Failed to delete rows'], 500);
        }
    }
    private function getOffersQuery($user, $roleToColumnMap, $offer_id, $status, $admin, $manager, $fetchuser, $network_id, $tracker_id, $domain_id, $country, $cat)
    {
        $role = $user->role;

        if ($role === 'administrator') {
            $offersQuery = Offers::query();
        } elseif ($role === 'admin') {
            $offersQuery = Offers::where('user_id', $user->unique_id);
        } else {
            $offerUser = DB::table('offer_user')->where('user_unique_id', $user->unique_id)->first();
            $offerUniqueIds = $offerUser ? explode(',', $offerUser->offer_unique_ids) : [];
            $offersQuery = Offers::whereIn('unique_id', $offerUniqueIds);
        }

        if ($offer_id) {
            $offersQuery->where('offer_name', 'like', "%$offer_id%");
        }
        if ($status) {
            $offersQuery->where('status', 'like', "%$status%");
        }
        if ($role === 'administrator' && $admin) {
            $offersQuery->where('admin_id', 'like', "%$admin%");
        }
        if (($role === 'administrator' || $role === 'admin') && $network_id) {
            $offersQuery->where('network_id', 'like', "%$network_id%");
        }
        if (($role === 'administrator' || $role === 'admin') && $tracker_id) {
            $offersQuery->where('tracker_id', 'like', "%$tracker_id%");
        }
        if (($role === 'administrator' || $role === 'admin') && $domain_id) {
            $offersQuery->where('domain_id', 'like', "%$domain_id%");
        }
        if (($role === 'administrator' || $role === 'admin') && $manager) {
            $offersQuery->where('manager_id', 'like', "%$manager%");
        }
        if ($role !== 'user' && $fetchuser) {
            $offersQuery->where('user_id', 'like', "%$fetchuser%");
        }
        if ($country) {
            $offersQuery->where('country', 'like', "%$country%");
        }
        return $offersQuery;
    }

    private function getOffersResponse($offers, $user, $click_column, $startDate, $endDate)
    {
        $response = [];
        $totalClicks = $totalApprovedClicks = $totalRejectedClicks = 0;
        $totalConversions = $totalApprovedConversions = $totalRejectedConversions = 0;
        $totalPayout = 0;

        foreach ($offers as $offer) {
            $clickCounts = $this->getClickCounts($offer->unique_id, $user, $click_column, $startDate, $endDate);
            $conversionCounts = $this->getConversionCounts($offer->unique_id, $user, $click_column, $startDate, $endDate);
            // Calculate payout based on user role
            if ($user->role === 'admin' || $user->role === 'administrator') {
                $payout = $conversionCounts['approved'] * $user->rate;
            } else {
                $payout = $conversionCounts['approved'] * $offer->rate;
            }

            $response[] = [
                'id' => $offer->id,
                'unique_id' => $offer->unique_id,
                'name' => $offer->offer_name,
                'approvedClicks' => $clickCounts['approved'],
                'rejectedClicks' => $clickCounts['rejected'],
                'allClicks' => $clickCounts['all'],
                'approvedConversions' => $conversionCounts['approved'],
                'rejectedConversions' => $conversionCounts['rejected'],
                'allConversions' => $conversionCounts['all'],
                'payout' => $payout,
                'status' => $offer->status,
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

        return $response;
    }

    private function getClickCounts($offerId, $user, $click_column, $startDate, $endDate)
    {
        $query = DB::table('clicks')->where('offer_id', $offerId)->whereBetween('created_at', [$startDate, $endDate]);

        if ($click_column) {
            $query->where($click_column, $user->unique_id);
        }

        return [
            'all' => $query->count(),
            'approved' => $query->where('status', 'approved')->count(),
            'rejected' => $query->where('status', 'rejected')->count(),
        ];
    }

    private function getConversionCounts($offerId, $user, $click_column, $startDate, $endDate)
    {
        $query = DB::table('conversions')->where('offer_id', $offerId)->whereBetween('created_at', [$startDate, $endDate]);

        if ($click_column) {
            $query->where($click_column, $user->unique_id);
        }

        return [
            'all' => $query->count(),
            'approved' => $query->where('status', 'approved')->count(),
            'rejected' => $query->where('status', 'rejected')->count(),
        ];
    }
}
