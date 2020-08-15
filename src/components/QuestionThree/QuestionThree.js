import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

class QuestionThree extends Component {
  getRepoContent = (url, type, name, type2) => {
    this.props.dispatch({
      type: type,
      payload: url,
    });
    if (type2 === "ADD_TO_TEMP") {
      this.props.dispatch({
        type: "ADD_TO_TEMP",
        payload: {
          file_name: name,
          file_url: url,
        },
      });
    }
  };
  render() {
    return (
      <>
        <div className="fileTreeWrapper">
          {this.props.repoFiles.data.map((file) => {
            return file.type === "blob" ? (
              <Link to={"/lesson"}>
                <div
                  className="blobFile"
                  onClick={() =>
                    this.getRepoContent(
                      file.url,
                      "GET_REPO_CONTENT",
                      file.path,
                      "ADD_TO_TEMP"
                    )
                  }
                >
                  <h2>{file.path}</h2>
                </div>
              </Link>
            ) : file.type === "tree" ? (
              <div className="treeFile">
                <h2
                  className="directoryTitle"
                  onClick={() =>
                    this.getRepoContent(file.url, "GET_ADDITIONAL_TREE")
                  }
                >
                  {file.path}
                </h2>
              </div>
            ) : null;
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
  directories: state.directoryTreeReducer,
});
export default connect(mapStateToProps)(QuestionThree);
