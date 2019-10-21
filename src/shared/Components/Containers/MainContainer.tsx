import React, { Component } from "react";
import { Container } from "@material-ui/core";
import "./container.scss";
import ContainerHeader from "./ContainerHeader";

interface IProps {
  title: string;
  children?: any;
}

interface IState {}

class MainContainer extends Component<IProps, IState> {
  render() {
    return (
      <Container className="mainContainer">
        <ContainerHeader>{this.props.title}</ContainerHeader>
        {this.props.children}
      </Container>
    );
  }
}

export default MainContainer;
