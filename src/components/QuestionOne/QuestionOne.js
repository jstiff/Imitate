import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

class QuestionOne extends Component {
  viewRepos = () => {
    this.props.dispatch({
      type: "GET_REPOS",
      payload: this.props.gitHub.data.login,
    });
    this.props.dispatch({
      type: "ADD_TO_TEMP",
      payload: {
        name: this.props.gitHub.data.name,
        userName: this.props.gitHub.data.login,
        avatar_url: this.props.gitHub.data.avatar_url,
      },
    });
  };

  reSetUser = () => {
    this.props.dispatch({
      type: "CLEAR_ON_LOGOUT",
    });
  };

  //Prompt page that displays the avatar of the username searched in the intput
  render() {
    return (
      <div className="gitHubCard">
        <img className="avatar" src={this.props.gitHub.data.avatar_url} />
        <h2>
          {this.props.gitHub.data.name}{" "}
          {this.props.gitHub.data.company !== null
            ? ` works for ${this.props.gitHub.data.company} and `
            : null}
          has {this.props.gitHub.data.public_repos} repositories to view. Would
          you like to check any out?
        </h2>
        <div className="QuestionOneBtns">
          <button onClick={this.viewRepos} className="register-form-button">
            yes
          </button>

          <button onClick={this.reSetUser} className="register-form-button">
            No thanks
          </button>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  user: state.user,
  gitHub: state.apiReducer,
});
export default connect(mapStateToProps)(QuestionOne);
