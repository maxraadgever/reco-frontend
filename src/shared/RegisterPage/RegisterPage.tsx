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
import { DatePicker } from "material-ui";

interface IState {
  firstName: string;
  subName: string;
  lastName: string;
  email: string;
  dateOfBirth: Date;
  password: string;
  registered: boolean;
  redirect: string;
}

interface IProps {}

export default class RegisterPage extends Component<IProps, IState> {
  constructor(props: any) {
    super(props);
    this.state = {
      firstName: "",
      subName: "",
      lastName: "",
      email: "",
      dateOfBirth: new Date(),
      password: "",
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

  onChangePassword(e: any) {
    this.setState({ password: e.target.value });
  }

  submit() {}

  login() {
    this.setState({ redirect: "/login" });
  }

  render() {
    let redirect;
    if (this.state.redirect != null && this.state.redirect != "") {
      redirect = <Redirect to={this.state.redirect} />;
    }
    return (
      <Box>
        {redirect}
        <Box className="bg"></Box>
        <Container className="registerContainer center">
          <Container
            maxWidth="sm"
            className="center registerForm"
            style={{ justifyContent: "center" }}
          >
            <div className="logoHolder">
              <img src={logo} className="center logo" />
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
                onChange={this.onChangePassword}
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                label="Bevestig wachtwoord"
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
