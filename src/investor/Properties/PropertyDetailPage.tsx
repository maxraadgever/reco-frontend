import React, { Component } from "react";
import MainContainer from "../../shared/Components/Containers/MainContainer";
import { IProperty } from "../../shared/resources/entities/Property";
import { Grid, Button, Typography } from "@material-ui/core";
import { menus, propertyInfo } from "../../shared/resources/text";
import "./PropertyPage.scss";
import { api } from "../../shared/Util/Api";
import PropertyPriceChart from "./PropertyPriceChart";
import ImageSlider from "../../shared/Components/Items/ImageSlider";
import { formatEuro, formatThousands } from "../../shared/Util/Util";
import BuyModal from "../../shared/Components/Modal/BuyModal";
import SellModal from "../../shared/Components/Modal/SellModal";

interface IProps {
  property: IProperty;
  match: any;
}

interface IState {
  property: IProperty;
  images: string[];
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
        park: null,
        tokenStartPrice: 0,
        totalTokens: 100000
      },
      images: []
    };
  }

  componentDidMount() {
    api
      .get("/api/properties/" + this.props.match.params.id)
      .then(response => {
        console.log(response);
        this.setState({ property: response.data.property });
      })
      .catch(response => {
        console.log(response);
      });

    api
      .get(`/api/properties/${this.props.match.params.id}/images`)
      .then(response => {
        this.setState({ images: response.data.images });
      });
  }

  renderImageSlider = () => {
    if (this.state.images && this.state.images.length > 0) {
      return <ImageSlider images={this.state.images} />;
    } else {
      return (
        <Grid item xs={12}>
          Chart loading...
        </Grid>
      );
    }
  };

  renderChart = () => {
    if (this.state.property.id != 0) {
      return <PropertyPriceChart property={this.state.property} />;
    } else {
      return (
        <Grid item xs={12}>
          Chart loading...
        </Grid>
      );
    }
  };

  renderPropertyDetails = (property: IProperty) => {
    return (
      <Grid item container xs={6}>
        <Grid container>
          <Grid item xs={6}>
            {propertyInfo.name}:
          </Grid>
          <Grid item xs={6}>
            {property.name}
          </Grid>
        </Grid>
        <Grid container>
          <Grid item xs={6}>
            {propertyInfo.houseNumber}:
          </Grid>
          <Grid item xs={6}>
            {property.houseNumber}
          </Grid>
        </Grid>
        <Grid container>
          <Grid item xs={6}>
            {propertyInfo.type}:
          </Grid>
          <Grid item xs={6}>
            {propertyInfo.propertyType(property.type)}
          </Grid>
        </Grid>
        <Grid container>
          <Grid item xs={6}>
            {propertyInfo.capacity}:
          </Grid>
          <Grid item xs={6}>
            {property.capacity}
          </Grid>
        </Grid>
        <Grid container>
          <Grid item xs={6}>
            {propertyInfo.surfaceArea}:
          </Grid>
          <Grid item xs={6}>
            {property.surfaceArea}
          </Grid>
        </Grid>
        <Grid container>
          <Grid item xs={6}>
            {propertyInfo.buildingYear}:
          </Grid>
          <Grid item xs={6}>
            {property.buildingYear}
          </Grid>
        </Grid>
        <Grid container>
          <Grid item xs={6}>
            {propertyInfo.energyLabel}:
          </Grid>
          <Grid item xs={6}>
            {property.energyLabel}
          </Grid>
        </Grid>
        <Grid container>
          <Grid item xs={6}>
            {propertyInfo.startPrice}:
          </Grid>
          <Grid item xs={6}>
            {"€" + formatEuro(property.startPrice || 0)}
          </Grid>
        </Grid>
        <Grid container>
          <Grid item xs={6}>
            {propertyInfo.yield}:
          </Grid>
          <Grid item xs={6}>
            {"€" + formatEuro(property.yield || 0)}
          </Grid>
        </Grid>
        <Grid container>
          <Grid item xs={6}>
            {propertyInfo.yieldType}:
          </Grid>
          <Grid item xs={6}>
            {propertyInfo.propertyYieldType(
              property.yieldType ? property.yieldType : "STATIC"
            )}
          </Grid>
        </Grid>
        <Grid container>
          <Grid item xs={6}>
            {propertyInfo.tokenStartPrice}:
          </Grid>
          <Grid item xs={6}>
            {"€" + formatEuro(property.tokenStartPrice || 0)}
          </Grid>
        </Grid>
        <Grid container>
          <Grid item xs={6}>
            {propertyInfo.totalTokens}:
          </Grid>
          <Grid item xs={6}>
            {formatThousands(property.totalTokens || 0)}
          </Grid>
        </Grid>
      </Grid>
    );
  };

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
      <div className="detailPage">
        <MainContainer
          title={address}
          breadCrumb="Detail"
          breadCrumbs={[{ text: menus.Properties, link: "/properties" }]}
        >
          <Grid container spacing={1} style={{ paddingBottom: 32 }}>
            {/* <Grid container item xs={3} spacing={3}></Grid> */}
            <Grid container spacing={3}>
              {this.renderImageSlider()}
            </Grid>
            {/* <Grid container item xs={3} spacing={3}></Grid> */}
          </Grid>
        </MainContainer>
        <Grid container xs={12}>
          <Grid item container xs={6} className="detailCard">
            <Grid item xs={12}>
              <Typography color="textPrimary" variant="h6" gutterBottom>
                Eigenschappen
              </Typography>
            </Grid>
            <Grid container item xs={12}>
              {this.renderPropertyDetails(this.state.property)}
            </Grid>
          </Grid>
          <Grid item container xs={6} className="detailCard">
            <Grid item xs={12}>
              <Typography color="textPrimary" variant="h6" gutterBottom>
                Financieel
              </Typography>
            </Grid>
            <Grid container item xs={12}>
              <Grid item xs={6}>
                Positie:
              </Grid>
              <Grid item xs={6}>
                €0,00
              </Grid>
            </Grid>
            {this.renderChart()}
            <Grid item xs={6}>
              <BuyModal property={this.state.property} />
            </Grid>
            <Grid item xs={6}>
              <SellModal property={this.state.property} />
            </Grid>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default PropertyDetailPage;
