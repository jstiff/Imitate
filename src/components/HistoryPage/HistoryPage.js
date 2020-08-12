import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

class HistoryPage extends Component {
  reSetUser = () => {
    this.props.dispatch({
      type: "CLEAR_ON_LOGOUT",
    });
  };

  render() {
    return <h1>welcome to the history page {this.props.user.name}</h1>;
  }
}
const mapStateToProps = (state) => ({
  user: state.user,
  //lesson: state.lessonText,
  gitHub: state.apiReducer,
});
export default connect(mapStateToProps)(HistoryPage);
