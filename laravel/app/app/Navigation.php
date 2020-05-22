<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Navigation extends Model
{
    protected $fillable = [
        'parent_id', 'title', 'url',
    ];

    public function parent() {
        return $this->belongsTo(self::class, 'parent_id');
    }

    public function childrens() {
        return $this->hasMany(self::class, 'parent_id','id');
    }
}
