import { useEffect, useState } from "react";
import { useDraggable } from "@dnd-kit/core";
import { createTask } from "../../api";
import { toast } from "react-toastify";

function useDebounce(value, delay = 1000) {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const handler = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(handler);
  }, [value, delay]);

  return debounced;
}

export function TaskCard({ task, column, onTaskSaved, onTaskClick }) {
  const [isEditing, setIsEditing] = useState(!task.title);
  const [title, setTitle] = useState(task.title || "");

  const {
    attributes,
    listeners,
    setNodeRef,
    setActivatorNodeRef,
    transform,
    isDragging,
  } = useDraggable({
    id: task.id,
  });

  const style = {
    ...(transform && {
      transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      zIndex: 50,
    }),
  };

  const debouncedTitle = useDebounce(title, 1000);

  useEffect(() => {
    if (debouncedTitle.trim() !== "" && task.title === "") {
      createTask(debouncedTitle, column.id).then((response) => {
        const savedTask = {
          ...response.data.task,
          tempId: task.id,
        };
        onTaskSaved(savedTask);
        toast("Task added successfully!");
        setTitle("");
      });
    }
  }, [debouncedTitle]);

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`select-none rounded-xl bg-gray-400 border border-gray-200 p-2 shadow-sm transition-shadow duration-200 
        hover:shadow-md 
        ${isDragging ? "opacity-70 shadow-lg" : ""}`}
    >
      <div className="flex justify-between items-start gap-2">
        {/* Drag Handle */}
        {!isEditing && (
          <div
            ref={setActivatorNodeRef}
            {...listeners}
            {...attributes}
            onClick={(e) => e.stopPropagation()}
            title="Drag"
            className="text-gray-700 cursor-grab hover:text-black text-lg px-1"
          >
            <b>⋮⋮</b>
          </div>
        )}

        {/* Title or Input */}
        <div
          className={`flex-1 ${!isEditing ? "cursor-pointer" : "cursor-text"}`}
          onClick={() => !isEditing && onTaskClick(task)}
        >
          {isEditing ? (
            <input
              autoFocus
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Task title"
              className="w-full truncate text-base font-semibold text-gray-800 text-left border-none focus:outline-none rounded"
              onClick={(e) => e.stopPropagation()}
              onMouseDown={(e) => e.stopPropagation()}
            />
          ) : (
            <h3 className="text-base font-semibold text-gray-800 text-left">
              {title}
            </h3>
          )}
        </div>
      </div>
    </div>
  );
}
