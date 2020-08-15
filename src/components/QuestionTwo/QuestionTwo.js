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
          {/* <h1 className="pageTwoHeader">{this.props.gitHub.data.name}</h1> */}
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

{
  /* <table>
  <tr>
    <th>Repository Name</th>
    <th>Description</th>
    <th>Language Used</th>
    <th>Date last updated</th>
  </tr>
  <tr>
    <td>
      <h2
        onClick={(event) =>
          this.grabTree(event, repo.name, repo.id, repo.blobs_url)
        }
      >
        {repo.name}
      </h2>
    </td>
      <td>{repo.description ? <h3>{repo.description}</h3> : <h3>No description provided</h3> }</td>
      <td>{ repo.language ? <h3>Mostly written in {repo.language}</h3>: <h3>No Language was determined</h3>}</td>
      <td><h3>Repo last updated {repo.updated_at}</h3></td>
  </tr>
</table>; */
}
