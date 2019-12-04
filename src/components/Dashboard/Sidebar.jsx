import React, { Component } from "react";
import { connect } from "react-redux";
// import { createUser } from "../../store/actions/userActions"
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";

class Sidebar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      points: ""
    };
  }
  handleClick = e => {
    e.preventDefault();
    this.props.createUser(this.state);
  };
  render() {
    const { users } = this.props;

    if (users) {
      // console.log(this.props);
      return (
        <div>
          <p>Sidebar</p>
          <button onClick={this.handleClick}>ADD</button>
          <p>User Name: {users["qbSsXx5oTEj30TdqJs6W"].username}</p>
        </div>
      );
    } else {
      return (
        <div>
          <p>Sidebar - no user</p>
          <button onClick={this.handleClick}>ADD</button>
        </div>
      );
    }
  }
}

const mapStateToProps = state => {
  // console.log("state", state);
  const users = state.firestore.data.users;
  return {
    users: users,
    auth: state.firebase.auth
  };
};

// const mapDispatchToProps = dispatch => {
//   return {
//     createUser: users => dispatch(createUser(users))
//   };
// };

export default compose(
  connect(mapStateToProps),
  firestoreConnect([{ collection: "users" }])
)(Sidebar);
