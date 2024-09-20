import { useReducer, useState } from 'react';
import styled from 'styled-components';
import { useContext } from 'react';
import { AuthContext} from '../context/auth-context'
import axios from 'axios'; 
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const StyledContainer= styled.div`
width: 100vw;
height: 100vh;
background-color: var(--primary-background);
margin: 0 auto;
align-content: center;
`

const StyledContainer2= styled.div`
width: 420px;
box-shadow: rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px;
border-radius: 30px;
background: var(--blue);
margin: 0 auto;
align-content: center;
`

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
  background-color: white;
  color: #000000;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bolder;

  &:hover {
    background-color: #c3c5c3;
  }
`;

const StyledSwitch = styled.div`
  text-align: center;
  margin-top: 1rem;
  color: #4caf50;
  text-decoration: none;
  cursor: pointer;
  &:hover {
      text-decoration: underline;
    }
  
`;

// Initial state for the form
const initialState = {
    fname: '',     // First Name
    lname: '',     // Last Name
    email: '',     // Stores the email input value
    password: '',  // Stores the password input value
    errors: {   
      fname: '',
      lname: '',
      email: '',
      password: ''
    }
  };


// Reducer function to handle form state changes and validation
function formReducer(state, action) {
  switch (action.type) {
    case 'SET_INPUT':
      return {
        ...state,
        [action.field]: action.value, // Updates the specific field (fname, lname, email, password)
        errors: {
          ...state.errors,
          [action.field]: '' // Resets the error for that field when user is typing
        }
      };
    case 'SET_ERROR':  // Handles setting validation errors
      return {
        ...state,
        errors: {
          ...state.errors,
          [action.field]: action.error  // Updates error message for the specific field
        }
      };
    case 'RESET_FORM':   // Resets the form to its initial state
      return initialState;
    default:
      return state;
  }
}


const Auth = () => {

  const auth = useContext(AuthContext);
    const [state, dispatch] = useReducer(formReducer, initialState);
    const [isSwitch, setIsSwitch] = useState(true);

    // Validation function
    const validateForm = () => {
      let isValid = true;

      // If Sign Up (show fname and lname fields)
      if (!isSwitch) {
        // Check for first name
        if (!state.fname) {
          dispatch({ type: 'SET_ERROR', field: 'fname', error: 'First name is required' });
          isValid = false;
        }

        // Check for last name
        if (!state.lname) {
          dispatch({ type: 'SET_ERROR', field: 'lname', error: 'Last name is required' });
          isValid = false;
        }
      }

      // Check for valid email
      if (!state.email.includes('@')) {
        dispatch({ type: 'SET_ERROR', field: 'email', error: 'Invalid email address' });
        isValid = false;
      }

      // Check for password length
      if (state.password.length < 6) {
        dispatch({ type: 'SET_ERROR', field: 'password', error: 'Password must be at least 6 characters' });
        isValid = false;
      }

      return isValid;
    };

    const handleInputChange = (e) => {
      dispatch({
        type: 'SET_INPUT',
        field: e.target.name,
        value: e.target.value
      });
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
    
      if (validateForm()) {
        try {
          // If login (isSwitch === true)
          if (isSwitch) {
            const response = await axios.post('https://ghsapartment-8b6109df7c25.herokuapp.com/api/v1/users/login', {
              email: state.email,
              password: state.password
            });
    
            // Extract the token from the response
            const { token, data } = response.data;
    
            // Save the token in localStorage
            localStorage.setItem('token', token);
    
            // Update the auth context
            auth.login();
    
            console.log('Login successful:', data.user);
          }
    
          // If sign-up (isSwitch === false), handle differently
          else {
            const response = await axios.post('https://ghsapartment-8b6109df7c25.herokuapp.com/api/v1/users/signup', {
              fname: state.fname,
              lname: state.lname,
              email: state.email,
              password: state.password,
              passwordConfirm: state.password
            });
    
            // Extract the token from the response
            const { token, data } = response.data;
    
            // Save the token in localStorage
            localStorage.setItem('token', token);
    
            // Update the auth context
            auth.login();
    
            console.log('SignUp successful:', data.user);
          }
    
          // Reset form after successful submission
          dispatch({ type: 'RESET_FORM' });
        } catch (error) {
          // Show toast for error
          if (error.response && error.response.data.message) {
            toast.error(error.response.data.message);
          } else {
            toast.error('Authentication failed. Please try again.');
          }
    
          console.error('Authentication error:', error.response ? error.response.data : error.message);
        }
      }
    };
    

    const handleSwitch = () => {
      setIsSwitch((prevState) => !prevState);
      dispatch({ type: 'RESET_FORM' });
    };


    return (
      <>
      <ToastContainer />
      <StyledContainer>
        <StyledContainer2>
        <StyledForm onSubmit={handleSubmit}>
          {isSwitch ? <h2 style={{ color: "white" }}>Login</h2> : <h2 style={{ color: "white" }}>SignUp</h2>}

          { !isSwitch &&
            <>
            <StyledInput
              type="text"
              name="fname"
              value={state.fname}
              onChange={handleInputChange}
              placeholder="First Name"
              required
            />
            {state.errors.fname && <p style={{ color: 'red' }}>{state.errors.fname}</p>}

            <StyledInput
              type="text"
              name="lname"
              value={state.lname}
              onChange={handleInputChange}
              placeholder="Last Name"
              required
            />
            {state.errors.lname && <p style={{ color: 'red' }}>{state.errors.lname}</p>}
            </>
          }

          <StyledInput
            type="email"
            name="email"
            value={state.email}
            onChange={handleInputChange}
            placeholder="Email"
            required
          />
          {state.errors.email && <p style={{ color: 'red' }}>{state.errors.email}</p>}

          <StyledInput
            type="password"
            name="password"
            value={state.password}
            onChange={handleInputChange}
            placeholder="Password"
            required
          />
          {state.errors.password && <p style={{ color: 'red' }}>{state.errors.password}</p>}

          {isSwitch ? 
          (<><StyledButton type="submit" >Login</StyledButton>
          <StyledSwitch>
          <p style={{ color: "white" }} onClick={handleSwitch}>Dont have an account? Switch to Signup </p>
          </StyledSwitch></>)
          :
          (<><StyledButton type="submit" >SignUp</StyledButton>
              <StyledSwitch>
              <p style={{ color: "white" }} onClick={handleSwitch}>Already have an account? Switch to Login </p>
              </StyledSwitch></>)
          }
        </StyledForm>
        </StyledContainer2>

          
        
      </StyledContainer>
      </>
    );
}

export default Auth;