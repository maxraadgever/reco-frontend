import React, { Component } from "react";
import { Grid } from "@material-ui/core";
import "./SettingsPage.scss";

interface IProps {
  investor: any;
}

interface IState {}
class AccountHeaderBar extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {};
  }

  render() {
    let name = "";

    if (
      this.props.investor.firstName !== undefined &&
      this.props.investor.lastName != undefined
    ) {
      let sub =
        this.props.investor.subName !== undefined
          ? " " + this.props.investor.subName + " "
          : " ";
      name = this.props.investor.firstName + sub + this.props.investor.lastName;
    }

    return (
      <Grid container className="headerBar">
        <Grid item xs={6}>
          {name}
        </Grid>
        <Grid item xs={6}>
          Status:{" "}
          {this.props.investor.level && this.props.investor.level === "NEW"
            ? "Nieuw"
            : "Geverifieerd"}
        </Grid>
      </Grid>
    );
  }
}

export default AccountHeaderBar;
