import React, { useEffect } from "react";
import { createGlobalStyle, ThemeProvider } from "styled-components";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { MyPage } from "./pages/mypage";
import { theme } from "./theme/theme";
import Login from "./pages/home/login";
import Register from "presentation/pages/home/register";
import { PrivateRoute } from "presentation/components/private-route";
import { useAuthDispatch, useAuthState } from "data/context/auth-context";
import { Service } from "@service";
import { MainHeader } from "./pages/home/Header";
import { Bot } from "./pages/home/Header/bot";
import "./App.css";
import { Admin } from "./pages/admin";

function App() {
  const authDispatch = useAuthDispatch();
  const auth = useAuthState();
  useEffect(() => {
    authDispatch({
      type: "CHANGE",
      value: Service.authService.isLogined()
    });
  }, [authDispatch]);

  return (
    <ThemeProvider theme={theme}>
      <Global></Global>
      <Router>
        <MainHeader></MainHeader>
        <Switch>
          <Route path="/login">
            <Login></Login>
          </Route>
          <PrivateRoute exact path="/" auth={auth}>
            <Register></Register>
          </PrivateRoute>
          <PrivateRoute exact path="/mypage" auth={auth}>
            <MyPage />
          </PrivateRoute>
          <PrivateRoute exact path="/admin" auth={auth}>
            <Admin />
          </PrivateRoute>
        </Switch>

        {auth ? <Bot></Bot> : null}
      </Router>
    </ThemeProvider>
  );
}

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

export default App;
