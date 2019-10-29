import React, { Component } from "react";
import MainContainer from "../../shared/Components/Containers/MainContainer";
import { menus } from "../../shared/resources/text";
import { Grid } from "@material-ui/core";
import { IProperty } from "../../shared/resources/entities/Property";
import PropertyCard from "../../shared/Components/Items/PropertyCard";
import axios from "axios";

interface IProps {}

interface IState {
  properties: IProperty[];
}

class PropertyPage extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      properties: []
    };
  }

  componentWillMount() {
    axios
      .get("/api/properties")
      .then(response => {
        console.log(response);
        this.setState({ properties: response.data.properties });
      })
      .catch(response => {
        console.log(response);
      });
  }

  render() {
    return (
      <MainContainer title={menus.Properties}>
        <Grid container spacing={3}>
          {this.state.properties.map((property: IProperty) => {
            return (
              <Grid item xs={4}>
                <PropertyCard property={property} />
              </Grid>
            );
          })}
        </Grid>
      </MainContainer>
    );
  }
}

export default PropertyPage;
