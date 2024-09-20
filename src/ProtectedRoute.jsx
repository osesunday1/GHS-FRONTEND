import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

// ProtectedRoute component to guard authenticated routes
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoute;