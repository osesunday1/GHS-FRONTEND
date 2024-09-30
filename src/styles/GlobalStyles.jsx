import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  :root {
    --primary-background: #edf2f7; // white
    --secondary-background: #d2dbe6; // light grey
    --blue: #0085db; // blue
    --white: #ffffff;
    --black: #000000;
    --darkgrey: #585555;
    --blackColor: #0b0c10 ;
    --blueText: #66FCF1;
    --blueText2: #d2e9e7;
    --blueText3: #abe6e1;
    --blue4:#1F2833;
    --whiteColor: #ffffff;
    --greyColor: #C5C6C7;
    --greyColor2: #999b9c;
  }

  body {
    background-color: var(--primary-background);
    color: var(--black-color);
    font-family: Arial, Helvetica, sans-serif;
    margin: 0;
    padding: 0;
  }

  a {
    color: var(--accent);
    text-decoration: none;
  }

  a:hover {
    text-decoration: underline;
  }

  /* Add other global styles here */
`;


export default GlobalStyles;