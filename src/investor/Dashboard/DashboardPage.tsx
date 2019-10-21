import React, { Component } from "react";
import SideBar from "../../shared/Components/Sidebar/Siderbar";
import { Role } from "../../shared/resources/types/types";
import HeaderBar from "../../shared/Components/HeaderBar/HeaderBar";
import { Switch, Route, Redirect } from "react-router";
import MainContainer from "../../shared/Components/Containers/MainContainer";
import { menus } from "../../shared/resources/text";

class DashboardPage extends Component {
  render() {
    return (
      <div>
        <HeaderBar />
        <SideBar type={Role.INVESTOR} />
        <Switch>
          <Route path="/dashboard">
            <Dashboard />
          </Route>
          <Route path="/portfolio"></Route>
          <Route path="/properties"></Route>
          <Route path="/">
            <Redirect to="/dashboard" />
          </Route>
        </Switch>
      </div>
    );
  }
}

class Dashboard extends Component {
  render() {
    return (
      <MainContainer title={menus.Dashboard}>
        <div>This is a dashboard</div>
      </MainContainer>
    );
  }
}

export default DashboardPage;
