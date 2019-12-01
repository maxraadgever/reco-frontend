import React, { Component } from "react";
import MainContainer from "../../shared/Components/Containers/MainContainer";
import { IProperty } from "../../shared/resources/entities/Property";
import { Grid } from "@material-ui/core";
import { menus, propertyInfo } from "../../shared/resources/text";
import "./PropertyPage.scss";
import { api } from "../../shared/Util/Api";
import {
  formatEuro,
  formatThousands,
  formatName
} from "../../shared/Util/Util";
import BasicTable from "../../shared/Components/Table/BasicTable";
interface IProps {
  property: IProperty;
  match: any;
}

interface IState {
  property: IProperty;
  tokensSold: number;
  investors: any[];
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
      },
      tokensSold: 0,
      investors: []
    };
  }

  componentWillMount() {
    api
      .get("/api/properties/" + this.props.match.params.id)
      .then(response => {
        console.log(response);
        this.setState({ property: response.data.property });
        api
          .get(`/api/investor/balance/${response.data.property.nexusId}/all`)
          .then(balanceResponse => {
            this.setState({ investors: balanceResponse.data.investors });
          });
      })
      .catch(response => {
        console.log(response);
      });
  }

  renderPropertyDetails = (property: IProperty) => {
    return (
      <Grid item container xs={12}>
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
        imageSrc =
          process.env.REACT_APP_API_URL +
          "/api/properties/" +
          property.id +
          "/image/" +
          property.mainImage;
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
          <Grid item xs={6}>
            {this.renderPropertyDetails(this.state.property)}
          </Grid>
          <Grid item xs={6}>
            <img src={imageSrc} alt="not found" className="mainImage" />
          </Grid>
        </Grid>
        <Grid container spacing={1}>
          <Grid container item xs={6}>
            <Grid item xs={6}>
              Tokens uitgegeven:{" "}
            </Grid>
            <Grid item xs={6}>
              {this.state.tokensSold}
            </Grid>
            <Grid item xs={6}>
              Rendement aankomende uitkering:{" "}
            </Grid>
            <Grid item xs={6}>
              {this.state.tokensSold *
                (this.state.property.taxation
                  ? this.state.property.taxation.tokenPrice
                  : 0)}
            </Grid>
          </Grid>
        </Grid>
        <Grid container spacing={1}>
          <BasicTable
            columns={[
              {
                name: "Naam",
                attr: "firstName",
                render: (attr, data) => {
                  return formatName(
                    data.firstName,
                    data.lastName,
                    data.subName
                  );
                }
              },
              {
                name: "Balans",
                attr: "balances",
                render: (attr, data) => {
                  if (this.state.property && this.state.property.nexusId) {
                    return formatThousands(
                      data.balances[this.state.property.nexusId || 0] || 0
                    );
                  }
                  return "";
                }
              }
            ]}
            data={this.state.investors}
          />
        </Grid>
      </MainContainer>
    );
  }
}

export default PropertyDetailPage;
