<?php

namespace App\Http\Controllers;

use App\News;
use Illuminate\Http\Request;

class NewsController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $news = News::with('user')->orderBy('created_at', 'desc')->get();

        return $news;
    }

    /**
     * Store a newly created resource in storage.get
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $this->validate($request, [
            'user_id' => 'required|numeric|exists:users,id',
            'title'  => 'required|string|max:191',
            'description'  => 'required|string',
        ]);

        $news = News::create([
            'user_id'  => $request->user_id,
            'title'  => $request->title,
            'description'  => $request->description,    
        ]); 

        return response()->json($news, 201);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\News  $news
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $news = News::find($id);
        if(!is_null($news)) return response()->json($news, 200);
        return response()->json('Not Found', 404);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\News  $news
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $news = News::findOrFail($id);
        
        $this->validate($request, [
            'user_id' => 'required|numeric|exists:users,id',
            'title'  => 'required|string|max:191',
            'description'  => 'required|string',
        ]);
        
        $news->user_id  = $request->user_id;
        $news->title = $request->title;
        $news->description = $request->description;   
        try {
            $news->save();
            return  response()->json($news, 200);
        } catch (Throwable $e) {
            report($e);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\News  $news
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $news = News::find($id);
        if(!is_null($news)) {
            $news->delete();
            return response()->json(null, 204);
        }

        return response()->json('Not Found', 404);
    }
}
