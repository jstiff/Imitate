import React, { Component } from "react";
import { connect } from "react-redux";

class QuestionTwo extends Component {
  grabTree = (event, repo) => {
    this.props.dispatch({
      type: "GET_REPO_TREE",
      payload: {
        userName: this.props.gitHub.data.login,
        repoName: repo,
      },
    });
  };

  render() {
    return (
      <>
        <h1>Choose one of these repositories</h1>
        <div className="repoGrid">
          {/* {JSON.stringify(this.props.repos.data)} */}
          {this.props.repos.data.map((repo, index) => {
            return (
              <div className="repoContainer">
                <div onClick={(event) => this.grabTree(event, repo.name)}>
                  {repo.name}
                  <br />
                  {repo.description} <br />
                  It was mostly written in {repo.language}
                  <br />
                </div>
              </div>
            );
          })}
        </div>
      </>
    );
  }
}
const mapStateToProps = (state) => ({
  user: state.user,
  lesson: state.lessonText,
  gitHub: state.apiReducer,
  repoFiles: state.treeReducer,
  repos: state.reposReducer,
});

export default connect(mapStateToProps)(QuestionTwo);
