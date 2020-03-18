
import reset from 'styled-reset';
import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  ${reset}
  /* other styles */
  * {
    box-sizing: border-box;
  }
  body {
    font-family: -apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif
  }
  a {
    color: inherit;
    text-decoration: none;
  }
  input,
  button {
    &:focus,
    &:active{outline: none}
  }
`;

export default GlobalStyle;