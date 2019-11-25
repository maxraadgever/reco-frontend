import React, { Component } from "react";
import { Grid, Button, Typography, FormGroup } from "@material-ui/core";
import { IProperty } from "../../resources/entities/Property";
import Modal from "./Modal";
import { createTextField, formatEuro } from "../../Util/Util";

interface IProps {
  property: IProperty;
}

interface IState {
  tokenAmount: number;
  open: boolean;
  [key: string]: any;
}

class SellModal extends Component<IProps, IState> {
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

  openModal = () => {
    this.setState({ open: true });
    this.modalRef.current.handleOpen();
  };

  render() {
    const tokenPrice = this.props.property.tokenStartPrice
      ? this.props.property.tokenStartPrice
      : 0;

    return (
      <Grid item xs={12}>
        <Button
          className="actionButtons"
          variant="contained"
          color="secondary"
          onClick={this.openModal}
        >
          Verkoop
        </Button>
        <Modal
          title={
            "Verkoop: " +
            this.props.property.name +
            " " +
            this.props.property.houseNumber
          }
          contentText="Tokens verkopen"
          open={this.state.open}
          nextText="Verkoop"
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
              xs={12}
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
              xs={12}
              direction="column"
              alignItems="center"
              justify="center"
            >
              €{formatEuro(this.state.tokenAmount * tokenPrice)}
            </Grid>
          </Grid>
        </Modal>
      </Grid>
    );
  }
}

export default SellModal;
