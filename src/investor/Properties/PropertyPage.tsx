import React, { Component } from "react";
import MainContainer from "../../shared/Components/Containers/MainContainer";
import { menus, headers } from "../../shared/resources/text";
import { Grid, Typography } from "@material-ui/core";
import { IProperty } from "../../shared/resources/entities/Property";
import PropertyCard from "../../shared/Components/Items/PropertyCard";
import BasicTable, {
  ColumnTypes
} from "../../shared/Components/Table/BasicTable";
import { api } from "../../shared/Util/Api";
import { propertyInfo } from "../../shared/resources/text";
import { Redirect } from "react-router";

interface IProps {}

interface IState {
  properties: IProperty[];
  redirect: any;
}

class PropertyPage extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      properties: [],
      redirect: ""
    };
  }

  componentWillMount() {
    api
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
        {this.state.redirect}
        <Grid container>
          <Grid container item xs={12} spacing={3}>
            {this.state.properties.slice(0, 3).map((property: IProperty) => {
              return (
                <Grid item xs={4}>
                  <PropertyCard property={property} />
                </Grid>
              );
            })}
          </Grid>
          <Grid item xs={12}>
            <Typography
              style={{ paddingTop: "12px" }}
              color="textPrimary"
              variant="h6"
              gutterBottom
            >
              {headers.fullProperties}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <BasicTable
              columns={[
                {
                  name: "",
                  attr: "mainImage",
                  render: (attr, data) => (
                    <img
                      width={90}
                      src={
                        process.env.REACT_APP_API_URL +
                        "/api/properties/" +
                        data.id +
                        "/image/" +
                        attr
                      }
                      alt="not found"
                    />
                  )
                },
                {
                  name: "Naam",
                  attr: "name"
                },
                {
                  name: "Type",
                  attr: "type",
                  render: attr =>
                    propertyInfo.propertyType(
                      attr as "BUNGALOW" | "VILA" | "OTHER"
                    )
                },
                {
                  name: "Rendement",
                  attr: "yield",
                  type: ColumnTypes.Euro
                },
                {
                  name: "Totaal prijs",
                  attr: "startPrice",
                  type: ColumnTypes.Euro
                },
                {
                  name: "Beschikbaar",
                  attr: "availableTokens"
                }
              ]}
              data={this.state.properties}
              onClick={(event: any, identifier: any) => {
                const link = "/properties/" + identifier;
                this.setState({
                  redirect: <Redirect to={link} />
                });
              }}
            />
          </Grid>
        </Grid>
      </MainContainer>
    );
  }
}

export default PropertyPage;
