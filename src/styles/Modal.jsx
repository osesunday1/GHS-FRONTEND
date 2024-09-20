import styled from 'styled-components';

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7); /* Dark background with transparency */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const Content = styled.div`
  background-color: white;
  border-radius: 8px;
  max-width: 900px;
  width: 100%;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

const Header = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background: var(--blue);
  height: 70px; /* or any desired height */
  text-align: center;
  color:var(--white)
`;



const Body = styled.div`
  margin-top: 20px;
  margin-bottom: 20px;
`;

const Footer = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const Title = styled.h2`
  flex-grow: 1;
  text-align: center;
  margin: 0;
`;
const CloseButton = styled.button`
  background: var(--blue);
  border-radius: 10px;
  font-size: 1.2rem;
  cursor: pointer;
  margin-left: auto;
  margin: 10px;
  border: none;
  padding: 10px;
  color:var(--white)
`;

const Modal = ({ show, onClose, title, children }) => {
  if (!show) return null;

  return (
    <Overlay>
      <Content>
        <Header>
          <Title>{title}</Title>
          <CloseButton onClick={onClose}>&times;</CloseButton>
        </Header>
        <Body>{children}</Body>
        <Footer>
          <CloseButton onClick={onClose}>Close</CloseButton>
        </Footer>
      </Content>
    </Overlay>
  );
};

export default Modal;