import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

class QuestionThree extends Component {
  getRepoContent = (url) => {
    this.props.dispatch({
      type: "GET_REPO_CONTENT",
      payload: url,
    });
  };
  render() {
    return (
      <>
        <div className="repoGrid">
          {/* {JSON.stringify(this.props.repoFiles)} */}
          {this.props.repoFiles.data.map((file) => {
            return (
              <Link to={"/lesson"}>
                <div
                  onClick={() => this.getRepoContent(file.url)}
                  className="gitHubCard"
                >
                  <p>{file.path}</p>
                  <br />
                  <p>{file.url}</p>
                </div>
              </Link>
            );
          })}
        </div>
        )
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
export default connect(mapStateToProps)(QuestionThree);
