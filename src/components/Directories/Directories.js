import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

class Directories extends Component {
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
        <div className="directoryFilesWrapper">
          {this.props.directoryTree.data.map((file) => {
            return (
              <Link to={"/lesson"}>
                <p
                  onClick={() =>
                    this.getRepoContent(
                      file.url,
                      "GET_REPO_CONTENT",
                      file.path,
                      "ADD_TO_TEMP"
                    )
                  }
                >
                  {file.path}
                </p>
              </Link>
            );
          })}
        </div>
      </>
    );
  }
}
const mapStateToProps = (state) => ({
  directoryTree: state.directoryTreeReducer,
});
export default connect(mapStateToProps)(Directories);
