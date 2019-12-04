// Import FirebaseAuth and firebase.
import React from "react";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import firebase from "../../config/fbConfig";
import { connect } from "react-redux";
import { createUser } from "../../store/actions/userActions";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";

// material ui
import Fab from "@material-ui/core/Fab";

// Configure FirebaseUI.
const uiConfig = {
  // Popup signin flow rather than redirect flow.
  signInFlow: "popup",
  // Redirect to /signedIn after sign in is successful. Alternatively you can provide a callbacks.signInSuccess function.
  signInSuccessUrl: "/dashboard",
  // We will display Google as an auth provider.
  signInOptions: [
    firebase.auth.GoogleAuthProvider.PROVIDER_ID
    // firebase.auth.FacebookAuthProvider.PROVIDER_ID
  ]
};

class SignInScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false,
      userAuth: null,
    };
  }

  componentDidMount() {
    this.unregisterAuthObserver = firebase
      .auth()
      .onAuthStateChanged(user => {
        // console.log("User: ", user)
        // Below probably not nessecary TODO REMOVE
        if (user) {
          this.setState({
            isLoggedIn: true,
            userAuth: user
          })
        }
        else {
          this.setState({
            isLoggedIn: false,
            userAuth: null,
          })
        }
      });
  }

  // Make sure we un-register Firebase observers when the component unmounts.
  componentWillUnmount() {
    this.unregisterAuthObserver();
  }

  render() {
    return (
      <div>
        <h1>My App</h1>
        <p>Please sign-in:</p>
        <StyledFirebaseAuth
          uiConfig={uiConfig}
          firebaseAuth={firebase.auth()}
        />
        <Fab onClick={() => firebase.auth().signOut()} variant="extended">
          SIGN OUT
        </Fab>
      </div>
    );
  }
}

const mapStateToProps = state => {
  const users = state.firestore.data.users;
  return {
    users: users,
    auth: state.firebase.auth
  };
};

const mapDispatchToProps = dispatch => {
  return {
    createUser: users => dispatch(createUser(users))
  };
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect([{ collection: "users" }])
)(SignInScreen);