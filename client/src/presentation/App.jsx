import React, { Fragment } from "react";
import { createGlobalStyle, ThemeProvider } from "styled-components";
import { MyPage } from "./pages/mypage";
import { theme } from "./theme/theme";
import Login from "./pages/home/login";
function App() {
  const Global = createGlobalStyle`
  html{
    box-sizing: border-box;
  }
    body{
      margin: 0px;
    }

    #root{
      width: 100vw;
    }
  `;
  return (
    <Fragment>
      <ThemeProvider theme={theme}>
        <Global></Global>
        <Login />
      </ThemeProvider>
    </Fragment>
  );
}

export default App;
