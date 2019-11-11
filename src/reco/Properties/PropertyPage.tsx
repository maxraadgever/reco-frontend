import React, { Component } from "react";
import MainContainer from "../../shared/Components/Containers/MainContainer";
import { menus, propertyInfo } from "../../shared/resources/text";
import { Grid } from "@material-ui/core";
import BasicTable, {
  ColumnTypes
} from "../../shared/Components/Table/BasicTable";
import { Redirect } from "react-router";
import { IProperty } from "../../shared/resources/entities/Property";
import { api } from "../../shared/Util/Api";

interface IProps {}

interface IState {
  properties: IProperty[];
  redirect: any;
}

class PropertyPage extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      redirect: "",
      properties: []
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
          <Grid item xs={12}>
            <BasicTable
              columns={[
                {
                  name: "",
                  attr: "mainImage",
                  render: attr => (
                    <img
                      width={90}
                      src={process.env.REACT_APP_API_URL + attr}
                      alt="not found"
                    />
                  )
                },
                {
                  name: "Name",
                  attr: "name"
                },
                {
                  name: "Type",
                  attr: "type",
                  render: attr =>
                    propertyInfo.propertyType(attr as
                      | "BUNGALOW"
                      | "VILA"
                      | "OTHER")
                },
                {
                  name: "Rendement",
                  attr: "yield",
                  type: ColumnTypes.Euro
                },
                {
                  name: "Totaal prijse",
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
                const link = "/reco/properties/" + identifier;
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
