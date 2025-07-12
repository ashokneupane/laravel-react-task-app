<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Auth;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Validator;

class LoginController extends Controller
{
    public function login(Request $request):JsonResponse
    { 
        $validator = Validator::make($request->all(), [
            'email' => 'required|email',
            'password' => 'required',
        ]);
   
        if($validator->fails()){
            return response()->json(['message' => 'Validation Error','error' => $validator->errors()]);
        }

        if (!Auth::attempt($request->only('email', 'password'))) {
        return response()->json([
            'message' => 'Invalid credentials',
        ], 401);
    }


    // Auth success: return the user (or success message)
    return response()->json([
        'message' => 'Logged in successfully',
        'user' => Auth::user()
    ]);
    }
}
