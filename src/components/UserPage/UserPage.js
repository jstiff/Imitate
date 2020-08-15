import React, { Component } from "react";
import { connect } from "react-redux";

import LogOutButton from "../LogOutButton/LogOutButton";
import reactDOM from "react-dom";
import TextArea from "../TextArea/TextArea";
import QuestionOne from "../QuestionOne/QuestionOne";
import QuestionTwo from "../QuestionTwo/QuestionTwo";
import QuestionThree from "../QuestionThree/QuestionThree";
import SearchUser from "../SeachUser/SearchUser";
import Directories from "../Directories/Directories";

class UserPage extends Component {
  Question;

  // state = {
  //   input: "",
  // };

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

  render() {
    return (
      <>
        {this.props.directoryTree.loaded &&
        this.props.gitHubUser.loaded &&
        this.props.userRepos.loaded &&
        this.props.repoFiles.loaded ? (
          <>
            <Directories />
          </>
        ) : this.props.gitHubUser.loaded &&
          this.props.userRepos.loaded &&
          this.props.repoFiles.loaded ? (
          <>
            <QuestionThree />
          </>
        ) : this.props.gitHubUser.loaded &&
          this.props.userRepos.loaded &&
          !this.props.repoFiles.loaded ? (
          <QuestionTwo />
        ) : this.props.gitHubUser.loaded &&
          !this.props.userRepos.loaded &&
          !this.props.repoFiles.loaded ? (
          <QuestionOne />
        ) : (
          <SearchUser />
        )}
      </>
    );
  }
}

// Instead of taking everything from state, we just want the user info.
const mapStateToProps = (state) => ({
  user: state.user,
  lesson: state.lessonText,
  gitHubUser: state.apiReducer,
  userRepos: state.reposReducer,
  repoFiles: state.treeReducer,
  content: state.contentReducer,
  directoryTree: state.directoryTreeReducer,
});
export default connect(mapStateToProps)(UserPage);
