import React, { Component } from "react";
import MainContainer from "../../shared/Components/Containers/MainContainer";
import { IProperty } from "../../shared/resources/entities/Property";
import { Grid } from "@material-ui/core";
import { menus, propertyInfo } from "../../shared/resources/text";
import "./PropertyPage.scss";
import { api } from "../../shared/Util/Api";

interface IProps {
  property: IProperty;
  match: any;
}

interface IState {
  property: IProperty;
}

class PropertyDetailPage extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      property: {
        id: 0,
        name: "...",
        houseNumber: "...",
        type: "OTHER",
        park: null
      }
    };
  }

  componentWillMount() {
    api
      .get("/api/properties/" + this.props.match.params.id)
      .then(response => {
        console.log(response);
        this.setState({ property: response.data.property });
      })
      .catch(response => {
        console.log(response);
      });
  }

  render() {
    const property = this.state.property;
    let address = "";
    let imageSrc = "";
    if (property) {
      address = property.name + " " + property.houseNumber;
      if (process.env.REACT_APP_API_URL && property.mainImage) {
        imageSrc = process.env.REACT_APP_API_URL + property.mainImage;
      }
    }

    return (
      <MainContainer
        title={address}
        breadCrumb="Detail"
        className="detailPage"
        breadCrumbs={[{ text: menus.Properties, link: "/properties" }]}
      >
        <Grid container spacing={1}>
          <Grid item xs={4}>
            <Grid container spacing={1}>
              <Grid item xs={5}>
                {propertyInfo.type}:
              </Grid>
              <Grid item xs={7}>
                {propertyInfo.propertyType(property.type)}
              </Grid>
              <Grid item xs={5}>
                {propertyInfo.surfaceArea}:
              </Grid>
              <Grid item xs={7}>
                ...m^2
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={8}>
            <img src={imageSrc} alt="not found" className="mainImage" />
          </Grid>
        </Grid>
      </MainContainer>
    );
  }
}

export default PropertyDetailPage;
