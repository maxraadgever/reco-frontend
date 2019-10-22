import React, { Component } from "react";
import MainContainer from "../../shared/Components/Containers/MainContainer";
import { menus } from "../../shared/resources/text";

class PropertyPage extends Component {
  render() {
    return (
      <MainContainer title={menus.Properties}>
        <div>This is the property page</div>
      </MainContainer>
    );
  }
}

export default PropertyPage;
