<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Click extends Model
{
    use HasFactory;

    protected $fillable = [
        'unique_id',
        'offer_id',
        'network_id',
        'tracker_id',
        'domain_id',
        'user_id',
        'manager_id',
        'admin_id',
        'status',
        // other fields
    ];

    // Define the relationship
    public function clickDetails()
    {
        return $this->hasOne(ClickDetail::class, 'click_id', 'id');
    }
}

