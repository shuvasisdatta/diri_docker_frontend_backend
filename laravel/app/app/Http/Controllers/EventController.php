<?php

namespace App\Http\Controllers;

use App\Event;
use Illuminate\Http\Request;

class EventController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $events = Event::with('user')->orderBy('created_at', 'desc')->get();

        return $events;
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
            'user_id' => 'required|numeric|exists:users,id',
            'title'  => 'required|string|max:191',
            'description'  => 'required|string',
            'location'  => 'required|string',
            'time'  => 'required',
        ]);

        $event = Event::create([
            'user_id'  => $request->user_id,
            'title'  => $request->title,
            'description'  => $request->description,  
            'location'  => $request->location, 
            'time'  => $request->time,   
        ]); 

        return response()->json($event, 201);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Event  $event
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $event = Event::with('user')->find($id);
        if(!is_null($event)) return response()->json($event, 200);
        return response()->json('Not Found', 404);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Event  $event
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $event = Event::findOrFail($id);

        $this->validate($request, [
            'user_id' => 'required|numeric|exists:users,id',
            'title'  => 'required|string|max:191',
            'description'  => 'required|string',
            'location'  => 'required|string',
            'time'  => 'required',
        ]);

        $event->user_id  = $request->user_id;
        $event->title = $request->title;
        $event->description = $request->description;  
        $event->location = $request->location;  
        $event->time = $request->time;  

        $event->save();
        return  response()->json($event, 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Event  $event
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $event = Event::find($id);
        if(!is_null($event)) {
            $event->delete();
            return response()->json(null, 204);
        }

        return response()->json('Not Found', 404);
    }
}
