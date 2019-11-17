import React, { Component, useEffect } from "react";
import { IProperty } from "../../shared/resources/entities/Property";
import {
  FormGroup,
  TextField,
  FormControl,
  InputLabel,
  MenuItem,
  Grid,
  Button
} from "@material-ui/core";
import Select from "@material-ui/core/Select";
import { propertyInfo } from "../../shared/resources/text";
import { api } from "../../shared/Util/Api";
import { IPark } from "../../shared/resources/entities/Park";

interface IProps {
  onChange: (name: string, value: string) => void;
  property: IProperty;
  parks: IPark[];
}
interface IState extends IProperty {
  inputParkWidth: any;
  inputTypeWidth: any;
  inputEnergyWidth: any;
  images: any[];
}

class PropertyDetailForm extends Component<IProps, IState> {
  inputParkRef: any;
  inputTypeRef: any;
  inputEnergyRef: any;

  constructor(props: IProps) {
    super(props);
    this.state = {
      inputParkWidth: 0,
      inputTypeWidth: 0,
      inputEnergyWidth: 0,
      images: [],
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

  handleSelectChange(
    name: string,
    event: React.ChangeEvent<{ value: unknown }>
  ) {
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
    const extra = {
      required: required,
      autoFocus: autoFocus,
      type: type
    };
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

  onFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    console.log(files);
    if (files) {
      for (let i = 0; i < files.length; i++) {
        console.log(files[i]);
        const response = await api.sendFile(
          "/api/properties/2/image",
          files[i]
        );

        let imgArray = [...this.state.images];
        imgArray.push(response.data.path);
        this.setState({ images: imgArray });
      }
    }
  };

  componentDidMount() {
    this.setState({
      inputParkWidth: this.inputParkRef.current!.offsetWidth,
      inputTypeWidth: this.inputTypeRef.current!.offsetWidth,
      inputEnergyWidth: this.inputEnergyRef.current!.offsetWidth
    });
  }

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
                onChange={e => this.handleSelectChange("park", e)}
                labelWidth={this.state.inputParkWidth}
              >
                {this.props.parks.map((park: IPark) => {
                  console.log(park);
                  return <MenuItem value={park.id}>park.name</MenuItem>;
                })}
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
                onChange={e => this.handleSelectChange("type", e)}
                labelWidth={this.state.inputTypeWidth}
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
                onChange={e => this.handleSelectChange("type", e)}
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
        <Grid container item xs={6}>
          <Grid item xs={12}>
            <input
              accept="image/*"
              className="inputName"
              style={{ display: "none" }}
              id="raised-button-file"
              multiple
              type="file"
              onChange={this.onFileUpload}
            />
            <label htmlFor="raised-button-file">
              <Button
                component="span"
                className="uploadButton"
                variant="contained"
                color="primary"
              >
                Upload
              </Button>
            </label>
          </Grid>
          <Grid item xs={12}>
            {this.state.images.map(image => {
              let imageSrc = process.env.REACT_APP_API_URL + image;
              return (
                <img
                  key={image}
                  src={imageSrc}
                  alt="upload not found"
                  width={180}
                />
              );
            })}
          </Grid>
        </Grid>
      </Grid>
    );
  }
}

export default PropertyDetailForm;
