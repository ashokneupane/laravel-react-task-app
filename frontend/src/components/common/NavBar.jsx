import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../context/AuthContext";

export default function NavBar() {
  const navigate = useNavigate();
  const { isAuthenticated, authUser, logout } = useContext(AuthContext);

  return (
    <nav className="bg-gray-100 shadow p-4">
      <div className="max-w-screen-xl mx-auto flex justify-between items-center">
        {/* Left Side - Title */}
        <button onClick={() => navigate("/")}>
          <h1 className="text-xl font-bold text-blue-500">To Do App</h1>
        </button>

        {/* Right Side - Auth Buttons */}
        {!isAuthenticated ? (
          <div className="flex items-center space-x-5">
            <button
              onClick={() => navigate("/login")}
              className="text-blue-500 hover:underline"
            >
              Login
            </button>
            <button
              onClick={() => navigate("/register")}
              className="text-blue-500 hover:underline"
            >
              Register
            </button>
          </div>
        ) : (
          <div className="flex items-center space-x-4">
            <span className="text-gray-700 font-medium">
              Welcome, {authUser?.name}
            </span>
            <button
              onClick={logout}
              className="text-red-600 hover:underline"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}
