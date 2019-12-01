import React, { Component } from "react";
import { Button, Grid } from "@material-ui/core";
import { api } from "../../shared/Util/Api";
import Modal from "../../shared/Components/Modal/Modal";
import { Redirect } from "react-router";

interface IProps {
  open: boolean;
  onClose: () => any;
  investorId: number;
}

interface IState {
  open: boolean;
  investor: any;
  hasIdDoc: boolean;
  redirect: any;
  [key: string]: any;
}

class VerifyModal extends Component<IProps, IState> {
  modalRef: any;
  constructor(props: any) {
    super(props);

    this.state = {
      open: this.props.open,
      investor: {},
      hasIdDoc: false,
      redirect: ""
    };

    this.modalRef = React.createRef();
  }

  fetchInvestor = () => {
    api.get("/api/investor/" + this.props.investorId).then(response => {
      this.setState({ investor: response.data.investor });
    });
    api
      .get("/api/investor/" + this.props.investorId + "/iddocument")
      .then(response => {
        this.setState({ hasIdDoc: response.status == 200 });
      })
      .catch(err => {
        this.setState({ hasIdDoc: false });
      });
  };

  openIDDocument = () => {
    api.open("/api/investor/" + this.props.investorId + "/iddocument");
  };

  denyKYC = () => {
    // TODO deny the KYC uploaded by the user
    api
      .post("/api/investor/" + this.props.investorId + "/deny", {
        investor: this.state.investor
      })
      .then(this.closeModal);
  };

  approveKYC = () => {
    // TODO approve the KYC uplaoded by the user
    // These features need more data to be saved to keep track of the status of a document and why it was denied.
    api
      .post("/api/investor/" + this.props.investorId + "/approve", {
        investor: this.state.investor
      })
      .then(this.closeModal);
  };

  closeModal = () => {
    this.props.onClose();
  };

  render() {
    if (
      this.props.open &&
      (!this.state.investor.id ||
        this.state.investor.id != this.props.investorId)
    ) {
      this.fetchInvestor();
    }

    let extraProps = {};
    if (
      !this.state.investor.iban ||
      !this.state.investor.bankAccountName ||
      !this.state.hasIdDoc ||
      this.state.investor.level != "NEW"
    ) {
      extraProps = { disabled: true };
    }
    let bankAccount = "Nog niet voltooid";
    if (this.state.investor.iban && this.state.investor.bankAccountName) {
      bankAccount =
        this.state.investor.iban +
        " op naam van " +
        this.state.investor.bankAccountName;
    }

    return (
      <Modal
        title="Verifieer investeerder"
        contentText="Verifieer of de gegevens van de gebruiker kloppen met de bank gegevens en het legitimatie bewijs dat geupload is."
        open={this.props.open}
        ref={this.modalRef}
        onClose={this.closeModal}
      >
        <Grid container spacing={2}>
          <Grid item xs={6}>
            Tegenrekening:
          </Grid>
          <Grid item xs={6}>
            {bankAccount}
          </Grid>
          <Grid item xs={6}>
            Legitimatie bewijs:
          </Grid>
          <Grid item xs={6}>
            <Button
              variant="contained"
              onClick={this.openIDDocument}
              disabled={!this.state.hasIdDoc}
            >
              Openen
            </Button>
          </Grid>
        </Grid>
        <Grid container spacing={2} style={{ paddingTop: "20px" }}>
          <Grid item xs={6}>
            <Button
              variant="contained"
              color="secondary"
              onClick={this.denyKYC}
              {...extraProps}
            >
              Afkeuren
            </Button>
          </Grid>
          <Grid item xs={6}>
            <Button
              variant="contained"
              color="primary"
              onClick={this.approveKYC}
              {...extraProps}
            >
              Goedkeuren
            </Button>
          </Grid>
        </Grid>
      </Modal>
    );
  }
}

export default VerifyModal;
