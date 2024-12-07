// ProtectedRoute.jsx
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

// eslint-disable-next-line react/prop-types
const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  const navigate = useNavigate();

  if (!user) {
    navigate("/");
    return null;
  }

  return children;
};

export default ProtectedRoute;
