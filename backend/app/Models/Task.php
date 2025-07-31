<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Laravel\Sanctum\HasApiTokens;

class Task extends Model
{
    /** @use HasFactory<\Database\Factories\TaskFactory> */
    use HasFactory, HasApiTokens;

    protected $fillable =[
        'title',
        'status',
        'user_id',
        'description',
        'due_date',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
