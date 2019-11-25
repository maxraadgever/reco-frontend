import React, { Component } from "react";
import HeaderBar from "../../shared/Components/HeaderBar/HeaderBar";
import SideBar from "../../shared/Components/Sidebar/Siderbar";
import { Role } from "../../shared/resources/types/types";
import { Switch, Route, Redirect } from "react-router";
import { menus } from "../../shared/resources/text";
import MainContainer from "../../shared/Components/Containers/MainContainer";
import PropertyPage from "../Properties/PropertyPage";
import PropertyDetailPage from "../Properties/PropertyDetailPage";
import PropertyEdit from "../Properties/PropertyEdit";

class DashboardPage extends Component {
  render() {
    return (
      <div>
        <HeaderBar />
        <SideBar type={Role.EMPLOYEE} />
        <main className="content">
          <Switch>
            <Route path="/reco/dashboard">
              <Dashboard />
            </Route>
            <Route path="/reco/properties/edit" component={PropertyEdit} />
            <Route path="/reco/properties/:id" component={PropertyDetailPage} />
            <Route path="/reco/properties">
              <PropertyPage />
            </Route>
            <Route path="/">
              <Redirect to="/reco/dashboard" />
            </Route>
          </Switch>
        </main>
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
