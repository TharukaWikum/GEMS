<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Student extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id', 'dob', 'gender', 'nationality', 'nic', 
        'identification_document', 'preferred_course', 
        'payment_method', 'payment_receipt', 'student_status'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
