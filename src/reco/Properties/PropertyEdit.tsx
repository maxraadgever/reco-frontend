import React, { Component } from "react";
import MainContainer from "../../shared/Components/Containers/MainContainer";
import { menus } from "../../shared/resources/text";
import { Stepper, Grid, Step, StepLabel, Button } from "@material-ui/core";
import { IProperty } from "../../shared/resources/entities/Property";
import PropertyDetailForm from "./PropertyDetailForm";
import PropertyFinancialForm from "./PropertyFinancialForm";
import PropertyConfirmForm from "./PropertyConfirmForm";
import "./PropertyPage.scss";
import { api } from "../../shared/Util/Api";
import { Redirect } from "react-router";
import { colors } from "../../shared/resources/styles";
import { IPark } from "../../shared/resources/entities/Park";

interface IProps {
  property?: IProperty;
}

interface IState {
  redirect: any;
  activeStep: number;
  property: IProperty;
  currentView: any;
  error: string;
  parks: IPark[];
}

class PropertyEdit extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      redirect: "",
      activeStep: 0,
      property: this.props.property
        ? this.props.property
        : {
            id: 0,
            park: null,
            name: "",
            houseNumber: "",
            type: "BUNGALOW"
          },
      currentView: null,
      error: "",
      parks: []
    };
    this.handleNext = this.handleNext.bind(this);
    this.handleBack = this.handleBack.bind(this);
  }

  getSteps() {
    return [menus.steps.properties, menus.steps.financial, menus.steps.confirm];
  }

  getStepContent = (step: number) => {
    switch (step) {
      case 0:
        this.setState({
          currentView: (
            <PropertyDetailForm
              onChange={this.handleChange}
              property={this.state.property}
              parks={this.state.parks}
            />
          )
        });
        break;
      case 1:
        this.setState({
          currentView: (
            <PropertyFinancialForm
              onChange={this.handleChange}
              property={this.state.property}
            />
          )
        });
        break;
      case 2:
        this.setState({
          currentView: (
            <PropertyConfirmForm
              onChange={this.handleChange}
              property={this.state.property}
            />
          )
        });
        break;
      default:
        return "Unknown step";
    }
  };

  handleChange = (name: keyof IProperty, value: any) => {
    let property = this.state.property;
    property[name] = value;
    this.setState({ property });
  };

  handleNext() {
    let step = this.state.activeStep;
    this.setState({
      activeStep: step + 1,
      currentView: this.getStepContent(step + 1)
    });
    if (step + 1 >= this.getSteps().length) {
      api
        .post("/api/properties", { property: this.state.property })
        .then(response => {
          if (response.status === 200 && response.data === "") {
            this.setState({ redirect: "/reco/properties" });
          } else {
            this.setState({ error: response.data });
          }
        });
    }
  }

  handleBack() {
    let step = this.state.activeStep;
    this.setState({
      activeStep: step - 1,
      currentView: this.getStepContent(step - 1)
    });
  }

  componentDidMount() {
    api.get("/api/parks").then(response => {
      console.log(response.data.parks);
      if (response.data.parks) {
        this.setState({
          parks: response.data.parks
        });
      }
    });
  }

  render() {
    let redirect;
    if (this.state.redirect !== null && this.state.redirect !== "") {
      redirect = <Redirect to={this.state.redirect} />;
    }
    if (!this.state.currentView) {
      this.getStepContent(this.state.activeStep);
    }

    return (
      <MainContainer
        title={
          this.props.property
            ? menus.propertyActions.edit
            : menus.propertyActions.add
        }
        breadCrumb={
          this.props.property
            ? menus.propertyActions.edit
            : menus.propertyActions.add
        }
        className="propertyEditPage"
        breadCrumbs={[{ text: menus.Properties, link: "/reco/properties" }]}
      >
        {redirect}
        <Grid container>
          <Grid item xs={12}>
            <Stepper activeStep={this.state.activeStep}>
              {this.getSteps().map((label, index) => {
                const stepProps = {};
                const labelProps = {};

                return (
                  <Step key={label} {...stepProps}>
                    <StepLabel {...labelProps}>{label}</StepLabel>
                  </Step>
                );
              })}
            </Stepper>
          </Grid>
          <Grid item xs={12}>
            <div className="error" style={{ color: colors.errorRed }}>
              {this.state.error}
            </div>
            {this.state.currentView}
          </Grid>
          <Grid item xs={12} className="paginationControl">
            <Button
              disabled={this.state.activeStep === 0}
              onClick={this.handleBack}
            >
              Back
            </Button>

            <Button
              variant="contained"
              color="primary"
              onClick={this.handleNext}
            >
              {this.state.activeStep === this.getSteps().length - 1
                ? "Finish"
                : "Next"}
            </Button>
          </Grid>
        </Grid>
      </MainContainer>
    );
  }
}

export default PropertyEdit;
