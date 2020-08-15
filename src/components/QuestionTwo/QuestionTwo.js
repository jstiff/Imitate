import React, { Component } from "react";
import { connect } from "react-redux";
import reposReducer from "../../redux/reducers/reposReducer";

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
        </div>
        {/* className="repoGrid" */}
        <div className="repositoryContainer">
          <table className="historyTable">
            <tr>
              <th>Repository Name</th>
              <th>Description</th>
              <th>Language Used</th>
              <th>Date last updated</th>
            </tr>
            {this.props.userRepos.data.map((repo, index) => {
              return (
                <tr>
                  <td>
                    <h3
                      className="repoLink"
                      onClick={(event) =>
                        this.grabTree(event, repo.name, repo.id, repo.blobs_url)
                      }
                    >
                      {repo.name}
                    </h3>
                  </td>
                  <td>
                    {repo.description ? (
                      <p>{repo.description}</p>
                    ) : (
                      <p>No description provided</p>
                    )}
                  </td>
                  <td>
                    {repo.language ? (
                      <p>Mostly written in {repo.language}</p>
                    ) : (
                      <p>No Language was determined</p>
                    )}
                  </td>
                  <td>
                    <p>Repo last updated {repo.updated_at}</p>
                  </td>
                </tr>
              );
            })}
          </table>
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
