import { useEffect, useState } from "react";
import { Column } from "./Column";
import { DndContext } from "@dnd-kit/core";
import { getTask, updateTaskStatus } from "../../api";

const COLUMNS = [
  { id: "TODO", title: "To Do" },
  { id: "IN_PROGRESS", title: "In Progress" },
  { id: "DONE", title: "Done" },
];

export default function DragDrop() {
  const [itemList, setItemList] = useState([]);

  useEffect(() => {
    getTask()
      .then((response) => {
        setItemList(response.data.tasks);
      })
      .catch((error) => {
        console.error("Failed to fetch tasks:", error);
      });
  }, []);

  async function handleDragEnd(event) {
    const { active, over } = event;

    if (!over) return;

    const taskId = active.id;
    const newStatus = over.id;

    // Optimistically update UI
    setItemList((prevList) =>
      prevList.map((task) =>
        task.id === taskId ? { ...task, status: newStatus } : task
      )
    );

    try {
      const response = await updateTaskStatus(taskId, newStatus);

      if (response.status !== 200) {
        console.error("Update failed on server. Optionally revert here.");
      }
    } catch (error) {
      console.error("Failed to update task:", error);
    }
  }

  const handleAddTask = (status) => {

  const newTask = {
    id: Date.now().toString(), // unique ID
    title: "",
    description: "",
    status,
  };

  setItemList((prev) => [...prev, newTask]);
};


  return (
    <div className="p-6">
      <h1 className="mb-6 text-center text-3xl font-bold text-blue-500">
        Kanban Board
      </h1>
      <div className="flex gap-8  overflow-x-auto">
        <DndContext onDragEnd={handleDragEnd}>
          {COLUMNS.map((column) => (
            <Column
              key={column.id}
              column={column}
              onAddTask={handleAddTask} 
              tasks={itemList.filter((task) => task.status === column.id)}
            />
          ))}
        </DndContext>
      </div>
    </div>
  );
}
