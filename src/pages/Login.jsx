import  { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  max-width: 400px;
  margin: 2rem auto;
`;

const StyledInput = styled.input`
  padding: 0.75rem;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const StyledButton = styled.button`
  padding: 0.75rem;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #45a049;
  }
`;

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Add your login logic here, e.g., fetch request to your backend
    try {
      const response = await fetch('https://your-api-url/api/v1/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      if (data.token) {
        // Save JWT to local storage and navigate to the dashboard
        localStorage.setItem('token', data.token);
        navigate('/');
      } else {
        alert('Login failed, please try again');
      }
    } catch (error) {
      console.error('Error logging in:', error);
    }
  };

  return (
    <StyledForm onSubmit={handleSubmit}>
      <h2>Login</h2>
      <StyledInput
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <StyledInput
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <StyledButton type="submit">Login</StyledButton>
    </StyledForm>
  );
};

export default Login;