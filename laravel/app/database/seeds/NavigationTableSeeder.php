<?php

use Illuminate\Database\Seeder;

class NavigationTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $navs = [
            [ 
              'title' =>  'Home',
              'url' => '/',
            ],
            [
                'title' =>  'About',
                'url' => '/about',
            ],
            [ 
                'title' =>  'Contact',
                'url' => '/contact',
            ],
            [ 
                'title' =>  'Admin',
                'url' => '/admin
                ',
            ]
        ];
        
        foreach ($navs as $nav) {
            factory(App\Navigation::class)->create(['title' => $nav['title'], 'url' => $nav['url']]);
        }
    }
}
