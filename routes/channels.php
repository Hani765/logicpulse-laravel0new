<?php

use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Broadcast;
use Illuminate\Support\Facades\Log;

Broadcast::channel('App.Models.User.{id}', function ($user, $id) {
    return (int) $user->id === (int) $id;
});

Broadcast::channel('admin.notifications', function ($user) {
    return $user->role === 'administrator';
});
Broadcast::channel('notifications.{id}', function ($user, $id) {
    return (int) $user->id === (int) $id; // make sure user is authorized to access
});
Broadcast::channel('message', function ($user) {
    return Auth::check();
});
