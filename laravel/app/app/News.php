<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class News extends Model
{
    protected $fillable = [
        'user_id', 'title', 'description',
    ];

    public function user() {
        return $this->belongsTo(User::class, 'user_id');
    }

}
