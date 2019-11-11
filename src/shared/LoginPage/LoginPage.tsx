import React, { Component } from "react";
import Box from "@material-ui/core/Box";
import {
  Container,
  TextField,
  Button,
  FormGroup,
  Link
} from "@material-ui/core";
import "./LoginPage.scss";
import { Redirect } from "react-router";
import { instanceOf } from "prop-types";
import { withCookies, Cookies } from "react-cookie";
import logo from "../resources/img/reco.png";
import { errors } from "../resources/text";
import { colors } from "../resources/styles";
import { api } from "../Util/Api";

interface IState {
  username: string;
  password: string;
  loggedIn: boolean;
  JwtCookieKey: string;
  redirect: string;
  error: string;
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
      JwtCookieKey: cookies.get("JwtCookieKey") || null,
      redirect: "",
      error: ""
    };

    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.submit = this.submit.bind(this);
    this.register = this.register.bind(this);
  }

  onChangeUsername(e: any) {
    this.setState({ username: e.target.value });
  }

  onChangePassword(e: any) {
    this.setState({ password: e.target.value });
  }

  submit() {
    if (this.state.username == null || this.state.username === "") {
      this.setState({ error: errors.requiredFields });
      return;
    }
    if (this.state.password == null || this.state.password === "") {
      this.setState({ error: errors.requiredFields });
      return;
    }
    api
      .post("/api/auth/login", {
        email: this.state.username,
        password: this.state.password
      })
      .then(response => {
        if (response.status === 200 && response.data === "") {
          this.setState({ password: "", loggedIn: true });
        }
      })
      .catch(err => {
        this.setState({ error: errors.invalidCredentials });
      });
  }

  register() {
    this.setState({ redirect: "/register" });
  }

  render() {
    let redirect;
    if (this.state.loggedIn === true || this.state.JwtCookieKey !== null) {
      redirect = <Redirect to="/" />;
    }
    if (this.state.redirect !== null && this.state.redirect !== "") {
      redirect = <Redirect to={this.state.redirect} />;
    }

    return (
      <Box>
        {redirect}
        <Box className="bg-black"></Box>
        <Box className="bg"></Box>
        <Container className="loginContainer center">
          <Container
            maxWidth="sm"
            className="center loginForm"
            style={{ justifyContent: "center" }}
          >
            <div className="logoHolder">
              <img src={logo} className="center logo" alt="RECO Investing" />
            </div>
            <div className="error" style={{ color: colors.errorRed }}>
              {this.state.error}
            </div>
            <FormGroup>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="email"
                label="E-mail"
                name="email"
                autoComplete="email"
                autoFocus
                onChange={this.onChangeUsername}
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                label="Wachtwoord"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={this.onChangePassword}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className="submit"
                onClick={this.submit}
              >
                Inloggen
              </Button>
              <Link
                href="/register"
                className="register"
                style={{ width: "100%", textAlign: "center" }}
              >
                Registreren
              </Link>
              <Link
                href="https://www.recoinvesting.nl"
                style={{ width: "100%", textAlign: "center" }}
              >
                Meer informatie?
              </Link>
            </FormGroup>
          </Container>
        </Container>
      </Box>
    );
  }
}

export default withCookies(LoginPage);
