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
  const [setOpen] = React.useState(false);
  console.log(props);
  const { auth, user, isDialogOpen, itemData } = props;
  console.log(isDialogOpen);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Dialog
        open={isDialogOpen}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Use Google's location service?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Let Google help apps determine location. This means sending
            anonymous location data to Google, even when no apps are running.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              props.openDialog(false);
            }}
            color="primary"
          >
            Disagree
          </Button>
          <Button
            onClick={() => {
              const data = {
                purchaseDate: new Date().toString(),
                itemName: itemData.name,
                itemId: itemData.id,
                itemPrice: itemData.price
              };
              props.purchaseItem(data, auth, user);
              props.openDialog(false);
            }}
            color="primary"
            autoFocus
          >
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

/////////////// REDUX
const mapStateToProps = (state, ownProps) => {
  return {
    storeItems: state.storeItems,
    isDialogOpen: state.store.isDialogOpen,
    itemData: state.store.itemData,
    auth: state.firebase.auth,
    user: state.user
  };
};
const mapDispatchToProps = dispatch => {
  return {
    purchaseItem: (data, auth, user) =>
      dispatch(purchaseItem(data, auth, user)),
    openDialog: open => dispatch(openDialog(open))
  };
};

/////////////// EXPORTS
export default compose(connect(mapStateToProps, mapDispatchToProps))(
  AlertDialog
);
