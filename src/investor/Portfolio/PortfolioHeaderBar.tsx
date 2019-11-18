import React, { Component } from "react";
import { Grid } from "@material-ui/core";
import "./PortfolioPage.scss";
import { api } from "../../shared/Util/Api";
import { formatEuro } from "../../shared/Util/Util";
import PieChart from "react-minimal-pie-chart";

interface IProps {}

interface IState {
  balance: number;
  portfolio: number;
  profit: number;
  yield: number;
}

class PortfolioHeaderBar extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      balance: 0,
      portfolio: 0,
      profit: 0,
      yield: 0
    };
  }

  componentWillMount() {
    api.get(`/api/investor/balance`).then(response => {
      this.setState({
        balance: response.data.balance || 0,
        portfolio: response.data.portfolio || 0
      });
    });
  }

  render() {
    return (
      <Grid container className="headerBar">
        <Grid container item xs={2}>
          <Grid item>
            {this.balancePieChart(this.state.balance, this.state.portfolio)}
          </Grid>
        </Grid>
        <Grid container item xs={4}>
          <Grid alignContent="center" item xs={6}>
            Vrije ruimte:
          </Grid>
          <Grid alignContent="center" item xs={6}>
            € {formatEuro(this.state.balance)}
          </Grid>
          <Grid alignContent="center" item xs={6}>
            Portefeuille:
          </Grid>
          <Grid alignContent="center" item xs={6}>
            € {formatEuro(this.state.portfolio)}
          </Grid>
        </Grid>
        <Grid container item xs={4}>
          <Grid alignContent="center" item xs={6}>
            Winst vorige periode:
          </Grid>
          <Grid alignContent="center" item xs={6}>
            € {formatEuro(this.state.profit)}
          </Grid>
          <Grid alignContent="center" item xs={6}>
            Verwacht Rendement:
          </Grid>
          <Grid alignContent="center" item xs={6}>
            € {formatEuro(this.state.yield)}
          </Grid>
        </Grid>
      </Grid>
    );
  }

  balancePieChart = (balance: number, portfolio: number) => {
    return (
      <PieChart
        animate={false}
        cx={50}
        cy={50}
        data={[
          {
            color: "#BCE0FD",
            title: "Balans",
            value: balance
          },
          {
            color: "#2699FB",
            title: "Portefeuille",
            value: portfolio
          }
        ]}
        lineWidth={100}
        radius={50}
        ratio={1}
        style={{
          height: "80px"
        }}
      />
    );
  };
}

export default PortfolioHeaderBar;
