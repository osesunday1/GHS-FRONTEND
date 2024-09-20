import styled from "styled-components";


const StyledHeader = styled.header`
    width: 100%;
    height: 4rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    top: 0;
    left: 0;
    padding: 10px 0rem 10px 0rem;

    @media (max-width: 768px) {
      justify-content:baseline;
  }
`




const MainHeader = ({children}) => {
    return (
      <StyledHeader >
          {children}
      </StyledHeader>
    );
  }
  
  export default MainHeader;