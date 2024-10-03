import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const CardContainer = styled.div`
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 20px;
  width: 100%;
  text-align: left;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: ${(props) => props.height || 'auto'};
  box-shadow: rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;
`;

const Middle = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between; 
  align-items: center; 
  border-bottom: 2px dotted var(--darkgrey);
  margin: 8px 0;
`;

const SessionTitle = styled.h4`
  margin: 0;
  font-size: 24px;
  color: var(--blue);
`;

const SessionCount = styled.h2`
  margin: 8px 0;
  font-size: 28px;
  color: var(--darkgrey);
`;

const NewSessions = styled.p`
  font-size: 14px;
  color: ${props => (props.isPositive ? '#10B981' : '#EF4444')};
  margin: 0;
`;

const IconContainer = styled.div`
  align-self: flex-end;
  margin: 8px 0;
  font-size: 30px;
  color: var(--secondary-background);
  background: var(--blue);
  border-radius: 50%;
  padding: 20px;
`;

const SmallCard = ({ title, count, icon, newSessionsText, isPositive, height}) => (
  <CardContainer height= {height} >
    <SessionTitle>{title}</SessionTitle>
    <Middle>
      <SessionCount>{count}</SessionCount>
      <IconContainer>
        <FontAwesomeIcon icon={icon} />
      </IconContainer>
    </Middle>
    <NewSessions isPositive={isPositive}>{newSessionsText}</NewSessions>
  </CardContainer>
);

export default SmallCard;