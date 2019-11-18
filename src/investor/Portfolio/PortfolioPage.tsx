import React, { Component } from "react";
import MainContainer from "../../shared/Components/Containers/MainContainer";
import { menus, propertyInfo } from "../../shared/resources/text";
import { Grid, Typography } from "@material-ui/core";
import "./PortfolioPage.scss";
import PortfolioHeaderBar from "./PortfolioHeaderBar";
import BasicTable, {
  ColumnTypes
} from "../../shared/Components/Table/BasicTable";
import { api } from "../../shared/Util/Api";

interface IProps {}

interface IState {
  portfolio: [any?];
  redirect: any;
}

class PortfolioPage extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      redirect: "",
      portfolio: []
    };
  }

  componentWillMount() {
    api.get("/api/investor/portfolio").then(response => {
      this.setState({
        portfolio: response.data.portfolio
      });
    });
  }

  render() {
    return (
      <MainContainer noStyle>
        {this.state.redirect}
        <Grid container>
          <Grid container item xs={12}>
            <PortfolioHeaderBar />
          </Grid>
          <Grid className="mainContent" item xs={12}>
            <Typography color="textPrimary" variant="h6" gutterBottom>
              Open postities
            </Typography>
            <BasicTable
              columns={[
                {
                  name: "Naam",
                  attr: "name"
                },
                {
                  name: "Type",
                  attr: "type",
                  render: attr =>
                    propertyInfo.propertyType(
                      attr as "BUNGALOW" | "VILA" | "OTHER"
                    )
                },
                {
                  name: "Positie",
                  attr: "total",
                  type: ColumnTypes.Euro
                },
                {
                  name: "Rendement",
                  attr: "yield",
                  type: ColumnTypes.Euro
                },
                {
                  name: "Winst / Verlies",
                  attr: "profitLoss",
                  type: ColumnTypes.Euro
                }
              ]}
              data={this.state.portfolio}
            />
          </Grid>

          <Grid item xs={12}>
            Hier komt een tabel
          </Grid>
        </Grid>
      </MainContainer>
    );
  }
}

export default PortfolioPage;
