<?php
 
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ProjectController;
 
Route::get('/', function () {
    return view('projects');
});
  
Route::apiResource('projects', ProjectController::class);