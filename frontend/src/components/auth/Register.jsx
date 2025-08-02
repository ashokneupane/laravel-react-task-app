import { Formik, Form, Field, ErrorMessage } from "formik";
import { registerUser } from "../../api";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import NavBar from "../common/NavBar";
import axios from "axios";

export default function Register() {
  const navigate = useNavigate();

  return (
    <>
      <NavBar />
      <section className="flex h-screen items-center justify-center">
        <div className="w-full max-w-md rounded-xl bg-white p-8 shadow-md">
          <h1 className="mb-6 text-center text-3xl font-bold text-blue-500">
            Register Form
          </h1>
          <ToastContainer />

          <Formik
            initialValues={{
              email: "",
              password: "",
              password_confirmation: "",
              name: "",
            }}
            validate={(values) => {
              const errors = {};
              if (!values.name) {
                errors.name = "Name is required";
              }
              if (!values.email) {
                errors.email = "Email is required";
              } else if (
                !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
              ) {
                errors.email = "Invalid email address";
              }

              if (!values.password) {
                errors.password = "Password is required";
              }
              if (!values.password_confirmation) {
                errors.password_confirmation = "Retype Password is required";
              } else if (values.password != values.password_confirmation) {
                errors.password_confirmation =
                  "Password and Retype Password should match";
              }
              return errors;
            }}
            onSubmit={(values, { setSubmitting }) => {
              axios.get("http://localhost:8000/sanctum/csrf-cookie", {
                withCredentials: true,
              });
              registerUser(values)
                .then(() => {
                  toast("User Register successfully!");
                  setSubmitting(false);
                  navigate("/login");
                })
                .catch((error) => {
                  if (error.response && error.response.status === 422) {
                    const errors = error.response.data.errors;
                    console.log(errors);
                  }
                });
            }}
          >
            {({ isSubmitting }) => (
              <Form>
                <div className="mb-4">
                  <label className="mb-1 block text-left">Name</label>
                  <Field
                    type="name"
                    className="w-full rounded-md border border-gray-300 p-2"
                    placeholder="e.g. John"
                    name="name"
                  />
                  <ErrorMessage name="name">
                    {(msg) => (
                      <div className="text-left text-red-500 text-sm mt-1">
                        {msg}
                      </div>
                    )}
                  </ErrorMessage>
                </div>

                <div className="mb-4">
                  <label className="mb-1 block text-left">Email</label>
                  <Field
                    type="email"
                    className="w-full rounded-md border border-gray-300 p-2"
                    placeholder="email@gmail.com"
                    name="email"
                  />
                  <ErrorMessage name="email">
                    {(msg) => (
                      <div className="text-left text-red-500 text-sm mt-1">
                        {msg}
                      </div>
                    )}
                  </ErrorMessage>
                </div>
                <div className="mb-4">
                  <label className="mb-1 block text-left">Password</label>
                  <Field
                    type="password"
                    className="w-full rounded-md border border-gray-300 p-2"
                    placeholder="********"
                    name="password"
                  />
                  <ErrorMessage name="password">
                    {(msg) => (
                      <div className="text-left text-red-500 text-sm mt-1">
                        {msg}
                      </div>
                    )}
                  </ErrorMessage>
                </div>
                <div className="mb-6">
                  <label className="mb-1 block text-left">
                    Retype Password
                  </label>
                  <Field
                    type="password"
                    className="w-full rounded-md border border-gray-300 p-2"
                    placeholder="********"
                    name="password_confirmation"
                  />
                  <ErrorMessage name="password_confirmation">
                    {(msg) => (
                      <div className="text-left text-red-500 text-sm mt-1">
                        {msg}
                      </div>
                    )}
                  </ErrorMessage>
                </div>
                <button
                  type="submit"
                  className="w-full button border rounded-md border-blue-300 py-1.5 bg-blue-500 text-white hover:bg-blue-700 mb-5"
                  disabled={isSubmitting}
                >
                  Register
                </button>
              </Form>
            )}
          </Formik>
          <p className="text-left">
            Already have an account?{" "}
            <a href="/login" className="text-blue-500 hover:underline">
              Login here
            </a>
          </p>
        </div>
      </section>
    </>
  );
}
