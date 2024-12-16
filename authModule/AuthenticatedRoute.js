import React, { useContext } from 'react';
import { AuthContext } from './AuthProvider';
import { Navigate } from 'react-router-dom';

export default function AuthenticatedRoute({ children }) {
  const { user } = useContext(AuthContext);

  // If the user is authenticated, render the children
  if (user) {
    return <>{children}</>;
  }

  // If not authenticated, redirect to the login page
  return <Navigate to="/login" replace />;
}
