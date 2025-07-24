<?php

use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\Auth\RegisterController;
use App\Http\Controllers\TaskController;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
});

Route::post("register",[RegisterController::class, 'register']);
Route::post("login",[LoginController::class, 'login']);


Route::apiResource('task',controller: TaskController::class)->middleware('auth:sanctum');

Route::post('/task/change_status/{task}', [TaskController::class, 'changeStatus'])->middleware('auth:sanctum');
Route::get('/task/filter_status/{task}', [TaskController::class, 'filterStatus'])->middleware('auth:sanctum');