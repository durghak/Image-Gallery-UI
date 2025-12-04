import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("user_id"); // change the key as per your app

  return token ? children : <Navigate to="/" />;
};

export default ProtectedRoute;
