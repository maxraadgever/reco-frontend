import React, { Component } from "react";
import MainContainer from "../../shared/Components/Containers/MainContainer";
import { api } from "../../shared/Util/Api";
import { menus } from "../../shared/resources/text";
import { Grid } from "@material-ui/core";

interface IProps {
  park: any;
  match: any;
}
interface IState {
  park: any;
  facilities: any[];
}

class ParkDetailPage extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      park: {},
      facilities: []
    };
  }

  componentDidMount() {
    api.get("/api/parks/" + this.props.match.params.id).then(response => {
      this.setState({ park: response.data.park });
    });
  }

  render() {
    return (
      <MainContainer
        title={this.state.park.name}
        breadCrumb="Detail"
        breadCrumbs={[{ text: menus.Parks, link: "/reco/parks" }]}
      >
        <Grid container spacing={1}>
          <Grid item xs={3}>
            Naam:
          </Grid>
          <Grid item xs={9}>
            {this.state.park.name}
          </Grid>
          <Grid item xs={3}>
            Adres:
          </Grid>
          <Grid item xs={9}>
            {this.state.park.street} {this.state.park.houseNumber},{" "}
            {this.state.park.postalCode} {this.state.park.city}
          </Grid>
          <Grid item xs={3}>
            Website:
          </Grid>
          <Grid item xs={9}>
            {this.state.park.website}
          </Grid>
        </Grid>
      </MainContainer>
    );
  }
}

export default ParkDetailPage;
