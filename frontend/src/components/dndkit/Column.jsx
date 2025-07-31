import { useDroppable } from "@dnd-kit/core";
import { TaskCard } from "./TaskCard";
import { useState } from "react";

// Define a color map per column
const COLUMN_COLORS = {
  TODO: "bg-red-100",
  IN_PROGRESS: "bg-yellow-100",
  DONE: "bg-green-100",
};

export function Column({ column, tasks, onAddTask, onTaskSaved, onTaskClick }) {
  const { setNodeRef, isOver } = useDroppable({
    id: column.id,
  });

  // Fallback to gray if column ID is unknown
  const baseColor = COLUMN_COLORS[column.id] || "bg-gray-100";

  return (
    <div
      className={`flex w-80 flex-col rounded-2xl shadow-md p-4 transition-all duration-300 ${baseColor}`}
    >
      {/* Column Header */}
      <div className="mb-2">
        <h2 className="text-lg font-bold text-gray-800">{column.title}</h2>
      </div>

      {/* Task List */}
      <div
        ref={setNodeRef}
        className={`flex flex-1 flex-col gap-3 p-2 rounded-lg transition-colors duration-200 ${
          isOver ? "bg-blue-100" : "bg-white"
        }`}
      >
        {tasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            column={column}
            onTaskSaved={onTaskSaved}
            onTaskClick={onTaskClick}
          />
        ))}
      </div>
      <div className="mt-4">
        <button
          type="button"
          onClick={() => onAddTask(column.id)}
          className="w-full rounded-md bg-blue-500 px-3 py-2 text-sm font-semibold text-white shadow hover:bg-blue-600 transition-colors duration-200"
        >
          + Add Task
        </button>
      </div>
    </div>
  );
}
