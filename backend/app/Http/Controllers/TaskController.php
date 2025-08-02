<?php

namespace App\Http\Controllers;

use App\Models\Task;
use App\Http\Requests\StoreTaskRequest;
use App\Http\Requests\UpdateTaskRequest;
use Illuminate\Http\Request;

class TaskController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = Task::query()->where('user_id',auth()->id());

        if ($request->has('filter_status')) {
            $status = (int) $request->query(key: 'filter_status');

        // Ensure status is either 0 or 1
        if (in_array($status, [0, 1])) {
            $query->where('is_completed', $status);
        }
    }

    $tasks = $query->get();
     // Return them in a JSON payload
    return response()->json([
        'tasks' => $tasks,
    ], 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreTaskRequest $request)
    {
        $request->merge(['is_completed' => false, 'user_id' => auth()->id()]);
        $task = Task::create($request->only(['title','is_completed','user_id', 'status']));
        return response()->json([
            'message' => 'Task Created Successfully',
            'task' => $task,
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Task $task)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateTaskRequest $request, Task $task)
    {
            $task->update($request->all());
            return response()->json([
            'message' => 'Task Updated Successfully',
            'task' => $task,
            ], 200);
            
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Task $task)
    {
            $task->delete();
            return response()->json([
            'message' => 'Task Deleted Successfully',
            ], 200);
    }

    public function changeStatus(UpdateTaskRequest $request, Task $task)
    {
        if($task){
            $task->update($request->only(['status']));
             return response()->json([
            'message' => 'Task Status Changed Successfully',
            'task' => $task,
            ], 200);
        }
        return response()->json(['message' => 'Task not found'], 404);
}
}
