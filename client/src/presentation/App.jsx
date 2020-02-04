import React, { useEffect, useState } from "react";
import styled, {
  css,
  createGlobalStyle,
  ThemeProvider
} from "styled-components";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { MyPage } from "./pages/mypage";
import { theme } from "./theme/theme";
import Login from "./pages/home/login";
import Register from "presentation/pages/home/register";
import { PrivateRoute } from "presentation/components/private-route";
import { AdminRouter } from "presentation/components/admin-router";
import { useAuthDispatch, useAuthState } from "data/context/auth-context";
import { Service } from "@service";
import { MainHeader } from "./pages/home/Header";
import { Bot } from "./pages/home/Header/bot";
import "./App.css";
import { Admin } from "./pages/admin";

function App() {
  const authDispatch = useAuthDispatch();
  const auth = useAuthState();
  const [on, setOn] = useState(false);
  useEffect(() => {
    authDispatch({
      type: "CHANGE",
      value: Service.authService.isLogined()
    });
  }, [authDispatch]);

  const setModal = () => {
    setOn(on === false);
  };

  const closeModal = () => {
    setOn(false);
  };
  return (
    <ThemeProvider theme={theme}>
      <Global></Global>
      <Router>
        <MainHeader onModal={setModal}></MainHeader>
        <Modals on={on}>
          <Bot closeModal={closeModal}></Bot>
        </Modals>
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
            <AdminRouter>
              <Admin />
            </AdminRouter>
          </PrivateRoute>
        </Switch>
      </Router>
    </ThemeProvider>
  );
}

const Modals = styled.section`
  position: absolute;
  background-color: white;
  right: 0px;
  top: 50px;
  z-index: 10;
  box-shadow: 1px 0px 5px grey;
  height: calc(100vh - 50px);
  transition: 300ms;
  ${props => {
    if (props.on) {
      return css`
        width: 100vw;
      `;
    }
    return css`
      width: 0vw;
    `;
  }};
  @media all and (min-width: 721px) {
    display: none;
  }
`;

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
