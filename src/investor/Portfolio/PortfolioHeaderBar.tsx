import React, { Component } from "react";
import { Grid, Button } from "@material-ui/core";
import "./PortfolioPage.scss";
import { api } from "../../shared/Util/Api";
import { formatEuro } from "../../shared/Util/Util";
import PieChart from "react-minimal-pie-chart";
import DepositModal from "../../shared/Components/Modal/DepositModal";
import { Redirect } from "react-router";
import NumberCard from "../../shared/Components/Items/NumberCard";

interface IProps {}

interface IState {
  balance: number;
  portfolio: number;
  profit: number;
  yield: number;
  depositModalOpen: boolean;
  investor: any;
  redirect: any;
}

class PortfolioHeaderBar extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      balance: 0,
      portfolio: 0,
      profit: 0,
      yield: 0,
      depositModalOpen: false,
      investor: null,
      redirect: null
    };
  }

  componentWillMount() {
    api.get(`/api/investor/balance`).then(response => {
      this.setState({
        balance: response.data.balance || 0,
        portfolio: response.data.portfolio || 0
      });
    });
    api.get(`/api/investor/`).then(response => {
      this.setState({ investor: response.data.investor });
    });
  }

  handleDeposit = () => {
    if (this.state.investor) {
      if (this.state.investor.level !== "NEW") {
        this.setState({ depositModalOpen: true });
      } else {
        this.setState({ redirect: <Redirect to="/settings" /> });
      }
    }
  };

  handleDepositModalClose = () => {
    this.setState({ depositModalOpen: false });
  };

  render() {
    return (
      <Grid container className="" spacing={2}>
        {/* <Grid container item xs={1}>
          <Grid item alignContent="center">
            {this.balancePieChart(this.state.balance, this.state.portfolio)}
          </Grid>
        </Grid> */}
        <Grid alignContent="center" item xs={3}>
          <NumberCard
            value={this.state.balance}
            text="Vrije ruimte"
            type="EUR"
          />
        </Grid>
        <Grid alignContent="center" item xs={3}>
          <NumberCard
            value={this.state.portfolio}
            text="Portefeuille"
            type="EUR"
          />
        </Grid>

        <Grid alignContent="center" item xs={3}>
          <NumberCard
            value={this.state.profit}
            text="Winst vorige periode"
            type="EUR"
          />
        </Grid>

        <Grid alignContent="center" item xs={3}>
          <NumberCard
            value={this.state.yield}
            text="Verwacht Rendement"
            type="EUR"
          />
        </Grid>

        {/* <Grid alignContent="center" item xs={1}>
          <Button color="inherit" onClick={this.handleDeposit}>
            Storten
          </Button>
        </Grid>
        <Grid alignContent="center" item xs={1}>
          <Button color="inherit" onClick={this.handleDeposit}>
            Opnemen
          </Button>
        </Grid> */}
        <DepositModal
          open={this.state.depositModalOpen}
          onClose={this.handleDepositModalClose}
        />
      </Grid>
    );
  }

  balancePieChart = (balance: number, portfolio: number) => {
    if (balance === 0 && portfolio === 0) {
      balance = 0;
      portfolio = 100;
    }

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
