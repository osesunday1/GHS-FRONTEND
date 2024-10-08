import styled from "styled-components";

const StyleSideDrawer = styled.aside`
  height: 100%;
  width: 100%;
  background: var(--blue4);

  @media (max-width: 768px) {
    display: none;
  }
`;

const SideDrawer = ({children, }) => {
  return (
    <>
      <StyleSideDrawer>
          {children}
      </StyleSideDrawer>
    </>
  );
}

export default SideDrawer;