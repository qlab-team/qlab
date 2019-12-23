/////////////// IMPORTS
import React, { useState } from "react";
// material ui
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import TextField from "@material-ui/core/TextField";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
// actions
import { openDialog } from "../../store/actions/dialogActions";
// redux
import { connect } from "react-redux";
import { compose } from "redux";

/////////////// COMPONENT
const AlertDialog = props => {
  const { auth, user, isDialogOpen, dialogData, error, qAtTheEnd } = props;

  let username = "";

  return (
    <div>
      <Dialog
        open={isDialogOpen}
        onClose={() => {
          props.openDialog(false);
        }}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {!error && dialogData.msg ? dialogData.msg.title : "Error"}
        </DialogTitle>
        <DialogContent>
          {!props.usernameChange ? (
            <DialogContentText id="alert-dialog-description">
              {!error && dialogData ? (
                <>
                  {dialogData.msg && dialogData.msg.body}
                  {qAtTheEnd && (
                    <span style={{ opacity: 0.5, fontSize: "smaller" }}>
                      <sup>ℚ</sup>
                    </span>
                  )}
                </>
              ) : (
                error
              )}
            </DialogContentText>
          ) : (
            // THIS IS YOUR INPUT COMPONENT
            <TextField
              onChange={e => {
                username = e.target.value;
                console.log(username);
              }}
            />
          )}
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              props.openDialog(false);
            }}
            color="primary"
          >
            <span style={{ fontWeight: "700", color: "white" }}>
              {!error && "DISAGREE"}
            </span>
          </Button>
          <Button
            onClick={() => {
              props.openDialog(false, null, error);
              if (!error) {
                props.dialogCallback(
                  { ...dialogData, newUsername: username },
                  auth,
                  user
                );
              }
            }}
            color="primary"
            autoFocus
          >
            <span style={{ fontWeight: "700", color: "white" }}>
              {!error ? "AGREE" : "GO BACK"}
            </span>
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

/////////////// REDUX
const mapStateToProps = (state, ownProps) => {
  return {
    storeItems: state.store.items,
    isDialogOpen: state.dialog.isDialogOpen,
    dialogData: state.dialog.data,
    error: state.dialog.error,
    auth: state.firebase.auth,
    user: state.user
  };
};
const mapDispatchToProps = dispatch => {
  return {
    openDialog: (open, data, error) => dispatch(openDialog(open, data, error))
  };
};

/////////////// EXPORTS
export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(AlertDialog);
