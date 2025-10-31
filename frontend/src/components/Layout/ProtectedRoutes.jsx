import { useSelector } from "react-redux";
import React from "react";

import { Navigate } from "react-router-dom";
import NotFound from "../../pages/NotFound";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useSelector((state) => state.auth);
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  return children;
};
const AdminProtectedRoute = ({ children }) => {
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  if (!isAuthenticated) {
    // Not logged in → redirect to login
    return <Navigate to="/login" replace />;
  }

  if (user?.role !== "admin") {
    // Logged in but not admin → redirect home or show "403 Forbidden"
    return <NotFound />;
  }

  return children;
};

export { ProtectedRoute, AdminProtectedRoute };
