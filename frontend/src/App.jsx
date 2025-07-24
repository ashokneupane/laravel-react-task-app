import "./App.css";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import PrivateRoute from "./components/PrivateRoute";
import { TodoForm } from "./components/TodoForm";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import DragDrop from "./components/dndkit/DragDrop";

function App() {
  return (
    <>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route
              path="/"
              element={
                <PrivateRoute>
                  <TodoForm />
                </PrivateRoute>
              }
            ></Route>
            <Route path="/register" element={<Register />}></Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/drag-drop" element={<DragDrop />}></Route>

            <Route
              path="/tasks"
              element={
                <PrivateRoute>
                  <TodoForm />
                </PrivateRoute>
              }
            ></Route>
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </>
  );
}

export default App;
