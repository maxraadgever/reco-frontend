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
      <Grid container className="propertyDetails">
        <Grid container>
          <Grid item xs={4} className="label">
            <div className="labelText">{propertyInfo.type}:</div>
            <div className="value">
              {propertyInfo.propertyType(property.type)}
            </div>
          </Grid>
          <Grid item xs={4} className="label">
            <div className="labelText">{propertyInfo.capacity}:</div>
            <div className="value">{property.capacity} personen</div>
          </Grid>
          <Grid item xs={4} className="label">
            <div className="labelText">{propertyInfo.surfaceArea}:</div>
            <div className="value">{property.surfaceArea} m²</div>
          </Grid>
        </Grid>

        <Grid container>
          <Grid item xs={4} className="label">
            <div className="labelText">{propertyInfo.buildingYear}:</div>
            <div className="value">{property.buildingYear}</div>
          </Grid>
          <Grid item xs={4} className="label">
            <div className="labelText">{propertyInfo.energyLabel}:</div>
            <div className="value">{property.energyLabel}</div>
          </Grid>
          <Grid item xs={4} className="label">
            <div className="labelText">{propertyInfo.startPrice}:</div>
            <div className="value">
              {"€" + formatEuro(property.startPrice || 0)}
            </div>
          </Grid>
        </Grid>
        <Grid container>
          <Grid item xs={4} className="label">
            <div className="labelText">{propertyInfo.yield}:</div>
            <div className="value">{"€" + formatEuro(property.yield || 0)}</div>
          </Grid>
          <Grid item xs={4} className="label">
            <div className="labelText">{propertyInfo.yieldType}:</div>
            <div className="value">
              {propertyInfo.propertyYieldType(
                property.yieldType ? property.yieldType : "STATIC"
              )}
            </div>
          </Grid>
          <Grid item xs={4} className="label">
            <div className="labelText">{propertyInfo.tokenStartPrice}:</div>
            <div className="value">
              {"€" + formatEuro(property.tokenStartPrice || 0)}
            </div>
          </Grid>
        </Grid>
      </Grid>
    );
  };

  render() {
    const property = this.state.property;
    let propertyName = "";
    let imageSrc = "";
    if (property) {
      if (process.env.REACT_APP_API_URL && this.state.images.length > 0) {
        imageSrc =
          process.env.REACT_APP_API_URL +
          "/api/properties/" +
          property.id +
          "/image/" +
          this.state.images[0];
      }
    }

    if (this.state.property) {
      propertyName = `${property.name} ${property.houseNumber} `;
    }
    let currentPrice = "0.00";
    let currentTokenPrice = "0.00";
    if (this.state.property && this.state.property.taxation) {
      currentPrice = this.state.property.taxation.amount;
      currentTokenPrice = this.state.property.taxation.tokenPrice;
    }

    return (
      <MainContainer noStyle>
        <Grid container spacing={2} className="detailContainer">
          <Grid item xs={12} className="headerImage">
            <Grid container>
              <img src={imageSrc} />
            </Grid>
            <Grid container className="titleContainer">
              <Grid item xs={12}>
                <Grid container spacing={2}>
                  <Grid item xs={12} className="mainTitle">
                    {propertyName}
                  </Grid>
                  <Grid item xs={2} className="actionButton">
                    <BuyModal property={this.state.property} />
                  </Grid>
                  <Grid item xs={2} className="actionButton">
                    <SellModal property={this.state.property} />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid className="detailCard" item xs={12}>
            <Grid container>
              <Grid item xs={6}>
                {this.renderPropertyDetails(this.state.property)}
              </Grid>
              <Grid item xs={6}>
                <Grid container className="propertyDetails">
                  <Grid item xs={6} className="label">
                    Totaalprijs:
                    <span className="price"> € {formatEuro(currentPrice)}</span>
                  </Grid>
                  <Grid item xs={6} className="label">
                    Tokenprijs:{" "}
                    <span className="price">
                      € {formatEuro(currentTokenPrice)}
                    </span>
                  </Grid>
                </Grid>
                {this.renderChart()}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        {/* <Grid container className="imageSliderContainer">
          <ImageSlider images={this.state.images} />
        </Grid> */}
      </MainContainer>
    );
  }
}

export default PropertyDetailPage;
