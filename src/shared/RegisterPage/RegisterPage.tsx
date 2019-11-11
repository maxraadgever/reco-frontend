import React, { Component } from "react";
import {
  Box,
  Container,
  FormGroup,
  TextField,
  Button,
  Link
} from "@material-ui/core";
import "./RegisterPage.scss";
import logo from "../resources/img/reco.png";
import { Redirect } from "react-router";
import { errors } from "../resources/text";
import { colors } from "../resources/styles";
import { api } from "../Util/Api";

interface IState {
  error: string;
  firstName: string;
  subName: string;
  lastName: string;
  email: string;
  dateOfBirth: Date;
  password: string;
  passwordConfirm: string;
  registered: boolean;
  redirect: string;
}

interface IProps {}

export default class RegisterPage extends Component<IProps, IState> {
  constructor(props: any) {
    super(props);
    this.state = {
      error: "",
      firstName: "",
      subName: "",
      lastName: "",
      email: "",
      dateOfBirth: new Date(),
      password: "",
      passwordConfirm: "",
      registered: false,
      redirect: ""
    };

    this.handleChange = this.handleChange.bind(this);
    this.submit = this.submit.bind(this);
    this.login = this.login.bind(this);
  }

  handleChange(e: any) {
    const { name, value } = e.currentTarget;
    this.setState({
      [name]: value
    } as Pick<IState, keyof IState>);
  }

  submit() {
    if (
      this.state.firstName === "" ||
      this.state.lastName === "" ||
      this.state.email === "" ||
      this.state.password === "" ||
      this.state.passwordConfirm === ""
    ) {
      this.setState({ error: errors.requiredFields });
      return;
    }
    if (this.state.password !== this.state.passwordConfirm) {
      this.setState({ error: errors.passwordsDontMatch });
      return;
    }

    api
      .post("/api/auth/register", {
        firstName: this.state.firstName,
        subName: this.state.subName,
        lastName: this.state.lastName,
        email: this.state.email,
        dateOfBirth: this.state.dateOfBirth,
        password: this.state.password
      })
      .then(response => {
        if (response.status === 200 && response.data === "") {
          this.setState({ redirect: "/login" });
        } else {
          this.setState({ error: errors.emailInUse });
        }
      })
      .catch(err => {
        this.setState({ error: errors.somethingHappened });
      });
  }

  login() {
    this.setState({ redirect: "/login" });
  }

  render() {
    let redirect;
    if (this.state.redirect !== null && this.state.redirect !== "") {
      redirect = <Redirect to={this.state.redirect} />;
    }
    return (
      <Box>
        {redirect}
        <Box className="bg-black"></Box>
        <Box className="bg"></Box>
        <Container className="registerContainer center">
          <Container
            maxWidth="sm"
            className="center registerForm"
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
                id="firstName"
                label="Voornaam"
                name="firstName"
                autoComplete="firstName"
                autoFocus
                onChange={this.handleChange}
              />
              <TextField
                variant="outlined"
                margin="normal"
                id="subName"
                label="Tussenvoegsel"
                name="subName"
                autoComplete="subName"
                onChange={this.handleChange}
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                id="lastName"
                label="Achternaam"
                name="lastName"
                autoComplete="lastName"
                onChange={this.handleChange}
              />
              <TextField
                id="date"
                variant="outlined"
                label="Geboortedatum"
                type="date"
                name="dateOfBirth"
                defaultValue="1999-01-01"
                className="dateOfBirth"
                InputLabelProps={{
                  shrink: true
                }}
                style={{ marginTop: "5px" }}
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                onChange={this.handleChange}
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
                onChange={this.handleChange}
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="passwordConfirm"
                label="Bevestig wachtwoord"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={this.handleChange}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className="submit"
                onClick={this.submit}
              >
                Registreren
              </Button>
              <Link
                href="/login"
                className="login"
                style={{ width: "100%", textAlign: "center" }}
              >
                Inloggen
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
