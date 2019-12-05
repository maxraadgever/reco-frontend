import React, { Component } from "react";
import "./BasicTable.scss";
import {
  Table,
  TableRow,
  TableHead,
  TableCell,
  TableBody,
  Grid
} from "@material-ui/core";
import { formatEuro } from "../../Util/Util";

export enum ColumnTypes {
  "Text",
  "Euro"
}

type TColumnType = ColumnTypes.Euro | ColumnTypes.Text;

export type TColumn = {
  name: string;
  attr: string;
  render?: (attr: string, data?: any) => any;
  type?: TColumnType;
};

interface IProps {
  columns: TColumn[];
  data: any[];
  onClick?: (event: any, identifier: any) => void;
  emptyState?: any;
}

interface IState {}

class BasicTable extends Component<IProps, IState> {
  renderCell(data: any, column: TColumn) {
    if (column.render) {
      return column.render(data[column.attr], data);
    } else if (column.type) {
      return this.renderForType(column.type, data[column.attr]);
    } else {
      return data[column.attr];
    }
  }

  handleClick(event: any, identifier: any) {
    if (this.props.onClick) {
      this.props.onClick(event, identifier);
    }
  }

  render() {
    let rowClass = "tableRow";
    if (this.props.onClick) {
      rowClass += " clickable";
    }
    let emptyState = null;
    if (!this.props.data || this.props.data.length === 0) {
      emptyState = (
        <Grid item xs={12} alignContent="center" justify="center">
          <img src={this.props.emptyState} alt="" style={{ paddingTop: 10 }} />
        </Grid>
      );
    }

    return (
      <Grid container>
        <Table>
          <TableHead>
            <TableRow>
              {this.props.columns.map((column: TColumn) => (
                <TableCell key={column.name}>{column.name}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {this.props.data.map((data: any) => (
              <TableRow
                key={data.id}
                onClick={event => this.handleClick(event, data.id)}
                className={rowClass}
              >
                {this.props.columns.map((column: TColumn) => (
                  <TableCell key={data.id + column.name}>
                    {this.renderCell(data, column)}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {emptyState}
      </Grid>
    );
  }

  renderForType(type: ColumnTypes, attr: string | number) {
    switch (type) {
      case ColumnTypes.Euro:
        return "€" + formatEuro(attr);
      default:
        return attr;
    }
  }
}

export default BasicTable;
