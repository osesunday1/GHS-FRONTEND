import ReactDOM from 'react-dom';
import styled from 'styled-components';

// Define the styled-component
const StyledBackdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background: rgba(0, 0, 0, 0.75);
  z-index: 10;
`;

const Backdrop = ({ closeDrawerHandler }) => {
  return ReactDOM.createPortal(
    <StyledBackdrop onClick={closeDrawerHandler}></StyledBackdrop>,
    document.getElementById('backdrop-hook')
  );
};

export default Backdrop;