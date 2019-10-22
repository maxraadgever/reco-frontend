// App.jsx
import React, { Component } from "react";
import { instanceOf } from "prop-types";
import { withCookies, Cookies } from "react-cookie";
import { Redirect, Route, Switch } from "react-router";
import { BrowserRouter } from "react-router-dom";
import LoginPage from "./shared/LoginPage/LoginPage";
import DashboardPage from "./investor/Dashboard/DashboardPage";
import RegisterPage from "./shared/RegisterPage/RegisterPage";
import Axios from "axios";

interface IState {
  JwtCookieKey: string;
}

interface IProps {}

class App extends Component<IProps, IState> {
  static propTypes = {
    cookies: instanceOf(Cookies).isRequired
  };

  constructor(props: any) {
    super(props);

    const { cookies } = props;
    this.state = {
      JwtCookieKey: cookies.get("JwtCookieKey") || null
    };
  }

  componentWillMount() {
    Axios.defaults.withCredentials = true;
    Axios.defaults.baseURL = process.env.REACT_APP_API_URL;
  }

  routes() {
    return (
      <Switch>
        <Route path="/login">
          <LoginPage />
        </Route>
        <Route path="/register">
          <RegisterPage />
        </Route>
        <Route path="/">
          <DashboardPage />
        </Route>
      </Switch>
    );
  }

  checkLoggedIn() {
    const { JwtCookieKey } = this.state;

    //@ts-ignore
    if (
      !JwtCookieKey &&
      (window.location.pathname !== "/login" &&
        window.location.pathname !== "/register")
    ) {
      return <Redirect to="/login" />;
    }
  }

  render() {
    return (
      <div className="App">
        <BrowserRouter>
          {this.routes()} {this.checkLoggedIn()}
        </BrowserRouter>
      </div>
    );
  }
}

export default withCookies(App);
