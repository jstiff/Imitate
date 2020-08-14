import React, { Component } from "react";
import { connect } from "react-redux";

class Comment extends Component {
  state = {
    input: "",
  };
  handleChange = (event) => {
    this.setState({
      input: event.target.value,
    });
  };
  sendComment = () => {
    this.props.dispatch({
      type: "EDIT_COMMENTS",
      payload: {
        comment: this.state.input,
        id: this.props.id,
      },
    });
  };
  render() {
    return (
      <>
        <td className="commentContainer">
          <textarea
            onChange={this.handleChange}
            placeholder="comments"
          ></textarea>
          <button className="comment-button" onClick={this.sendComment}>
            Update
          </button>
        </td>
      </>
    );
  }
}
const mapStateToProps = (state) => ({
  user: state.user,
  //lesson: state.lessonText,
  gitHub: state.apiReducer,
  history: state.historyReducer,
  temp: state.tempReducer[3],
});
export default connect(mapStateToProps)(Comment);
