import styled from 'styled-components';





const StyledCard = styled.div`
  margin: 0;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  border-radius: 6px;
  padding: 1rem;
  overflow: hidden;
  background: white;
  
`;

const Card2 = ({ className, style, children }) => {
  return (
    <StyledCard className={className} style={style}>
      {children}
    </StyledCard>
  );
};



export default Card2;