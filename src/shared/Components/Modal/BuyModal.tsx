import React, { Component } from "react";
import Modal from "./Modal";
import { FormGroup, Button, Grid, Typography } from "@material-ui/core";
import { createTextField, formatEuro } from "../../Util/Util";
import { IProperty } from "../../resources/entities/Property";

interface IProps {
  property: IProperty;
}

interface IState {
  tokenAmount: number;
  open: boolean;
  [key: string]: any;
}

class BuyModal extends Component<IProps, IState> {
  modalRef: any;
  constructor(props: any) {
    super(props);

    this.state = {
      tokenAmount: 1,
      open: false
    };

    this.modalRef = React.createRef();
  }

  handleChange = (e: any) => {
    const { name, value } = e.currentTarget;
    this.setState({
      [name]: value
    });
  };

  openBuyModal = () => {
    this.setState({ open: true });
    this.modalRef.current.handleOpen();
  };

  render() {
    const tokenPrice = this.props.property.tokenStartPrice
      ? this.props.property.tokenStartPrice
      : 0;
    const tokenYield =
      (this.props.property.yield ? this.props.property.yield : 1) /
      (this.props.property.totalTokens ? this.props.property.totalTokens : 1);

    return (
      <Grid item xs={12}>
        <Button
          className="actionButtons"
          variant="contained"
          color="primary"
          onClick={this.openBuyModal}
        >
          Koop
        </Button>
        <Modal
          title={
            "Koop: " +
            this.props.property.name +
            " " +
            this.props.property.houseNumber
          }
          contentText="Tokens kopen"
          open={this.state.open}
          nextText="Koop"
          ref={this.modalRef}
        >
          <FormGroup>
            {createTextField({
              key: "tokenAmount",
              label: "Aantal tokens",
              value: this.state.tokenAmount,
              required: true,
              autoFocus: true,
              type: "number",
              handleChange: this.handleChange
            })}
            {createTextField({
              key: "tokenPrice",
              label: "Prijs per deel",
              value: tokenPrice,
              required: true,
              type: "EURO",
              disabled: true
            })}
          </FormGroup>
          <Grid container>
            <Grid
              item
              xs={6}
              direction="column"
              alignItems="center"
              justify="center"
            >
              <Typography color="textPrimary" variant="h6" gutterBottom>
                Totaal prijs
              </Typography>
            </Grid>
            <Grid
              item
              xs={6}
              direction="column"
              alignItems="center"
              justify="center"
            >
              <Typography color="textPrimary" variant="h6" gutterBottom>
                Verwacht rendement
              </Typography>
            </Grid>
            <Grid
              item
              xs={6}
              direction="column"
              alignItems="center"
              justify="center"
            >
              €{formatEuro(this.state.tokenAmount * tokenPrice)}
            </Grid>
            <Grid
              item
              xs={6}
              direction="column"
              alignItems="center"
              justify="center"
            >
              €{formatEuro(this.state.tokenAmount * tokenYield)}
            </Grid>
          </Grid>
        </Modal>
      </Grid>
    );
  }
}

export default BuyModal;
