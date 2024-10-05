<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class Conversion extends Model
{
    use HasFactory;

    protected $fillable = [
        'unique_id',
        'click_id',
        'offer_id',
        'network_id',
        'tracker_id',
        'domain_id',
        'user_id',
        'manager_id',
        'admin_id',
        'ip_address',
        'ip_score',
        'country',
        'city',
        'device',
        'device_version',
        'browser',
        'version',
        'status',
    ];

    protected static function boot()
    {
        parent::boot();

        static::saved(function ($conversion) {
            $click = Click::where('unique_id', $conversion->click_id)->first();
            if ($click) {
                $click->status = $conversion->status;
                $click->save();
            }
        });
    }

    public function click()
    {
        return $this->belongsTo(Click::class, 'click_id', 'unique_id');
    }

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id', 'unique_id');
    }

    public function network()
    {
        return $this->belongsTo(Network::class, 'network_id', 'unique_id');
    }

    public function offer()
    {
        return $this->belongsTo(Offers::class, 'offer_id', 'unique_id');
    }

    public function domain()
    {
        return $this->belongsTo(Domain::class, 'domain_id', 'unique_id');
    }

    public function tracker()
    {
        return $this->belongsTo(Tracker::class, 'tracker_id', 'unique_id');
    }

    public function manager()
    {
        return $this->belongsTo(User::class, 'manager_id', 'unique_id');
    }

    public function admin()
    {
        return $this->belongsTo(User::class, 'admin_id', 'unique_id');
    }
}
