import styled from 'styled-components';
import { Link } from 'react-router-dom';

const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: var(--primary-background);
  padding: 1em 2em;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;

  
  @media (max-width: 768px) {
    max-width: 100%;
    }
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  
  img {
    width: 120px;
    height: auto;
  }
`;

const LoginButton = styled.button`
  padding: 0.75em 1.5em;
  background-color: #c22b2b;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1em;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #a92020;
  }
`;

const Header = () => {
  return (
    <HeaderContainer>
      <Logo>
        <Link to="/">
          <img src="./logo2.png" alt="Logo" />
        </Link>
      </Logo>
      <Link to="/auth">
        <LoginButton>Login</LoginButton>
      </Link>
    </HeaderContainer>
  );
};

export default Header;