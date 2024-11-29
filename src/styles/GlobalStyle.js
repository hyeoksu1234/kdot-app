import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  :root {
    --primary-color: #FF7B28;
    --text-primary: #1c1c1e;
    --text-secondary: #8e8e93;
    --background-color: #ffffff;
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  body {
    font-family: 'Noto Sans KR', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    color: var(--text-primary);
    background-color: var(--background-color);
  }

  a {
    color: inherit;
    text-decoration: none;
  }
`;

export default GlobalStyle;
