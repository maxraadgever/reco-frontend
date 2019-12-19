import React, { Component } from "react";
import { Grid, FormGroup } from "@material-ui/core";
import { createTextField } from "../../Util/Util";
import Modal from "./Modal";
import { api } from "../../Util/Api";

interface IProps {
  open: boolean;
  onClose: () => any;
}
interface IState {
  open: boolean;
  amount: number;
  [key: string]: any;
}

class WithdrawModal extends Component<IProps, IState> {
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
    api.post(`/api/investor/withdraw`, {
      amount: this.state.amount
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
        title="Opnemen van account"
        contentText=""
        open={this.props.open}
        ref={this.modalRef}
        nextText="Opnemen"
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

export default WithdrawModal;
