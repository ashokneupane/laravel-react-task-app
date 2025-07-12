import { useEffect, useState, useContext } from "react";
import TodoInput from "./TodoInput";
import FilterTab from "./FilterTab";
import TodoList from "./TodoList";
import { ToastContainer, toast } from "react-toastify";
import {
  getTask,
  createTask,
  updateTask,
  deleteTask,
  updateTaskStatus,
} from "../api";
import AuthContext from "../context/AuthContext";

export function TodoForm() {
  const [item, setItem] = useState("");

  const [itemList, setItemList] = useState([]);

  const [status, setStatus] = useState("all");

  const [error, setError] = useState("");

  // const isAuthenticated = useContext(AuthContext);
  // if (!isAuthenticated) {
  //   return <Navigate to="/login" replace />;
  // }

  useEffect(() => {
    getTask(status)
      .then((response) => {
        setItemList(response.data.tasks);
        console.log(response);
      })
      .catch((error) => {
        console.error("Failed to fetch tasks:", error);
      });
  }, [status]);

  function addItem() {
    createTask(item)
      .then((response) => {
        setItemList([...itemList, response.data.task]);
        toast("Task added successfully!");
        setItem("");
      })
      .catch((error) => {
        if (error.response && error.response.status === 422) {
          const errors = error.response.data.errors;
          setError(errors.title[0]);
        }
      });
  }

  function getValue(e) {
    setItem(e.target.value);
    setError("");
  }

  const updateStatus = async (taskId) => {
    try {
      const response = await updateTaskStatus(taskId);

      // ✅ Step 2: Update React state
      if (response.status === 200) {
        setItemList((prevList) =>
          prevList.map((task) =>
            task.id === taskId
              ? { ...task, is_completed: !task.is_completed }
              : task
          )
        );
        toast("Task updated successfully!");
      }
    } catch (error) {
      console.error("Failed to update task:", error);
    }
  };

  function deleteToDo(id) {
    deleteTask(id)
      .then(() => {
        setItemList((prevList) => prevList.filter((item) => item.id !== id));
        toast("Task Deleted successfully!");
      })
      .catch((error) => {
        console.error("Failed to delete tasks:", error);
      });
  }

  const filterList = itemList.filter((item) => {
    if (status == "pending") return !item.is_completed;
    if (status == "completed") return item.is_completed;
    return true;
  });

  const [editingId, SetEditingId] = useState(null);
  const [editingText, SetEditingText] = useState("");

  function editToDo(id, title) {
    SetEditingId(id);
    SetEditingText(title);
  }

  function updateToDo(id, title) {
    updateTask(id, title)
      .then((response) => {
        const updatedTask = response.data.task;
        setItemList((prevList) =>
          prevList.map((item) =>
            item.id === updatedTask.id ? updatedTask : item
          )
        );
      })
      .catch((error) => {
        if (error.response && error.response.status === 422) {
          const errors = error.response.data.errors;
          setError(errors.title[0]);
        }
      });
    SetEditingId(null);
  }

  return (
    <section class="flex h-screen items-center justify-center">
      <div class="w-full max-w-md rounded-xl bg-white p-8 shadow-md">
        <h1 class="mb-6 text-center text-3xl font-bold text-blue-500">
          To Do App
        </h1>
        <h2 class="mb-4 text-center text-2xl font-semibold">To Do List</h2>

        <ToastContainer />

        <TodoInput
          item={item}
          onChange={getValue}
          onClick={addItem}
          error={error}
        />

        <FilterTab status={status} setStatus={setStatus} />

        <TodoList
          tasks={filterList}
          editingId={editingId}
          updateToDo={updateToDo}
          updateTaskStatus={updateStatus}
          editToDo={editToDo}
          deleteToDo={deleteToDo}
          SetEditingId={SetEditingId}
        />
      </div>
    </section>
  );
}
