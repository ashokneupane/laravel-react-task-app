import { useEffect, useState } from "react";
import { Column } from "./Column";
import { DndContext } from "@dnd-kit/core";
import { deleteTask, getTask, updateTaskStatus } from "../../api";
import TaskModal from "./TaskModal";
import { toast, ToastContainer } from "react-toastify";
import NavBar from "../common/NavBar";

const COLUMNS = [
  { id: "TODO", title: "To Do" },
  { id: "IN_PROGRESS", title: "In Progress" },
  { id: "DONE", title: "Done" },
];

export default function DragDrop() {
  const [itemList, setItemList] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);

  function handleTaskModal(task) {
    setSelectedTask(task);
  }

  function closeModal() {
    setSelectedTask(null);
  }

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

  const handleTaskSaved = (updatedTask) => {
    setItemList((prev) =>
      prev.map((task) => (task.id === updatedTask.tempId ? updatedTask : task))
    );
  };

  function deleteToDo(id) {
    deleteTask(id)
      .then(() => {
        setItemList((prevList) => prevList.filter((item) => item.id !== id));
        closeModal();
        toast("Task Deleted successfully!");
      })
      .catch((error) => {
        console.error("Failed to delete tasks:", error);
      });
  }

  return (
    <>
      <NavBar />

      <div className="p-6">
        {/* Title */}
        <div className="flex justify-center">
          <h1 className="mb-6 text-3xl font-bold text-blue-500">
            Kanban Board
          </h1>
        </div>

        <ToastContainer />

        {/* Columns */}
        <div className="flex justify-center gap-8 overflow-x-auto">
          <DndContext onDragEnd={handleDragEnd}>
            {COLUMNS.map((column) => (
              <Column
                key={column.id}
                column={column}
                onAddTask={handleAddTask}
                onTaskSaved={handleTaskSaved}
                onTaskClick={handleTaskModal}
                tasks={itemList.filter((task) => task.status === column.id)}
              />
            ))}
          </DndContext>
        </div>
      </div>
    </>
  );
}
