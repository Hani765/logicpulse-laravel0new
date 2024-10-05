<?php
namespace App\Services;

use Carbon\Carbon;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Config;

class MetricsService
{
    protected $user;
    protected $role;
    protected $userTimezone;
    protected $applicationTimezone;

    public function __construct()
    {
        $this->user = Auth::user();
        $this->role = $this->user->role;
        $this->userTimezone = $this->user->time_zone;
        $this->applicationTimezone = Config::get('app.timezone');
        date_default_timezone_set($this->applicationTimezone);
    }

    public function getTodayDateInUserTimezone(): string
    {
        return Carbon::now($this->applicationTimezone)->setTimezone($this->userTimezone)->toDateString();
    }

    public function getClicksAndConversions($model, $uniqueId, $today, $clickColumn = null)
    {
        // Fetching clicks count based on click details
        $clicksQuery = DB::table('click_details')
            ->join('clicks', 'click_details.click_id', '=', 'clicks.id')
            ->where("click_details.{$model}_id", $uniqueId)
            ->whereDate('clicks.created_at', '=', $today);

        if ($clickColumn) {
            $clicksQuery->where("click_details.{$clickColumn}", $this->user->unique_id);
        }

        $clicksCount = $clicksQuery->count();

        // Fetching conversions count based on click details and status
        $conversionsQuery = DB::table('conversions')
            ->join('click_details', 'conversions.click_id', '=', 'click_details.click_id')
            ->join('clicks', 'click_details.click_id', '=', 'clicks.id')
            ->where("click_details.{$model}_id", $uniqueId)
            ->whereDate('conversions.created_at', '=', $today)
            ->where('click_details.status', 'approved');

        if ($clickColumn) {
            $conversionsQuery->where("click_details.{$clickColumn}", $this->user->unique_id);
        }

        $conversionsCount = $conversionsQuery->count();

        $cvr = $clicksCount > 0 ? ($conversionsCount / $clicksCount) * 100 : 0;

        return [
            'clicks' => $clicksCount,
            'conversions' => $conversionsCount,
            'cvr' => $cvr,
        ];
    }


    public function getUser()
    {
        return $this->user;
    }
}