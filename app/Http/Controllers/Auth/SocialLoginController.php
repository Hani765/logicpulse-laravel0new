<?php
namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Services\UserDetailService;
use Laravel\Socialite\Facades\Socialite;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;
use Illuminate\Http\Request;

class SocialLoginController extends Controller
{
    protected $userDetailService;

    // Inject the UserDetailService
    public function __construct(UserDetailService $userDetailService)
    {
        $this->userDetailService = $userDetailService;
    }

    public function redirectToGitHub()
    {
        return Socialite::driver('github')->redirect();
    }

    public function handleGitHubCallback(Request $request)
    {
        $providerUser = Socialite::driver('github')->user();

        if (!$providerUser) {
            // Handle the error, e.g., redirect with an error message
            return redirect()->route('login')->with('error', 'Failed to get user data from GitHub.');
        }

        $this->loginOrCreateAccount($providerUser, 'github', $request);
        return redirect()->intended('/generate/session');
    }

    public function redirectToGoogle()
    {
        return Socialite::driver('google')->redirect();
    }

    public function handleGoogleCallback(Request $request)
    {
        $providerUser = Socialite::driver('google')->user();

        if (!$providerUser) {
            // Handle the error, e.g., redirect with an error message
            return redirect()->route('login')->with('error', 'Failed to get user data from Google.');
        }

        $this->loginOrCreateAccount($providerUser, 'google', $request);
        return redirect()->intended('/generate/session');
    }

    protected function loginOrCreateAccount($providerUser, $provider, $request)
    {
        // Check if the user already exists by provider ID
        $user = User::where('provider_id', $providerUser->getId())->first();

        if (!$user) {
            // Check if a user with the same email already exists
            $user = User::where('email', $providerUser->getEmail())->first();

            if ($user) {
                // Link the new provider to the existing user
                $user->provider = $provider;
                $user->provider_id = $providerUser->getId();
                $user->save();
            } else {
                // Extract full name and split into first and last name
                $fullName = $providerUser->getName() ?? '';
                $nameParts = explode(' ', $fullName);
                $firstName = $nameParts[0] ?? '';
                $lastName = count($nameParts) > 1 ? $nameParts[1] : '';

                // Retrieve additional user details
                $userDetails = $this->userDetailService->getUserDetails($request);

                // Create a new user if no user with the same email exists
                $user = User::create([
                    'unique_id' => Str::uuid(),
                    'first_name' => $firstName,
                    'last_name' => $lastName,
                    'username' => $providerUser->getNickname() ?? $providerUser->getName(),
                    'email' => $providerUser->getEmail(),
                    'password' => Str::uuid(), // Consider hashing the password if it's used for authentication
                    'provider' => $provider,
                    'provider_id' => $providerUser->getId(),
                    'country' => $userDetails['country'] ?? '',
                    'city' => $userDetails['city'] ?? '',
                    'time_zone' => $userDetails['time_zone'] ?? '',
                    'state' => $userDetails['state'] ?? '',
                    'email_verified_at' => now(),
                ]);
            }
        }

        // Log the user in
        Auth::login($user, true);
    }
}
