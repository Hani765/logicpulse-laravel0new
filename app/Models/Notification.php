<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Notification extends Model
{
    use HasFactory;
    protected $fillable = [
        "type",
        "sender_id",
        "username",
        "data",
        "user_ids",
        "read_at",
    ];
}