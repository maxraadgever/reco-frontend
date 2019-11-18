import React, { Component } from "react";
import { IProperty } from "../../shared/resources/entities/Property";
import { FormGroup, TextField, InputAdornment } from "@material-ui/core";

interface IProps {
  onChange: (name: string, value: string) => void;
  property: IProperty;
}
interface IState extends IProperty {}

class PropertyFinancialForm extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = this.props.property;
    this.handleChange = this.handleChange.bind(this);
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
      required: required,
      autoFocus: autoFocus,
      type: type
    };
    if (type === "EURO") {
      extra.type = "number";
      extra.startAdornment = (
        <InputAdornment position="start">€</InputAdornment>
      );
    }
    return (
      <TextField
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
      <div>
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
            "tokenStartPrice",
            "Token prijs",
            this.state.tokenStartPrice
          )}
          {this.createTextField(
            "nexusId",
            "Nexus token code",
            this.state.nexusId
          )}
          {this.createTextField("stoDate", "STO Datum", this.state.stoDate)}
        </FormGroup>
      </div>
    );
  }
}

export default PropertyFinancialForm;
