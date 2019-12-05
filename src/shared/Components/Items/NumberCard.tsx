import React, { Component } from "react";
import "./NumberCard.scss";
import { Card, CardContent, Typography, CardActions } from "@material-ui/core";
import { formatEuro } from "../../Util/Util";

interface IProps {
  value: number;
  type?: string;
  text: string;
}
interface IState {}

class NumberCard extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {};
  }

  render() {
    let pre = "";
    let value: any = this.props.value;
    if (this.props.type === "EUR") {
      pre = "€";
      value = formatEuro(this.props.value);
    }

    return (
      <Card>
        <CardContent>
          <Typography variant="h5" component="h2">
            {pre} {value}
          </Typography>
        </CardContent>
        <CardActions>
          <Typography className="title" color="textSecondary" gutterBottom>
            {" "}
            {this.props.text}
          </Typography>
        </CardActions>
      </Card>
    );
  }
}

export default NumberCard;
