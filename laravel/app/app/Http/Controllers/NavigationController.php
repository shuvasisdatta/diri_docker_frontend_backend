<?php

namespace App\Http\Controllers;

use App\Navigation;
use Illuminate\Http\Request;

class NavigationController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $navs = Navigation::with('parent', 'childrens')->orderBy('parent_id', 'desc')->orderBy('title', 'asc')->get();

        return $navs;
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $this->validate($request, [
            'parent_id' => 'nullable',
            'title'  => 'required|string|max:191',
            'url'  => 'required|string|max:191|unique:navigations',
        ]);

        $nav = Navigation::create([
            'parent_id'  => $request->parent_id,
            'title'  => $request->title,
            'url'  => $request->url,    
        ]); 

        return response()->json($nav, 201);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Navigation  $navigation
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $nav = Navigation::find($id);
        if(!is_null($nav)) return response()->json($nav, 200);
        return response()->json('Not Found', 404);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Navigation  $navigation
     * @return \Illuminate\Http\Response
     */
    // public function update(Request $request, Navigation $navigation)
    public function update(Request $request, $id)
    {
        $nav = Navigation::findOrFail($id);
        
        $this->validate($request, [
            'parent_id' => 'nullable',
            'title'  => 'required|string|max:191',
            'url'  => 'required|string|max:191|unique:navigations,url,'.$nav->id,
        ]);
        
        $nav->parent_id  = $request->parent_id;
        $nav->title = $request->title;
        $nav->url = $request->url;   
        try {
            $nav->save();
            return  response()->json($nav, 200);
        } catch (Throwable $eh) {
            report($e);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Navigation  $navigation
     * @return \Illuminate\Http\Response
     */
    // public function destroy(Navigation $navigation)
    public function destroy($id)
    {
        $nav = Navigation::find($id);
        if(!is_null($nav)) {
            $nav->delete();
            return response()->json(null, 204);
        }

        return response()->json('Not Found', 404);
    }
}
