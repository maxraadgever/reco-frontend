import React, { Component } from "react";
import Modal from "./Modal";
import {
  FormGroup,
  Button,
  Grid,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions
} from "@material-ui/core";
import { createTextField, formatEuro } from "../../Util/Util";
import { IProperty } from "../../resources/entities/Property";
import { api } from "../../Util/Api";

interface IProps {
  property: IProperty;
}

interface IState {
  tokenAmount: number;
  open: boolean;
  status: number;
  errorMsg: string;
  [key: string]: any;
}

class BuyModal extends Component<IProps, IState> {
  modalRef: any;
  constructor(props: any) {
    super(props);

    this.state = {
      tokenAmount: 1,
      open: false,
      status: 0,
      errorMsg: ""
    };

    this.modalRef = React.createRef();
  }

  handleChange = (e: any) => {
    const { name, value } = e.currentTarget;
    this.setState({
      [name]: value
    });
  };

  handleClose = () => {
    api
      .post("/api/transactions/buy", {
        transaction: {
          type: "BUY",
          amount: this.state.tokenAmount
        },
        property: this.props.property.id
      })
      .then(response => {
        this.setState({ status: response.status });
      })
      .catch(error => {
        console.log(error.response);
        this.setState({
          status: error.response.status,
          errorMsg: error.response.data.error
        });
      });
  };

  openBuyModal = () => {
    this.setState({ open: true });
    this.modalRef.current.handleOpen();
  };

  closeSuccessModal = () => {
    this.setState({ open: false, status: 0, errorMsg: "" });
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
          onClose={this.handleClose}
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
        <Dialog
          open={this.state.status === 200}
          onClose={this.closeSuccessModal}
        >
          <DialogTitle id="form-dialog-title">Transactie voltooid!</DialogTitle>
          <DialogContent>
            <DialogContentText>De investering is geslaagd.</DialogContentText>
          </DialogContent>
        </Dialog>
        <Dialog open={this.state.status > 200} onClose={this.closeSuccessModal}>
          <DialogTitle id="form-dialog-title">Transactie ging fout</DialogTitle>
          <DialogContent>
            <DialogContentText>
              De investering is niet geslaagd.
            </DialogContentText>
            {this.state.errorMsg}
          </DialogContent>
          <DialogActions>
            <Button onClick={this.closeSuccessModal} color="primary">
              Sluiten
            </Button>
          </DialogActions>
        </Dialog>
      </Grid>
    );
  }
}

export default BuyModal;
