import { createContext, useReducer, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Create the AuthContext
const AuthContext = createContext();

// Reducer function to manage authentication state
const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        isAuthenticated: true,
      };
    case 'LOGOUT':
      return {
        ...state,
        user: null,
        token: null,
        isAuthenticated: false,
      };
    default:
      return state;
  }
};

// Initial state for the auth context
const initialState = {
  user: null,
  token: null,
  isAuthenticated: false,
};

// AuthProvider component to wrap the app
export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);
  const [loading, setLoading] = useState(true); // Track the loading state
  const navigate = useNavigate();

  // Save token to localStorage on login
  useEffect(() => {
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user'));
    if (token && user) {
      dispatch({
        type: 'LOGIN',
        payload: { token, user },
      });
    }
    setLoading(false); // Indicate that loading is done
  }, []);

  // Login function to set user and token
  const login = (user, token) => {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    dispatch({
      type: 'LOGIN',
      payload: { user, token },
    });
    navigate('/dashboard');
  };

  // Logout function to clear the token and user
  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    dispatch({ type: 'LOGOUT' });
    navigate('/login');
  };

  if (loading) {
    return <div>Loading...</div>; // Or a spinner, to avoid rendering before checking auth state
  }

  return (
    <AuthContext.Provider value={{ ...state, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the AuthContext
export const useAuth = () => useContext(AuthContext);