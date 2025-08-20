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
  console.log(task);
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
            <>
              {" "}
              <h3 className="text-base font-semibold text-gray-800 text-left">
                {title}
              </h3>
              {task.status != "DONE" && (
                <div className="mt-2 flex justify-end">
                  {(() => {
                    const today = new Date();
                    const due = new Date(task.due_date ?? today);
                    const diffDays = Math.floor(
                      (due.setHours(0, 0, 0, 0) - today.setHours(0, 0, 0, 0)) /
                        (1000 * 60 * 60 * 24)
                    );

                    let text = "";
                    let classes = "";

                    if (diffDays === 0) {
                      text = "Due today";
                      classes = "bg-amber-50 text-amber-700 ring-amber-200";
                    } else if (diffDays > 0) {
                      text = `${diffDays} day${
                        diffDays > 1 ? "s" : ""
                      } remaining`;
                      classes =
                        "bg-emerald-50 text-emerald-700 ring-emerald-200";
                    } else {
                      text = `${Math.abs(diffDays)} day${
                        diffDays < -1 ? "s" : ""
                      } ago`;
                      classes = "bg-rose-50 text-rose-700 ring-rose-200";
                    }

                    return (
                      <div
                        className={`inline-flex items-center gap-1 rounded-xl px-2 py-1 text-xs font-medium ring-1 ${classes}`}
                      >
                        <svg
                          viewBox="0 0 20 20"
                          aria-hidden="true"
                          className="h-4 w-4"
                        >
                          <path
                            fill="currentColor"
                            d="M6 2a1 1 0 0 0 0 2h8a1 1 0 1 0 0-2h-1V1h-2v1H9V1H7v1H6zM3 6a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6zm2 2v6h10V8H5z"
                          />
                        </svg>
                        {text}
                      </div>
                    );
                  })()}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
