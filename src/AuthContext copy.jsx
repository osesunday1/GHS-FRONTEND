import { createContext, useReducer, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import jwtDecode from 'jwt-decode'; // Optional to decode the token and check expiration

const AuthContext = createContext();

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

const initialState = {
  user: null,
  token: null,
  isAuthenticated: false,
};

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Check if token is still valid
  const isTokenValid = (token) => {
    try {
      const decodedToken = jwtDecode(token); // decode the token to get its expiry
      return decodedToken.exp * 1000 > Date.now(); // check if token is still valid
    } catch (error) {
      return false; // If there's an error decoding the token, consider it invalid
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user'));

    // Ensure the token exists and is valid
    if (token && user && isTokenValid(token)) {
      dispatch({
        type: 'LOGIN',
        payload: { token, user },
      });
    } else {
      // If token is invalid or doesn't exist, ensure the user is logged out
      dispatch({ type: 'LOGOUT' });
    }
    setLoading(false);
  }, []);

  const login = (user, token) => {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    dispatch({
      type: 'LOGIN',
      payload: { user, token },
    });
    navigate('/dashboard');
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    dispatch({ type: 'LOGOUT' });
    navigate('/login');
  };

  if (loading) {
    return <div>Loading...</div>; // Or a spinner
  }

  return (
    <AuthContext.Provider value={{ ...state, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);