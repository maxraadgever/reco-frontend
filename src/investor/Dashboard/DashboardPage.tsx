import React, { Component } from "react";
import SideBar from "../../shared/Components/Sidebar/Siderbar";
import { Role } from "../../shared/resources/types/types";
import HeaderBar from "../../shared/Components/HeaderBar/HeaderBar";
import { Switch, Route, Redirect } from "react-router";
import MainContainer from "../../shared/Components/Containers/MainContainer";
import { menus } from "../../shared/resources/text";
import PortfolioPage from "../Portfolio/PortfolioPage";
import PropertyPage from "../Properties/PropertyPage";
import SettingsPage from "../Settings/SettingsPage";

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
          <Route path="/portfolio">
            <PortfolioPage />
          </Route>
          <Route path="/properties">
            <PropertyPage />
          </Route>
          <Route path="/settings">
            <SettingsPage />
          </Route>
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
