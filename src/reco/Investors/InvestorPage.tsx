import React, { Component } from "react";
import MainContainer from "../../shared/Components/Containers/MainContainer";
import { Grid, Typography, Button } from "@material-ui/core";
import BasicTable from "../../shared/Components/Table/BasicTable";
import { formatName } from "../../shared/Util/Util";
import { api } from "../../shared/Util/Api";
import VerifyModal from "./VerifyModal";
interface IProps {}

interface IState {
  investors: any[];
  investor: number;
  openVerifyModal: boolean;
  newInvestors: any[];
  redirect: any;
}
class InvestorPage extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      redirect: "",
      newInvestors: [],
      investors: [],
      investor: 0,
      openVerifyModal: false
    };
  }

  openVerifyModal = (investorId: any) => {
    this.setState({ openVerifyModal: true, investor: investorId });
  };
  closeVerifyModal = () => {
    console.log("CLOSE");
    this.setState({ openVerifyModal: false, investor: 0 });
    this.componentWillMount();
  };

  componentWillMount() {
    api.get("/api/investor/new").then(response => {
      this.setState({
        newInvestors: response.data.investors
      });
    });
    api.get("/api/investor/verified").then(response => {
      this.setState({
        investors: response.data.investors
      });
    });
  }

  render() {
    return (
      <MainContainer title={"Accounts"}>
        {this.state.redirect}
        <VerifyModal
          open={this.state.openVerifyModal}
          investorId={this.state.investor}
          onClose={this.closeVerifyModal}
        />
        <Grid container>
          <Grid item xs={12}>
            <Typography color="textPrimary" variant="h6" gutterBottom>
              Nieuwe accounts
            </Typography>
            <BasicTable
              columns={[
                {
                  name: "Naam",
                  attr: "firtName",
                  render: (attr, data) => {
                    return formatName(
                      data.firstName,
                      data.lastName,
                      data.subName
                    );
                  }
                },
                {
                  name: "Aangemaakt",
                  attr: "createdDate"
                },
                {
                  name: "",
                  attr: "id",
                  render: attr => {
                    return (
                      <Button
                        className="actionButtons"
                        variant="contained"
                        color="primary"
                        onClick={() => {
                          this.openVerifyModal(attr);
                        }}
                      >
                        Verfifieer
                      </Button>
                    );
                  }
                }
              ]}
              data={this.state.newInvestors}
            />
          </Grid>
          <Grid item xs={12}>
            <Typography color="textPrimary" variant="h6" gutterBottom>
              Afgehandelde accounts
            </Typography>
            <BasicTable
              columns={[
                {
                  name: "Naam",
                  attr: "firtName",
                  render: (attr, data) => {
                    return formatName(
                      data.firstName,
                      data.lastName,
                      data.subName
                    );
                  }
                },
                {
                  name: "Aangemaakt",
                  attr: "createdDate"
                },
                {
                  name: "",
                  attr: "id",
                  render: attr => {
                    return (
                      <Button
                        className="actionButtons"
                        variant="contained"
                        onClick={() => {
                          this.openVerifyModal(attr);
                        }}
                      >
                        Bekijk
                      </Button>
                    );
                  }
                }
              ]}
              data={this.state.investors}
            />
          </Grid>
        </Grid>
      </MainContainer>
    );
  }
}

export default InvestorPage;
