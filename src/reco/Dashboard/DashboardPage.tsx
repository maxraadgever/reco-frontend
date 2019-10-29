import React, { Component } from "react";
import HeaderBar from "../../shared/Components/HeaderBar/HeaderBar";
import SideBar from "../../shared/Components/Sidebar/Siderbar";
import { Role } from "../../shared/resources/types/types";
import { Switch, Route, Redirect } from "react-router";
import { menus } from "../../shared/resources/text";
import MainContainer from "../../shared/Components/Containers/MainContainer";

class DashboardPage extends Component {
  render() {
    return (
      <div>
        <HeaderBar />
        <SideBar type={Role.EMPLOYEE} />
        <Switch>
          <Route path="/reco/dashboard">
            <Dashboard />
          </Route>
          <Route path="/">
            <Redirect to="/reco/dashboard" />
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
        <div>This is a RECO dashboard</div>
      </MainContainer>
    );
  }
}
export default DashboardPage;
