import React, { Component } from "react";
import { Button, Grid } from "@material-ui/core";
import { api } from "../../shared/Util/Api";
import Modal from "../../shared/Components/Modal/Modal";

interface IProps {
  open: boolean;
  onClose: () => any;
  investorId: number;
}

interface IState {
  open: boolean;
  investor: any;
  [key: string]: any;
}

class VerifyModal extends Component<IProps, IState> {
  modalRef: any;
  constructor(props: any) {
    super(props);

    this.state = {
      open: this.props.open,
      investor: {}
    };

    this.modalRef = React.createRef();
  }

  fetchInvestor = () => {
    api.get("/api/investor/" + this.props.investorId).then(response => {
      this.setState({ investor: response.data.investor });
    });
  };

  openIDDocument = () => {
    api.open("/api/investor/" + this.props.investorId + "/iddocument");
  };

  denyId = () => {
    // TODO deny the id uploaded by the user
  };

  approveId = () => {
    // TODO approve the id uplaoded by the user
    // These features need more data to be saved to keep track of the staus of a document and why it was denied.
  };

  closeModal = () => {
    this.props.onClose();
  };

  render() {
    if (this.props.open && !this.state.investor.id) {
      this.fetchInvestor();
    }
    return (
      <Modal
        title="Verifieer investeerder"
        contentText="Tokens kopen"
        open={this.props.open}
        ref={this.modalRef}
        nextText="Opslaan"
        onClose={this.closeModal}
      >
        <Grid container>
          <Grid item xs={3}>
            Legitimatie bewijs:
          </Grid>
          <Grid item xs={3}>
            <Button variant="contained" onClick={this.openIDDocument}>
              Openen
            </Button>
          </Grid>
          <Grid item xs={3}>
            <Button variant="contained" color="secondary" onClick={this.denyId}>
              Afkeuren
            </Button>
          </Grid>
          <Grid item xs={3}>
            <Button
              variant="contained"
              color="primary"
              onClick={this.approveId}
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
