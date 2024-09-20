import styled from "styled-components";

const StyleSideDrawer= styled.aside`
    height: 100%;
    width: 100%;
    background: var(--primary-background);

    

`

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