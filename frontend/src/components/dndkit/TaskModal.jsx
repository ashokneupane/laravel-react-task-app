import { Form, Field, Formik, ErrorMessage } from "formik";
import { updateTask } from "../../api";
import { toast } from "react-toastify";

export default function TaskModal({ task, onClose, onTaskUpdate, onDelete }) {
  if (!task) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="flex flex-col items-start bg-white p-6 rounded-lg w-full max-w-md shadow-lg relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-black"
        >
          ✖
        </button>
        <h2 className="text-2xl font-bold mb-4">{task.title}</h2>
        <Formik
          initialValues={{
            id: task.id,
            status: task.status,
            description: task.description,
            due_date: task.due_date
              ? task.due_date
              : new Date().toLocaleDateString("en-CA"),
          }}
          validate={(values) => {
            const errors = {};
            if (!values.status) {
              errors.status = "Status is required";
            }
            if (values.due_date) {
              if (values.due_date < new Date().toLocaleDateString("en-CA")) {
                errors.due_date = "Due date cannot be less than today's date";
              }
            }
            return errors;
          }}
          onSubmit={async (values) => {
            try {
              const response = await updateTask(values);
              if (response.status === 200) {
                onClose();
                const upatedTask = {
                  ...response.data.task,
                  tempId: values.id,
                };
                onTaskUpdate(upatedTask);
                toast("Task updated successfully!");
              }
            } catch (error) {
              console.error("Failed to update task:", error);
            }
          }}
        >
          {({ isSubmitting, initialValues }) => (
            <Form className="w-full">
              <div className="mb-4">
                <label className="font-semibold mb-1 block text-left">
                  Status
                </label>
                <Field
                  name="status"
                  as="select"
                  className="w-full rounded-md border border-gray-300 p-2"
                >
                  <option value="">Select Status</option>
                  <option value="TODO">To Do</option>
                  <option value="IN_PROGRESS">In Progress</option>
                  <option value="DONE">Done</option>
                </Field>
                <ErrorMessage name="status">
                  {(msg) => (
                    <div className="text-left text-red-500 text-sm mt-1">
                      {msg}
                    </div>
                  )}
                </ErrorMessage>
              </div>

              <div className="mb-4">
                <label className="font-semibold mb-1 block text-left">
                  Description
                </label>
                <Field
                  name="description"
                  as="textarea"
                  className="w-full rounded-md border border-gray-300 p-2"
                />
                <ErrorMessage name="description">
                  {(msg) => (
                    <div className="text-left text-red-500 text-sm mt-1">
                      {msg}
                    </div>
                  )}
                </ErrorMessage>
              </div>

              <div className="mb-4">
                <label className="font-semibold mb-1 block text-left">
                  Due Date
                </label>
                <Field
                  name="due_date"
                  type="date"
                  className="w-full rounded-md border border-gray-300 p-2"
                />
                <ErrorMessage name="due_date">
                  {(msg) => (
                    <div className="text-left text-red-500 text-sm mt-1">
                      {msg}
                    </div>
                  )}
                </ErrorMessage>
              </div>
              <div className="space-x-4">
                <button
                  type="submit"
                  className="button border rounded-md border-blue-300 py-1 px-8 bg-blue-500 text-white hover:bg-blue-700"
                  disabled={isSubmitting}
                >
                  Save
                </button>
                <button
                  type="submit"
                  className="button border rounded-md border-red-300 py-1 px-8 bg-red-500 text-white hover:bg-red-700"
                  onClick={() => onDelete(initialValues.id)}
                >
                  Delete
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
