import React, { Component } from "react";
import { IProperty } from "../../shared/resources/entities/Property";
import {
  FormGroup,
  TextField,
  InputAdornment,
  FormControl,
  Select,
  InputLabel,
  MenuItem
} from "@material-ui/core";

interface IProps {
  onChange: (name: string, value: string) => void;
  property: IProperty;
}
interface IState extends IProperty {
  intputYieldTypeWidth: any;
}

class PropertyFinancialForm extends Component<IProps, IState> {
  inputYieldType: any;
  constructor(props: IProps) {
    super(props);
    this.state = { ...this.props.property, intputYieldTypeWidth: 0 };
    this.handleChange = this.handleChange.bind(this);

    this.inputYieldType = React.createRef();
  }

  handleChange(e: any) {
    const { name, value } = e.currentTarget;
    this.props.onChange(name, value);
    this.setState({
      [name]: value
    });
  }

  handleSelectChange(
    name: string,
    event: React.ChangeEvent<{ value: unknown }>
  ) {
    console.log(event.target.value);
    this.props.onChange(name, event.target.value as string);
    this.setState({
      [name]: event.target.value as string
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
      extra.startadornment = (
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

  componentDidMount() {
    this.setState({
      intputYieldTypeWidth: this.inputYieldType.current!.offsetWidth
    });
  }

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
          <FormControl variant="outlined" margin="normal">
            <InputLabel ref={this.inputYieldType} id="yieldTypeLabel">
              Rendement type
            </InputLabel>
            <Select
              labelId="yieldTypeLabel"
              id="yieldType"
              value={this.state.yieldType}
              onChange={e => this.handleSelectChange("yieldType", e)}
              labelWidth={this.state.intputYieldTypeWidth}
            >
              <MenuItem value={"STATIC"}>Vast rendement</MenuItem>
              <MenuItem value={"DYNAMIC"}>Prognose</MenuItem>
            </Select>
          </FormControl>
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
