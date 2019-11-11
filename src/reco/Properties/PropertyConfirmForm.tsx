import React, { Component } from "react";
import { IProperty } from "../../shared/resources/entities/Property";
import { FormGroup, TextField } from "@material-ui/core";

interface IProps {
  onChange: (name: string, value: string) => void;
  property: IProperty;
}
interface IState extends IProperty {}

class PropertyConfirmForm extends Component<IProps, IState> {
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

  render() {
    return (
      <div>
        <FormGroup>
          <TextField
            variant="outlined"
            margin="normal"
            required
            id="name"
            label="Woning naam"
            name="name"
            onChange={this.handleChange}
            value={this.state.value}
            disabled
          />
        </FormGroup>
      </div>
    );
  }
}

export default PropertyConfirmForm;
