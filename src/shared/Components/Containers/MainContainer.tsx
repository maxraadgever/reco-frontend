import React, { Component } from "react";
import { Container, Box } from "@material-ui/core";
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
      <Box component="span" m={1}>
        <Container maxWidth="lg" className="mainContainer">
          <ContainerHeader>{this.props.title}</ContainerHeader>
          {this.props.children}
        </Container>
      </Box>
    );
  }
}

export default MainContainer;
