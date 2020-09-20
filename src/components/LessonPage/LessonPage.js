import React, { Component } from "react";
import TextArea from "../TextArea/TextArea";
import { connect } from "react-redux";

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
