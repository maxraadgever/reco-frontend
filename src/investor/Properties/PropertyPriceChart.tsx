/// <reference types="react-vis-types" />

import React, { Component } from "react";
import "./PropertyPage.scss";
import { Grid } from "@material-ui/core";
import {
  XAxis,
  YAxis,
  LineMarkSeries,
  Hint,
  FlexibleWidthXYPlot
} from "react-vis";
import { api } from "../../shared/Util/Api";
import { IProperty } from "../../shared/resources/entities/Property";
import { formatEuro } from "../../shared/Util/Util";

interface IProps {
  property: IProperty;
}

interface IState {
  data: Array<any>;
  highest: number;
  lowest: number;
  hovered: any;
}

class PropertyPriceChart extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      data: [],
      highest: 0,
      lowest: 0,
      hovered: false
    };
  }

  componentDidMount() {
    api
      .get(`/api/properties/${this.props.property.id}/taxations`)
      .then(response => {
        const data = [];
        console.log(response.data.taxations);
        if (response.data && response.data.taxations) {
          let highest = 0;
          let lowest = 99999999999;
          for (let i = 0; i < response.data.taxations.length; i++) {
            const taxation = response.data.taxations[i];
            const amount = parseFloat(taxation.tokenPrice);
            const timestamp = new Date(taxation.period).getTime();
            data.push({
              x: timestamp,
              y: amount
            });
            if (amount > highest) {
              highest = amount;
            }
            if (amount < lowest) {
              lowest = amount;
            }
          }
          this.setState({ data, highest, lowest });
        }
      });
  }

  render() {
    console.log([this.state.lowest * 0.9, this.state.highest * 1.1]);
    return (
      <Grid container xs={12}>
        <FlexibleWidthXYPlot
          height={300}
          xType="time"
          yDomain={[this.state.lowest * 0.9, this.state.highest * 1.1]}
        >
          <XAxis title="Periode" />
          <YAxis title="Waarde token (€)" />
          <LineMarkSeries
            style={{
              strokeWidth: "3px"
            }}
            lineStyle={{ stroke: "blue" }}
            markStyle={{ stroke: "blue" }}
            onValueMouseOver={d => this.setState({ hovered: d })}
            onValueMouseOut={d => this.setState({ hovered: false })}
            data={this.state.data}
          />
          {this.state.hovered && (
            <Hint value={this.state.hovered}>
              <p style={{ color: "#000000" }}>
                {"Prijs per token: €" + formatEuro(this.state.hovered.y)}
              </p>
            </Hint>
          )}
        </FlexibleWidthXYPlot>
      </Grid>
    );
  }
}

export default PropertyPriceChart;
