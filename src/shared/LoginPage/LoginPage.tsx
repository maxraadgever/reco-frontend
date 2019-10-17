import React, { Component } from "react";
import Box from "@material-ui/core/Box";
import { Container, TextField, Button, FormGroup } from "@material-ui/core";
import axios from "axios";
import "./LoginPage.scss";
import { Redirect } from "react-router";
import { instanceOf } from "prop-types";
import { withCookies, Cookies } from "react-cookie";

interface IState {
  username: string;
  password: string;
  loggedIn: boolean;
  JwtCookieKey: string;
}

interface IProps {}

class LoginPage extends Component<IProps, IState> {
  static propTypes = {
    cookies: instanceOf(Cookies).isRequired
  };

  constructor(props: any) {
    super(props);
    const { cookies } = props;
    this.state = {
      username: "",
      password: "",
      loggedIn: false,
      JwtCookieKey: cookies.get("JwtCookieKey") || null
    };

    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.submit = this.submit.bind(this);
  }

  onChangeUsername(e: any) {
    this.setState({ username: e.target.value });
  }

  onChangePassword(e: any) {
    this.setState({ password: e.target.value });
  }

  submit() {
    if (this.state.username == null || this.state.username === "") {
      return;
    }
    if (this.state.password == null || this.state.password === "") {
      return;
    }
    axios
      .post("/api/auth/login", {
        email: this.state.username,
        password: this.state.password
      })
      .then(response => {
        console.log(response.headers);
        if (response.data == "") {
          this.setState({ password: "", loggedIn: true });
        }
      });
  }

  render() {
    let redirect;
    if (this.state.loggedIn === true || this.state.JwtCookieKey !== null) {
      redirect = <Redirect to="/" />;
    }

    return (
      <Box>
        {redirect}
        <Box className="bg"></Box>
        <Container className="loginContainer center">
          <Container maxWidth="sm" className="loginForm">
            <FormGroup>
              <TextField
                id="username"
                label="E-mail"
                type="mail"
                required
                onChange={this.onChangeUsername}
              />
              <TextField
                id="password"
                label="Wachtwoord"
                type="password"
                required
                onChange={this.onChangePassword}
              />
              <Button color="primary" type="submit" onClick={this.submit}>
                Login
              </Button>
            </FormGroup>
          </Container>
        </Container>
      </Box>
    );
  }
}

export default withCookies(LoginPage);
