<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Stevebauman\Location\Facades\Location;
use Jenssegers\Agent\Agent;
use App\Models\Sessions;

class CaptureSessionDetails
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle(Request $request, Closure $next)
    {
        if (Auth::check()) {
            $user = Auth::user();
            $ip = $request->ip();
            $location = Location::get($ip);
            $agent = new Agent();

            $sessionData = [
                'user_id' => $user->id,
                'ip_address' => $ip,
                'device' => $agent->device(),
                'device_type' => $agent->isDesktop() ? 'Desktop' : ($agent->isTablet() ? 'Tablet' : 'Mobile'),
                'platform' => $agent->platform(),
                'platform_version' => $agent->version($agent->platform()),
                'browser' => $agent->browser(),
                'browser_version' => $agent->version($agent->browser()),
                'is_robot' => $agent->isRobot(),
                'country' => $location->countryName ?? 'Unknown',
                'country_code' => $location->countryCode ?? 'Unknown',
                'state' => $location->regionName ?? 'Unknown',
                'city' => $location->cityName ?? 'Unknown',
                'postal' => $location->zipCode ?? 'Unknown',
                'latitude' => $location->latitude ?? 0,
                'longitude' => $location->longitude ?? 0,
            ];

            Sessions::create($sessionData);
        }

        return $next($request);
    }
}
