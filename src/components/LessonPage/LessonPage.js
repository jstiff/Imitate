import React, { Component } from "react";
import TextArea from "../TextArea/TextArea";
import { connect } from "react-redux";

// This is one of our simplest components
// It doesn't have local state, so it can be a function component.
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is, so it doesn't need 'connect()'

class LessonPage extends Component {
  render() {
    return (
      <div>
        <h1 className="lessonPageTitle">Lesson Page</h1>
        <TextArea />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  state,
});
export default connect(mapStateToProps)(LessonPage);
