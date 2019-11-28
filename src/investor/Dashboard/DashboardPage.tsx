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
import PropertyDetailPage from "../Properties/PropertyDetailPage";
import { api } from "../../shared/Util/Api";
import "./DashboardPage.scss";

interface IState {
  role?: number;
}

class DashboardPage extends Component<any, IState> {
  constructor(props: any) {
    super(props);
    this.state = {
      role: undefined
    };
  }

  render() {
    try {
      if (this.state.role === undefined) {
        api
          .get("/api/auth/role")
          .then(response => {
            console.log(response.data);
            this.setState({ role: response.data.role });
          })
          .catch(response => {
            console.log(response);
            this.setState({ role: 0 });
          });
      }
    } catch (error) {
      console.error(error);
    }

    let redirect: any = "";
    if (this.state.role && this.state.role != Role.INVESTOR) {
      redirect = <Redirect to="/reco" />;
    }

    return (
      <div>
        {redirect}
        <HeaderBar />
        <SideBar type={Role.INVESTOR} />
        <main className="content">
          <Switch>
            <Route path="/dashboard">
              <Dashboard />
            </Route>
            <Route path="/portfolio">
              <PortfolioPage />
            </Route>
            <Route
              exact
              path="/properties/:id"
              component={PropertyDetailPage}
            />
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
        </main>
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
