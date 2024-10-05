<?php

namespace App\Http\Controllers\Authenticated;

use App\Events\DomainAdded;
use Carbon\Carbon;

use App\Http\Controllers\Controller;
use App\Http\Requests\Authenticated\DomainRequest;
use App\Models\Domain;
use App\Models\User;
use App\Services\MetricsService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Config;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Route;
use Illuminate\Validation\Rule;
use Inertia\Inertia;
use Inertia\Response;

class DomainController extends Controller
{
    public function index(Request $request): Response
    {
        try {
            $metricsService = new MetricsService();
            $today = $metricsService->getTodayDateInUserTimezone();
            $user = $metricsService->getUser();

            $perPage = $request->input('per_page', 50);
            $page = $request->input('page', 1);
            $q = $request->input('q', '');

            $roleToColumnMap = [
                'administrator' => '',
                'admin' => 'admin_id',
                'manager' => 'manager_id',
                'user' => 'user_id',
            ];

            if (!isset($roleToColumnMap[$user->role])) {
                return response()->json(['error' => 'Invalid role'], 400);
            }

            $domainsQuery = $this->getDomainsQuery($roleToColumnMap[$user->role]);

            if ($q) {
                $domainsQuery->where('value', 'like', "%$q%");
            }

            $domains = $domainsQuery->paginate($perPage, ['*'], 'page', $page);
            $response = [];
            $clickColumn = $roleToColumnMap[$user->role];

            foreach ($domains as $domain) {
                $metrics = $metricsService->getClicksAndConversions(
                    'domain',
                    $domain->unique_id,
                    $today,
                    $clickColumn
                );

                $response[] = [
                    'id' => $domain->id,
                    'unique_id' => $domain->unique_id,
                    'name' => $domain->name,
                    'clicks' => $metrics['clicks'],
                    'conversions' => $metrics['conversions'],
                    'cvr' => $metrics['cvr'],
                    'created_at' => $domain->created_at,
                    'updated_at' => $domain->updated_at,
                    'status' => $domain->status,
                ];
            }

            $paginationData = [
                'current_page' => $domains->currentPage(),
                'last_page' => $domains->lastPage(),
                'first_page' => 1,
                'per_page' => $domains->perPage(),
                'total' => $domains->total(),
                'next_page' => $domains->currentPage() < $domains->lastPage() ? $domains->currentPage() + 1 : null,
                'prev_page' => $domains->currentPage() > 1 ? $domains->currentPage() - 1 : null,
            ];

            return Inertia::render('Domains/index', [
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

    private function getDomainsQuery(string $clickColumn)
    {
        $user = Auth::user();

        if ($user->role === 'administrator') {
            return Domain::query();
        } elseif ($user->role === 'admin') {
            return Domain::query()->where('user_id', $user->unique_id);
        } else {
            abort(403, "Invalid role. You are not allowed to access this resource.");
        }
    }

    public function store(DomainRequest $request)
    {
        $payload = $request->validated();
        try {
            $user = $request->user();
            $payload['user_id'] = $user->unique_id;
            $payload["unique_id"] = Str::uuid();
            $domain = Domain::create($payload);
            return back()->with('status', 'domain-created');
        } catch (\Exception $err) {
            return response()->json([
                "message" => "Something went wrong. Please try again later!"
            ], 500);
        }
    }

    public function show($uniqueId)
    {
        try {
            if (!Auth::check()) {
                return response()->json(['message' => 'Unauthenticated'], 401);
            }
            // Retrieve the domain based on the unique_id column
            $domain = Domain::where('unique_id', $uniqueId)->first();

            if ($domain) {
                // Retrieve user IDs associated with the domain
                $userIds = DB::table('users')->where('domain_id', $domain->unique_id)->pluck('unique_id')->implode(',');

                // Return the response data as a JSON response
                return response()->json([
                    'domain' => [
                        'id' => $domain->id,
                        'unique_id' => $domain->unique_id,
                        'name' => $domain->name,
                        'status' => $domain->status,
                        'created_at' => $domain->created_at,
                        'updated_at' => $domain->updated_at,
                    ],
                    'user_ids' => $userIds,
                ]);
            } else {
                // Return an error response if the resource is not found
                return response()->json(['error' => 'Resource not found'], 404);
            }
        } catch (\Exception $err) {
            return response()->json(['error' => 'Something went wrong'], 500);
        }
    }

    public function update(Request $request, string $unique_id)
    {
        if (!Auth::check()) {
            return response()->json(['message' => 'Unauthorized'], 401);
        }

        // Find the domain
        $domain = Domain::where('unique_id', $unique_id)->firstOrFail();

        // Validation
        $validated = $request->validate([
            'name' => ['required', 'url', 'max:255', Rule::unique('domains', 'name')->ignore($domain->id)],
            'status' => 'required|string|in:active,inactive',
            'selectedUsers' => 'nullable|string',
        ]);

        // Update the domain
        $domain->name = $validated['name'];
        $domain->status = $validated['status'];
        $domain->save();

        // Parse the comma-separated selected users
        $selectedUserIds = array_filter(explode(',', $validated['selectedUsers']));

        // Update the users' domain_id
        User::where('domain_id', $domain->unique_id)
            ->whereNotIn('unique_id', $selectedUserIds)
            ->update(['domain_id' => null]);

        User::whereIn('unique_id', $selectedUserIds)
            ->update(['domain_id' => $domain->unique_id]);

        return back()->with('status', 'domain-updated');
    }


    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request, $uniqueId)
    {
        try {
            // Authentication check
            if (!Auth::check()) {
                return response()->json(['message' => 'Unauthenticated'], 401);
            }

            // Find and delete the domain
            $domain = Domain::where('unique_id', $uniqueId)->firstOrFail();
            $domain->delete();
            User::where('domain_id', $domain->unique_id)
                ->update(['domain_id' => null]);
            return back()->with('status', 'Domain has been created!');
        } catch (\Exception $err) {
            return response()->json(['message' => 'Failed to delete domain'], 500);
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
            'unique_ids.*' => 'exists:domains,unique_id', // Validate each unique_id exists in your database
        ]);

        // Extract unique_ids from the request
        $uniqueIds = $request->input('unique_ids');

        try {
            // Delete rows from the database based on unique_ids
            Domain::whereIn('unique_id', $uniqueIds)->delete();

            return response()->json(['message' => 'Rows deleted successfully'], 200);
        } catch (\Exception $e) {
            // Handle any errors
            return response()->json(['error' => 'Failed to delete rows'], 500);
        }
    }
}
