import React, { Component } from "react";
import MainContainer from "../../shared/Components/Containers/MainContainer";
import { menus } from "../../shared/resources/text";

class PortfolioPage extends Component {
  render() {
    return (
      <MainContainer title={menus.Portfolio}>
        <div>This is the portfolio page</div>
      </MainContainer>
    );
  }
}

export default PortfolioPage;
