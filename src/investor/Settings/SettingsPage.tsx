import React, { Component } from "react";
import MainContainer from "../../shared/Components/Containers/MainContainer";
import { menus } from "../../shared/resources/text";
import { api } from "../../shared/Util/Api";
import { Grid, Typography, Button } from "@material-ui/core";
import AccountHeaderBar from "./AccountHeaderBar";
import Moment from "react-moment";

interface IProps {}

interface IState {
  investor: any;
  redirect: any;
}

class SettingsPage extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      redirect: "",
      investor: {}
    };
  }

  onIDFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    console.log(files);
    if (files) {
      for (let i = 0; i < files.length; i++) {
        console.log(files[i]);
        const response = await api.sendFile(
          `/api/investor/${this.state.investor.id}/iddocument`,
          files[i]
        );
      }
    }
  };
  startBankCheck = async () => {
    const response = await api.get(
      `/api/investor/${this.state.investor.id}/startbankcheck`
    );

    console.log(response);
    window.open(response.data.checkoutUrl);
  };

  componentWillMount() {
    api.get("/api/investor").then(response => {
      this.setState({
        investor: response.data.investor
      });
    });
  }

  render() {
    let uploadText = "Upload";
    let bankCheckText = "Start controle";
    let extraButtonProps: any = {};
    if (this.state.investor && this.state.investor.level !== "NEW") {
      uploadText = "Goedgekeurd";
      bankCheckText = "Goedgekeurd";
      extraButtonProps.disabled = true;
    }

    return (
      <MainContainer noStyle>
        {this.state.redirect}
        <Grid container>
          <Grid container item xs={12}>
            <AccountHeaderBar investor={this.state.investor} />
          </Grid>

          <Grid className="mainContent" container item xs={6}>
            <Grid item xs={12}>
              <Typography color="textPrimary" variant="h6" gutterBottom>
                Account
              </Typography>
            </Grid>
            <Grid item xs={3}>
              Voornaam:
            </Grid>
            <Grid item xs={9}>
              {this.state.investor.firstName}
            </Grid>
            <Grid item xs={3}>
              Tussenvoegsel:
            </Grid>
            <Grid item xs={9}>
              {this.state.investor.subName}
            </Grid>

            <Grid item xs={3}>
              Achternaam:
            </Grid>
            <Grid item xs={9}>
              {this.state.investor.lastName}
            </Grid>
            <Grid item xs={3}>
              E-mailadres
            </Grid>
            <Grid item xs={9}>
              {this.state.investor.lastName}
            </Grid>
            <Grid item xs={3}>
              Geboortedatum
            </Grid>
            <Grid item xs={9}>
              <Moment format="DD/MM/YYYY">
                {this.state.investor.dateOfBirth}
              </Moment>
            </Grid>
          </Grid>
          <Grid className="mainContent" container item xs={6}>
            <Grid item xs={12}>
              <Typography color="textPrimary" variant="h6" gutterBottom>
                Verificatie
              </Typography>
            </Grid>
            <Grid item xs={6}>
              Legitimatie bewijs:
            </Grid>
            <Grid item xs={6}>
              <input
                accept="image/*"
                className="inputName"
                style={{ display: "none" }}
                id="raised-button-file"
                multiple
                type="file"
                onChange={this.onIDFileUpload}
              />
              <label htmlFor="raised-button-file">
                <Button
                  component="span"
                  className="uploadButton"
                  variant="contained"
                  color="primary"
                  fullWidth
                  {...extraButtonProps}
                >
                  {uploadText}
                </Button>
              </label>
            </Grid>
            <Grid item xs={6}>
              Bank rekening controle:
            </Grid>
            <Grid item xs={6}>
              <Button
                component="span"
                className="uploadButton"
                variant="contained"
                color="primary"
                onClick={this.startBankCheck}
                {...extraButtonProps}
              >
                {bankCheckText}
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </MainContainer>
    );
  }
}

export default SettingsPage;
