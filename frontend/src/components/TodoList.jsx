import TodoItem from "./TodoItem";
import EditRow from "./EditRow";

export default function TodoList({
  tasks,
  editingId,
  updateToDo,
  updateTaskStatus,
  editToDo,
  deleteToDo,
  SetEditingId,
}) {
  return (
    <>
      <table className="w-full mt-4">
        <tbody>
          {tasks.length ? (
            tasks.map((task) => (
              // <React.Fragment key={task.id}>
              <TodoItem
                key={task.id}
                task={task}
                onEdit={editToDo}
                onDelete={deleteToDo}
                updateTaskStatus={updateTaskStatus}
                isEditing={editingId === task.id}
                EditRowComponent={
                  <EditRow
                    id={task.id}
                    title={task.title}
                    updateToDo={updateToDo}
                    cancelEditing={() => SetEditingId(null)}
                  />
                }
              />
              // </React.Fragment>
            ))
          ) : (
            <tr>
              <td colSpan={3} className="text-center py-4 text-gray-500">
                No task available
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </>
  );
}
