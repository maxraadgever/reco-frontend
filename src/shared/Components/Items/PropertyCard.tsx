import React, { Component } from "react";
import {
  CardContent,
  Card,
  Typography,
  Button,
  CardActions,
  CardMedia
} from "@material-ui/core";
import "./PropertyCard.scss";
import { IProperty } from "../../resources/entities/Property";
import { Redirect } from "react-router";
import { propertyInfo } from "../../resources/text";
import { formatEuro } from "../../Util/Util";

interface IProps {
  property: IProperty;
}

interface IState {
  redirect: any;
}

class PropertyCard extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      redirect: ""
    };
  }

  handleCardClick(event: any, id: number) {
    console.log("GOTO: ", id);
    const link = "/properties/" + id;
    this.setState({ redirect: <Redirect to={link} /> });
  }

  render() {
    const property: IProperty = this.props.property;
    let price: any = "";

    let cardMedia: any = null;
    if (process.env.REACT_APP_API_URL && property.mainImage) {
      const imageUrl = process.env.REACT_APP_API_URL + property.mainImage;
      cardMedia = (
        <CardMedia
          className="media"
          image={imageUrl}
          title={property.park ? property.park.name : "..."}
        />
      );
    }

    if (property.startPrice) {
      price = "€" + formatEuro(property.startPrice);
    }
    return (
      <Card className="propertyCard">
        {this.state.redirect}
        {cardMedia}
        <CardContent>
          <Typography className="title" color="textSecondary" gutterBottom>
            {propertyInfo.propertyType(property.type)}
          </Typography>
          <Typography variant="h5" component="h2">
            {property.name} {property.houseNumber}
          </Typography>
          <Typography className="subText" color="textSecondary">
            {price}
          </Typography>
          <Typography variant="body2" component="p"></Typography>
        </CardContent>
        <CardActions>
          <Button
            size="small"
            onClick={event => {
              this.handleCardClick(event, property.id);
            }}
          >
            Meer informatie
          </Button>
        </CardActions>
      </Card>
    );
  }
}

export default PropertyCard;
