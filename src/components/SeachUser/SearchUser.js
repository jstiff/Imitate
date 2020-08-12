import React, { Component } from "react";
import { connect } from "react-redux";

class SearchUser extends Component {
  state = {
    input: "",
  };
  handleChange = (event) => {
    this.setState({
      userName: event.target.value,
    });
  };
  sendUserName = () => {
    this.props.dispatch({ type: "CLEAR_ON_LOGOUT" });
    this.props.dispatch({
      type: "FETCH_GITHUB_USER",
      payload: this.state.userName,
    });
  };

  render() {
    return (
      <div>
        <h2 className="homeWelcome">
          Welcome {this.props.user.first_name},{" "}
          <span style={{ marginLeft: "10px" }}></span>search GitHub for your
          favorite developer!
        </h2>
        <br />
        <div className="gitHubSearchContainer">
          <input
            className="apiSearchInput"
            onChange={this.handleChange}
            type="text"
            autoFocus
            placeholder="search for user"
          />
          <button
            className="register-form-button button-ghost"
            onClick={this.sendUserName}
          >
            Search user
          </button>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  user: state.user,
  lesson: state.lessonText,
  gitHubUser: state.apiReducer,
  userRepos: state.reposReducer,
  repoFiles: state.treeReducer,
  content: state.contentReducer,
});
export default connect(mapStateToProps)(SearchUser);
