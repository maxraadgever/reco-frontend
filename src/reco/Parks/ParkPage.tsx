import React, { Component } from "react";
import { api } from "../../shared/Util/Api";
import MainContainer from "../../shared/Components/Containers/MainContainer";
import { menus } from "../../shared/resources/text";
import { Grid } from "@material-ui/core";
import BasicTable from "../../shared/Components/Table/BasicTable";
import { Redirect } from "react-router";

interface IProps {}
interface IState {
  redirect: any;
  parks: any[];
}

class ParkPage extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      redirect: "",
      parks: []
    };
  }

  componentDidMount() {
    api
      .get("/api/parks")
      .then(response => {
        this.setState({ parks: response.data.parks });
      })
      .catch(response => console.error(response));
  }

  render() {
    return (
      <MainContainer title={menus.Parks}>
        {this.state.redirect}
        <Grid container>
          <Grid item xs={12}></Grid>
          <Grid item xs={12}>
            <BasicTable
              columns={[
                {
                  name: "Naam",
                  attr: "name"
                },
                {
                  name: "Adres",
                  attr: "street",
                  render: (attr, data) => {
                    return `${data.street} ${data.houseNumber}, ${data.postalCode} ${data.city}`;
                  }
                },
                {
                  name: "Website",
                  attr: "website"
                }
              ]}
              data={this.state.parks}
              onClick={(event: any, identifier: any) => {
                const link = "/reco/parks/" + identifier;
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

export default ParkPage;
