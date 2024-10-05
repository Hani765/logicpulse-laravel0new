<?php

namespace App\Http\Controllers\Authenticated;

use App\Http\Controllers\Controller;
use App\Models\Click;
use App\Models\ClickDetail;
use App\Models\Network;
use App\Models\Offers;
use App\Models\Source;
use App\Models\sources;
use App\Models\Tracker;
use App\Models\User;
use App\Services\UserDetailService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Illuminate\Support\Str;

class RedirectController extends Controller
{
    protected $userDetailService;

    // Inject the UserDetailService
    public function __construct(UserDetailService $userDetailService)
    {
        $this->userDetailService = $userDetailService;
    }
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $error = false;
        $userId = $request['p'];
        $offerId = $request['o'];
        $source_id = $request['u'];
        if ($userId && $offerId) {

            if ($source_id) {
                $source = Source::select('value')->where('unqiue_id', $source_id)->first();
            } else {
                $source = '';
            }
            // Fetch user data
            $user = User::select('role', 'manager_id', 'admin_id')
                ->where('unique_id', $userId)
                ->where('status', 'active')
                ->first();
            if ($user) {
                // Fetch offer data
                $offer = Offers::where('id', $offerId)->where('status', 'active')->first();

                if ($offer) {
                    // Fetch network and tracker data
                    $network = Network::where('unique_id', $offer->network_id)->first();
                    $tracker = Tracker::where('unique_id', $network->tracker_id)->first();

                    if ($network || $tracker) {
                        // Determine user's accessible offers based on role
                        $offersQuery = $this->getAccessibleOffers($user, $userId);
                        if (!empty($offersQuery) || str_contains($offersQuery, $offerId)) {
                            $userDetails = $this->userDetailService->getUserDetails($request);
                            $create = Click::create();
                            $unique_id = Str::uuid();
                            $payload = [
                                'unique_id' => $unique_id,
                                'click_id' => $create->id,
                                'offer_id' => $offer->unique_id,
                                'network_id' => $offer->network_id,
                                'tracker_id' => $tracker->unique_id,
                                'domain_id' => $offer->domain_id,
                                'user_id' => $userId,
                                'manager_id' => $user->manager_id,
                                'admin_id' => $user->admin_id,
                                'source_id' => $source || '',
                                'ip_address' => $userDetails['ip_address'],
                                'country' => $userDetails['country'],
                                'state' => $userDetails['state'],
                                'city' => $userDetails['city'],
                                'postal' => $userDetails['postal'],
                                'latitude' => $userDetails['latitude'],
                                'longitude' => $userDetails['longitude'],
                                'device' => $userDetails['device'],
                                'device_type' => $userDetails['device_type'],
                                'platform' => $userDetails['platform'],
                                'platform_version' => $userDetails['platform_version'],
                                'browser' => $userDetails['browser'],
                                'browser_version' => $userDetails['browser_version'],
                                'is_robot' => $userDetails['is_robot'],
                                'user_agent' => $userDetails['user_agent'],
                            ];
                            return $payload;
                            $detailsCreate = ClickDetail::create($payload);
                            if ($detailsCreate) {
                                $url = 'https://www.google.com';
                                $offerUrl = $url . '?' . $tracker->param . '=' . $create->id;
                                return redirect()->away($offerUrl);
                            } else {
                                $error = 'Something went wrong! Please try again later or contact with service provider.';
                            }
                        } else {
                            $error = 'The user has not been granted access to this offer.';
                        }
                    } else {
                        $error = 'The offer URL is not correct. Please try again with a correct URL.';
                    }
                } else {
                    $error = 'The offer Id is not correct. Please try again with a correct URL.';
                }
            } else {
                $error = 'The user Id is not correct. Please try again with a correct URL.';
            }
        } else {
            $error = 'The required values not provided in url. Please try to copy paste url or contact with offer provider.';
        }
        return Inertia::render(
            'Redirect/index',
            [
                'error' => $error,
            ]
        );
    }

    private function getAccessibleOffers($user, $userId)
    {
        switch ($user->role) {
            case 'administrator':
                return Offers::pluck('unique_id')->implode(',');
            case 'admin':
                $offersQuery = Offers::where('user_id', $user->unique_id)->pluck('unique_id');
                $userOffersQuery = DB::table('offer_user')
                    ->where('user_unique_id', $userId)
                    ->pluck('offer_unique_ids')
                    ->first();
                return $offersQuery->implode(',') . ',' . $userOffersQuery;
            default:
                return DB::table('offer_user')
                    ->where('user_unique_id', $userId)
                    ->pluck('offer_unique_ids')
                    ->first();
        }
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
}
