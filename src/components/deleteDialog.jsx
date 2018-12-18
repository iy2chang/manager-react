import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import { deleteEmployee } from "../services/employeeService";

class DeleteDialog extends Component {
  state = {
    open: false
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleCloseCancel = () => {
    this.setState({ open: false });
  };

  handleDelete = async () => {
    this.setState({ open: false });
    const { id, companyId } = this.props;
    try {
      await deleteEmployee(id);
      window.location = `/employees/${companyId}`;
    } catch (ex) {
      if (ex.response && ex.response === 404) {
        console.log("employee not found");
      }
    }
  };

  render() {
    const { firstName } = this.props;
    return (
      <div>
        <Button color="secondary" onClick={this.handleClickOpen}>
          Delete
        </Button>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">Confirm Delete</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              {`Are you sure you want to delete ${firstName}`}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleCloseCancel} color="primary">
              Cancel
            </Button>
            <Button onClick={this.handleDelete} color="primary" autoFocus>
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default DeleteDialog;
