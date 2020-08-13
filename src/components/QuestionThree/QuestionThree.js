import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

class QuestionThree extends Component {
  getRepoContent = (name, url, type) => {
    this.props.dispatch({
      type: type,
      payload: url,
    });
    this.props.dispatch({
      type: "ADD_TO_TEMP",
      payload: {
        file_name: name,
        file_url: url,
      },
    });
  };
  render() {
    return (
      <>
        <div className="repoGrid">
          {/* {JSON.stringify(this.props.repoFiles)} */}
          {this.props.repoFiles.data.map((file) => {
            return file.type === "blob" ? (
              <Link to={"/lesson"}>
                <div
                  className="gitHubCard"
                  onClick={() =>
                    this.getRepoContent(file.path, file.url, "GET_REPO_CONTENT")
                  }
                >
                  <h2>{file.path}</h2>
                </div>
              </Link>
            ) : file.type === "tree" ? (
              <h2
                onClick={() =>
                  this.getRepoContent(file.url, "GET_ADDITIONAL_TREE_CONTENT")
                }
              >
                click to search further {file.path}
              </h2>
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
});
export default connect(mapStateToProps)(QuestionThree);

{
  /* <Link to={"/lesson"}>
                <div
                  onClick={() =>
                    this.getRepoContent(file.url, "GET_REPO_CONTENT")
                  }
                  className="gitHubCard"
                >
                  <h2>{file.path}</h2>
                  {file.type === "tree" ? (
                    <h3>
                      Tree:a click to search further{" "}
                      <h2
                        onClick={() =>
                          this.getRepoContent(
                            file.url,
                            "GET_ADDITIONAL_TREE_CONTENT"
                          )
                        }
                      >
                        click
                      </h2>
                    </h3>
                  ) : file.type === "blob" ? (
                    <h3>blob</h3>
                  ) : (
                    "yo"
                  )}
                </div>
              </Link> */
}
