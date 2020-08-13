import React, { Component } from "react";
import { connect } from "react-redux";

class QuestionTwo extends Component {
  grabTree = (event, repo, id, url) => {
    this.props.dispatch({
      type: "GET_REPO_TREE",
      payload: {
        userName: this.props.gitHub.data.login,
        repoName: repo,
      },
    });
    this.props.dispatch({
      type: "ADD_TO_TEMP",
      payload: {
        repo_name: repo,
        repo_id: id,
        repo_url: url,
      },
    });
  };

  render() {
    return (
      <>
        <div className="avatarWithTitle">
          <img className="avatar" src={this.props.gitHub.data.avatar_url} />
          <h1 className="pageTwoHeader">{this.props.gitHub.data.name}</h1>
        </div>
        <div className="repoGrid">
          {/* {JSON.stringify(this.props.repos.data)} */}
          {this.props.userRepos.data.map((repo, index) => {
            return (
              <div className="repoContainer">
                <div>
                  <div>
                    <h2
                      onClick={(event) =>
                        this.grabTree(event, repo.name, repo.id, repo.blobs_url)
                      }
                    >
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
