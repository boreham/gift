<?php
 
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\FileUploadController;
 
Route::get('/', function () {
    return view('welcome');
});
 
Route::get('/file-upload', [FileUploadController::class, 'index'])->name('fileupload.index');
Route::post('/multiple-file-upload', [FileUploadController::class, 'multipleUpload'])->name('multiple.fileupload');
