<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\http\Controllers\ReportController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::post('register',[UserController::class,'register']);
Route::post('login',[UserController::class,'login']);
Route::post('addReport',[ReportController::class,'addReport']);
Route::get('list',[ReportController::class,'list']);
Route::delete('delete/{id}',[ReportController::class,'delete']);
Route::get('report/{id}',[ReportController::class,'getReport']);
Route::post('updateReport/{id}',[ReportController::class,'updateReport']);
Route::get('search/{key}',[ReportController::class,'search']);