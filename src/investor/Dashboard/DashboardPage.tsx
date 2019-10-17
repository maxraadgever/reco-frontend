import React, { Component } from "react";

class DashboardPage extends Component {
  render() {
    console.log(document.cookie);
    return <div style={{ color: "white" }}>this is the investor dashboard</div>;
  }
}

export default DashboardPage;
