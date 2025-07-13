import { Formik, Form, Field, ErrorMessage } from "formik";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { login } from "../../api";
import axios from "axios";
import { useContext } from "react";
import AuthContext from "../../context/AuthContext";
import { Navigate } from "react-router-dom";
import NavBar from "../common/NavBar";

axios.defaults.withCredentials = true;

export default function Login() {
  const navigate = useNavigate();

  const { isAuthenticated, storeLoginUser } = useContext(AuthContext);
  if (isAuthenticated) {
    return <Navigate to="/tasks" replace />;
  }

  return (
    <>
      <NavBar />
      <section className="flex h-screen items-center justify-center">
        <div className="w-full max-w-md rounded-xl bg-white p-8 shadow-md">
          <h1 className="mb-6 text-center text-3xl font-bold text-blue-500">
             Login Form
          </h1>
          <ToastContainer />
          <Formik
            initialValues={{
              email: "",
              password: "",
            }}
            validate={(values) => {
              const errors = {};
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
              return errors;
            }}
            onSubmit={async (values, { setSubmitting, setErrors }) => {
              try {
                await axios.get("http://localhost:8000/sanctum/csrf-cookie"); // Step 1
                const response = await login(values);
                toast("User login Successfully!");
                setSubmitting(false);
                storeLoginUser(response.data.user);
                navigate("/tasks");
              } catch (error) {
                if (error.response && error.response.status === 401) {
                  setErrors({
                    email: error.response.data.message || "Unauthorized access",
                  });
                } else {
                  toast.error("Unexpected error");
                }
              }
            }}
          >
            {({ isSubmitting }) => (
              <Form>
                <div className="mb-4">
                  <label className="mb-1 block text-left">Email</label>
                  <Field
                    name="email"
                    type="email"
                    className="w-full rounded-md border border-gray-300 p-2"
                    placeholder="email@gmail.com"
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
                    name="password"
                    type="password"
                    className="w-full rounded-md border border-gray-300 p-2"
                    placeholder="********"
                  />
                  <ErrorMessage name="password">
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
                  Login
                </button>
              </Form>
            )}
          </Formik>
          <p className="text-left">
            Don’t have an account yet?{" "}
            <a href="/register" className="text-blue-500 hover:underline">
              Sign up here
            </a>
          </p>
        </div>
      </section>
    </>
  );
}
