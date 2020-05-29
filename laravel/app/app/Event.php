<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Event extends Model
{
    protected $fillable = [
        'user_id', 'title', 'description', 'time', 'location'
    ];

    public function user() {
        return $this->belongsTo(User::class, 'user_id');
    }
}
