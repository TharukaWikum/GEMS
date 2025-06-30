<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PlacementTest extends Model
{
    use HasFactory;

    protected $fillable = ['title', 'status', 'test_date'];

    public function results()
    {
        return $this->hasMany(PlacementTestResult::class);
    }
}
