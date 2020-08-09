import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import LogOutButton from "../LogOutButton/LogOutButton";
import reactDOM from "react-dom";
import TextArea from "../TextArea/TextArea";
import QuestionOne from "../QuestionOne/QuestionOne";
import QuestionTwo from "../QuestionTwo/QuestionTwo";
import QuestionThree from "../QuestionThree/QuestionThree";

class UserPage extends Component {
  Question;

  state = {
    input: "",
  };

  grabTree = (event, repo) => {
    this.props.dispatch({
      type: "GET_REPO_TREE",
      payload: {
        userName: this.props.gitHub.data.login,
        repoName: repo,
      },
    });
  };

  viewRepos = () => {
    this.props.dispatch({
      type: "GET_REPOS",
      payload: this.props.gitHub.data.login,
    });
  };
  handleChange = (event) => {
    this.setState({
      userName: event.target.value,
    });
  };
  sendUserName = () => {
    this.props.dispatch({
      type: "FETCH_GITHUB_USER",
      payload: this.state.userName,
    });
  };

  render() {
    return (
      <>
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
            />
            <button
              className="register-form-button button-ghost"
              onClick={this.sendUserName}
            >
              Search user
            </button>
          </div>
        </div>
        {/* <div className="apiResults">{this.Question()}</div> */}

        {this.props.gitHub.loaded &&
        this.props.repos.loaded &&
        this.props.repoFiles.loaded ? (
          <QuestionThree />
        ) : this.props.gitHub.loaded &&
          this.props.repos.loaded &&
          !this.props.repoFiles.loaded ? (
          <QuestionTwo />
        ) : this.props.gitHub.loaded &&
          !this.props.repos.loaded &&
          !this.props.repoFiles.loaded ? (
          <QuestionOne />
        ) : null}
      </>
    );
  }
}

// Instead of taking everything from state, we just want the user info.
const mapStateToProps = (state) => ({
  user: state.user,
  lesson: state.lessonText,
  gitHub: state.apiReducer,
  repoFiles: state.treeReducer,
  repos: state.reposReducer,
});
export default connect(mapStateToProps)(UserPage);
