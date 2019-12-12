import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
// actions
import { openDialog, purchaseItem } from "../../store/actions/storeActions";
// redux
import { connect } from "react-redux";
import { compose } from "redux";

const AlertDialog = props => {
  const { auth, user, isDialogOpen, itemData, purchaseError } = props;
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
          {!props.purchaseError ? "Do you want to buy this item?" : "Error"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {!purchaseError ? (
              <>
                {itemData.name} for {itemData.price}
                <span style={{ opacity: 0.5, "font-size": "smaller" }}>
                  <sup>ℚ</sup>
                </span>
              </>
            ) : (
              purchaseError
            )}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              props.openDialog(false);
            }}
            color="primary"
          >
            <span style={{ fontWeight: "700", color: "white" }}>
              {!purchaseError && "DISAGREE"}
            </span>
          </Button>
          <Button
            onClick={() => {
              props.openDialog(false, null, purchaseError);
              if (!purchaseError) {
                const data = {
                  purchaseDate: new Date().toString(),
                  itemName: itemData.name,
                  itemId: itemData.id,
                  itemPrice: itemData.price
                };
                props.purchaseItem(data, auth, user);
              }
            }}
            color="primary"
            autoFocus
          >
            <span style={{ "font-weight": "700", color: "white" }}>
              {!purchaseError ? "AGREE" : "GO BACK"}
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
    isDialogOpen: state.store.isDialogOpen,
    itemData: state.store.itemData,
    purchaseError: state.store.purchaseError,
    auth: state.firebase.auth,
    user: state.user
  };
};
const mapDispatchToProps = dispatch => {
  return {
    purchaseItem: (data, auth, user) =>
      dispatch(purchaseItem(data, auth, user)),
    openDialog: (open, data, error) => dispatch(openDialog(open, data, error))
  };
};

/////////////// EXPORTS
export default compose(connect(mapStateToProps, mapDispatchToProps))(
  AlertDialog
);
