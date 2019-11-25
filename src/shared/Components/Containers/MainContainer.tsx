import React, { Component } from "react";
import {
  Container,
  Box,
  Breadcrumbs,
  Link,
  Typography
} from "@material-ui/core";
import "./container.scss";

interface IProps {
  title?: string;
  children?: any;
  className?: any;
  breadCrumbs?: { text: string; link: string }[];
  breadCrumb?: string;
  noStyle?: boolean;
}

interface IState {}

class MainContainer extends Component<IProps, IState> {
  render() {
    let breadCrumbs = (
      <Typography className="breadCrumb" color="textPrimary">
        {this.props.title}
      </Typography>
    );
    if (this.props.breadCrumbs && this.props.breadCrumb) {
      breadCrumbs = (
        <Breadcrumbs className="breadCrumb" aria-label="breadcrumb">
          {this.props.breadCrumbs.map(
            (breadCrumb: { text: string; link: string }) => {
              return (
                <Link color="inherit" href={breadCrumb.link}>
                  {breadCrumb.text}
                </Link>
              );
            }
          )}
          <Typography color="textPrimary">{this.props.breadCrumb}</Typography>
        </Breadcrumbs>
      );
    }

    let classNames = "mainContainer";
    classNames += this.props.noStyle ? " noStyle" : "";

    return (
      <Box component="span" m={1} className={this.props.className}>
        <Container maxWidth="xl" className={classNames}>
          {breadCrumbs}
          <Typography color="textPrimary" variant="h4" gutterBottom>
            {this.props.title}
          </Typography>
          {this.props.children}
        </Container>
      </Box>
    );
  }
}

export default MainContainer;
