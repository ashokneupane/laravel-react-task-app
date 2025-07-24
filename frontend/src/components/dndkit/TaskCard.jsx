import { useState } from "react";
import { useDraggable } from "@dnd-kit/core";

export function TaskCard({ task, onUpdate }) {
  const [isEditing, setIsEditing] = useState(!task.title); // auto-edit if empty
  const [title, setTitle] = useState(task.title || "");

  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      id: task.id,
    });

  const style = {
    ...(transform && {
      transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      zIndex: 50,
    }),
    cursor: isDragging ? "grabbing" : "grab",
  };

  const handleSave = () => {
    setIsEditing(false);
    onUpdate({ ...task, title });
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      // Only add drag attributes/listeners if not editing
      {...(!isEditing ? listeners : {})}
      {...(!isEditing ? attributes : {})}
      className={`select-none rounded-xl bg-gray-400 border border-gray-200 p-2 shadow-sm transition-shadow duration-200 
        hover:shadow-md 
        ${isDragging ? "opacity-70 shadow-lg" : ""}
        ${!title ? "border-dashed border-2 border-blue-300" : ""}`}
    >
      {isEditing ? (
          <input
            autoFocus
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Task title"
            className="text-sm border rounded px-2 py-1 w-full"
            onClick={(e) => e.stopPropagation()}
            onMouseDown={(e) => e.stopPropagation()} // 🛑 prevent drag
          />
      ) : (
        <>
          <h3 className="text-base font-semibold text-gray-800 text-left">
            {title || <span className="text-gray-400 italic">Untitled Task</span>}
          </h3>
        </>
      )}
    </div>
  );
}
