import React, { Component } from "react";
import { connect } from "react-redux";

class QuestionThree extends Component {
  render() {
    return (
      <>
        <div>
          {/* {JSON.stringify(this.props.repoFiles)} */}
          {this.props.repoFiles.data.map((file) => {
            return <p>{file.path}</p>;
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
