import React, { Component } from "react";
import Modal from "./Modal";
import { Grid, FormGroup } from "@material-ui/core";
import { createTextField } from "../../Util/Util";
import { api } from "../../Util/Api";
import { Redirect } from "react-router";

interface IProps {
  open: boolean;
  onClose: () => any;
}
interface IState {
  open: boolean;
  amount: number;
  [key: string]: any;
}

class DepositModal extends Component<IProps, IState> {
  modalRef: any;

  constructor(props: IProps) {
    super(props);
    this.state = {
      open: this.props.open,
      amount: 0
    };

    this.modalRef = React.createRef();
  }

  closeModal = () => {
    api
      .post(`/api/investor/balance`, {
        amount: this.state.amount
      })
      .then(response => {
        window.open(response.data.checkoutUrl);
      });

    this.props.onClose();
  };

  handleChange = (e: any) => {
    const { name, value } = e.currentTarget;
    this.setState({
      [name]: value
    });
  };

  render() {
    return (
      <Modal
        title="Stort op account"
        contentText=""
        open={this.props.open}
        ref={this.modalRef}
        nextText="Storten"
        onClose={this.closeModal}
      >
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <FormGroup>
              {createTextField({
                key: "amount",
                label: "Bedrag",
                value: this.state.amount,
                required: true,
                type: "EURO",
                handleChange: this.handleChange
              })}
            </FormGroup>
          </Grid>
        </Grid>
      </Modal>
    );
  }
}

export default DepositModal;
