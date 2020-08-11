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
        <h1 className="pageTwoHeader">Choose one of these repositories</h1>
        <div className="repoGrid">
          {/* {JSON.stringify(this.props.repos.data)} */}
          {this.props.userRepos.data.map((repo, index) => {
            return (
              <div className="repoContainer">
                <div>
                  <div>
                    <h2 onClick={(event) => this.grabTree(event, repo.name)}>
                      {repo.name}
                    </h2>
                  </div>
                  <br />
                  {/* {repo.description} <br /> */}
                  {repo.language !== null ? (
                    <h3>It was mostly written in {repo.language}</h3>
                  ) : null}
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
  //repoFiles: state.treeReducer,
  userRepos: state.reposReducer,
});

export default connect(mapStateToProps)(QuestionTwo);
