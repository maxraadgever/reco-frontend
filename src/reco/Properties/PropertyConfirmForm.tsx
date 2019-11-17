import React, { Component } from "react";
import { IProperty } from "../../shared/resources/entities/Property";
import {
  FormGroup,
  TextField,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from "@material-ui/core";
import { propertyInfo } from "../../shared/resources/text";

interface IProps {
  onChange: (name: string, value: string) => void;
  property: IProperty;
}
interface IState extends IProperty {
  inputParkWidth: any;
  inputTypeWidth: any;
  inputEnergyWidth: any;
}

class PropertyConfirmForm extends Component<IProps, IState> {
  inputParkRef: any;
  inputTypeRef: any;
  inputEnergyRef: any;
  constructor(props: IProps) {
    super(props);
    this.state = {
      inputParkWidth: 0,
      inputTypeWidth: 0,
      inputEnergyWidth: 0,
      ...this.props.property
    };
    this.handleChange = this.handleChange.bind(this);

    this.inputParkRef = React.createRef();
    this.inputTypeRef = React.createRef();
    this.inputEnergyRef = React.createRef();
  }

  handleChange(e: any) {
    const { name, value } = e.currentTarget;
    this.props.onChange(name, value);
    this.setState({
      [name]: value
    });
  }

  createTextField = (
    key: string,
    label: string,
    value: any,
    required = true,
    autoFocus = false,
    type = "text"
  ) => {
    let extra: any = {
      type: type
    };
    return (
      <TextField
        disabled
        variant="outlined"
        margin="normal"
        id={key}
        label={label}
        name={key}
        value={value}
        onChange={this.handleChange}
        {...extra}
      />
    );
  };

  render() {
    return (
      <Grid container spacing={1}>
        <Grid item xs={6}>
          <FormGroup>
            <FormControl variant="outlined" margin="normal">
              <InputLabel ref={this.inputParkRef} id="parkSelectLabel">
                Park
              </InputLabel>
              <Select
                id="park"
                value={this.state.park ? this.state.park : ""}
                disabled
              >
                <MenuItem value={1}>Landal Greenparks</MenuItem>
                <MenuItem value={2}>CenterParcs</MenuItem>
                <MenuItem value={3}>Thirty</MenuItem>
              </Select>
            </FormControl>
            {this.createTextField(
              "name",
              "Woning naam",
              this.state.name,
              true,
              true
            )}
            {this.createTextField(
              "houseNumber",
              "Woning nummer",
              this.state.houseNumber
            )}
            <FormControl variant="outlined" margin="normal">
              <InputLabel ref={this.inputTypeRef} id="typeSelectLabel">
                Type
              </InputLabel>
              <Select
                labelId="typeSelectLabel"
                id="type"
                value={this.state.type}
                labelWidth={this.state.inputTypeWidth}
                disabled
              >
                <MenuItem value={"BUNGALOW"}>
                  {propertyInfo.propertyType("BUNGALOW")}
                </MenuItem>
                <MenuItem value={"VILA"}>
                  {propertyInfo.propertyType("VILA")}
                </MenuItem>
                <MenuItem value={"OTHER"}>
                  {propertyInfo.propertyType("OTHER")}
                </MenuItem>
              </Select>
            </FormControl>
            {this.createTextField(
              "capacity",
              "Capaciteit",
              this.state.capacity,
              false,
              false,
              "number"
            )}
            {this.createTextField(
              "surfaceArea",
              "Oppervlakte (m²)",
              this.state.surfaceArea,
              false,
              false,
              "number"
            )}
            {this.createTextField(
              "buildingYear",
              "Bouwjaar",
              this.state.buildingYear,
              false,
              false,
              "number"
            )}
            <FormControl variant="outlined" margin="normal">
              <InputLabel ref={this.inputEnergyRef} id="energySelectLabel">
                Energielabel
              </InputLabel>
              <Select
                labelId="energySelectLabel"
                id="type"
                value={this.state.energyLabel}
                disabled
                labelWidth={this.state.inputEnergyWidth}
              >
                <MenuItem value={"A"}>A</MenuItem>
                <MenuItem value={"B"}>B</MenuItem>
                <MenuItem value={"C"}>C</MenuItem>
                <MenuItem value={"D"}>D</MenuItem>
                <MenuItem value={"E"}>E</MenuItem>
                <MenuItem value={"F"}>F</MenuItem>
                <MenuItem value={"G"}>G</MenuItem>
              </Select>
            </FormControl>
          </FormGroup>
        </Grid>
        <Grid item xs={6}>
          <FormGroup>
            {this.createTextField(
              "startPrice",
              "Aankoop prijs",
              this.state.startPrice,
              true,
              true
            )}
            {this.createTextField("yield", "Rendement", this.state.yield)}
            {this.createTextField(
              "totalTokens",
              "Totaal tokens",
              this.state.totalTokens,
              true,
              false,
              "number"
            )}
            {this.createTextField(
              "tokenPrice",
              "Token prijs",
              this.state.tokenPrice
            )}
            {this.createTextField(
              "tokenName",
              "Nexus token code",
              this.state.tokenName
            )}
            {this.createTextField("stoDate", "STO Datum", this.state.stoDate)}
          </FormGroup>
        </Grid>
      </Grid>
    );
  }
}

export default PropertyConfirmForm;
