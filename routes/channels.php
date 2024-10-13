<?php

use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Broadcast;
use Illuminate\Support\Facades\Log;

Broadcast::channel('App.Models.User.{unique_id}', function ($user, $unique_id) {
    return (int) $user->id === (int) $unique_id;
});
Broadcast::channel('notifications.{unique_id}', function ($user, $unique_id) {
    return (int) $user->unique_id === (int) $unique_id;
});

Broadcast::channel('notifications.role.{role}', function ($user, $role) {
    return $user->role === $role;
});
Broadcast::channel('clickConversion.{unique_id}', function ($user, $unique_id) {
    return (int) $user->unique_id === (int) $unique_id;
});

Broadcast::channel('clickConversion.role.{role}', function ($user, $role) {
    return $user->role === $role;
});
