<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Navigation;
use Faker\Generator as Faker;

$factory->define(Navigation::class, function (Faker $faker) {
    return [
        'title' => $faker->title,
        'url' => $faker->url,
    ];
});
