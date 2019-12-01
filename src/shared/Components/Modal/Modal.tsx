import React, { Component } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button
} from "@material-ui/core";

interface IProps {
  onOpen?: any;
  onClose?: any;
  title: string;
  contentText?: string;
  children: any;
  open: boolean;
  nextText?: string;
}

interface IState {
  open: boolean;
}

class Modal extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      open: this.props.open
    };
  }

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.props.onClose(true);
    this.setState({ open: false });
  };
  handleCancel = () => {
    this.props.onClose(false);
    this.setState({ open: false });
  };

  render() {
    let nextButton = this.props.nextText ? (
      <Button onClick={this.handleClose} color="primary">
        {this.props.nextText}
      </Button>
    ) : (
      ""
    );

    return (
      <Dialog
        open={this.props.open}
        onClose={this.handleClose}
        fullWidth={true}
        maxWidth="sm"
      >
        <DialogTitle id="form-dialog-title">{this.props.title}</DialogTitle>
        <DialogContent>
          <DialogContentText>{this.props.contentText}</DialogContentText>
          {this.props.children}
        </DialogContent>
        <DialogActions>
          <Button onClick={this.handleCancel} color="primary">
            Annuleren
          </Button>
          {nextButton}
        </DialogActions>
      </Dialog>
    );
  }
}

export default Modal;
