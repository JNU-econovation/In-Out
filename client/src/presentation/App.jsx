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
import "./App.css";

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
      <MainHeader></MainHeader>
      <Router>
        <Switch>
          <Route path="/login">
            <Login></Login>
          </Route>
          <PrivateRoute path="/register" auth={auth}>
            <Register></Register>
          </PrivateRoute>
          <PrivateRoute path="/my" auth={auth}>
            <MyPage />
          </PrivateRoute>
          <PrivateRoute path="/admin" auth={auth}></PrivateRoute>
        </Switch>
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
