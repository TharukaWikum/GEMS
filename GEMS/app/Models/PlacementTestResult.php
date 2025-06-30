<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PlacementTestResult extends Model
{
    use HasFactory;

    protected $fillable = [
        'placement_test_id', 'student_id',
        'writing_score', 'writing_comment',
        'speaking_score', 'speaking_comment',
        'listening_score', 'listening_comment',
        'reading_score', 'reading_comment',
        'final_score', 'final_comment',
    ];

    public function test()
    {
        return $this->belongsTo(PlacementTest::class, 'placement_test_id');
    }

    public function student()
    {
        return $this->belongsTo(Student::class);
    }

    public function placementTest()
{
    return $this->belongsTo(\App\Models\PlacementTest::class);
}
}