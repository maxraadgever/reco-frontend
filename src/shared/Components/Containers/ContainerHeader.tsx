import React, { Component } from "react";
import { Typography } from "@material-ui/core";
import "./container.scss";

class ContainerHeader extends Component {
  render() {
    return (
      <Typography className="header" variant="h3" component="h3">
        {this.props.children}
      </Typography>
    );
  }
}

export default ContainerHeader;
