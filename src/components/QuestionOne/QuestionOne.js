import React, { Component } from "react";
import { connect } from "react-redux";

class QuestionOne extends Component {
  viewRepos = () => {
    this.props.dispatch({
      type: "GET_REPOS",
      payload: this.props.gitHub.data.login,
    });
  };

  render() {
    return (
      <div className="gitHubCard">
        <h2>
          {this.props.gitHub.data.name} has{" "}
          {this.props.gitHub.data.public_repos} repositories to view. Would you
          like to check any out?
        </h2>

        <button onClick={this.viewRepos} className="register-form-button">
          yes
        </button>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  user: state.user,
  //lesson: state.lessonText,
  gitHub: state.apiReducer,
});
export default connect(mapStateToProps)(QuestionOne);
