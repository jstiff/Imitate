import React, { Component } from "react";
import { connect } from "react-redux";

class Directories extends Component {
  render() {
    return <>{JSON.stringify(this.props.directoryTree)}</>;
  }
}
const mapStateToProps = (state) => ({
  directoryTree: state.directoryTreeReducer,
});
export default connect(mapStateToProps)(Directories);
