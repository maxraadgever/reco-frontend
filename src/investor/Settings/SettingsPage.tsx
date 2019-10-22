import React, { Component } from "react";
import MainContainer from "../../shared/Components/Containers/MainContainer";
import { menus } from "../../shared/resources/text";

class SettingsPage extends Component {
  render() {
    return (
      <MainContainer title={menus.Settings}>
        <div>This is the Settings page</div>
      </MainContainer>
    );
  }
}

export default SettingsPage;
