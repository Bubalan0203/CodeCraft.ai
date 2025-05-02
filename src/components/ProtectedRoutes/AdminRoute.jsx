import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const AdminRoute = ({ children }) => {
  const { user, loading, isAdmin } = useAuth();

  if (loading) return <p className="text-center mt-5">Loading...</p>;
  if (!user || !isAdmin) return <Navigate to="/" replace />;

  return children;
};

export default AdminRoute;
