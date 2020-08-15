import React, { Component } from "react";
import { connect } from "react-redux";
//import { Link } from "react-router-dom";
import Comment from "../Comment/Comment";

class HistoryPage extends Component {
  getHistoryData = () => {
    this.props.dispatch({ type: "GET_HISTORY" });
  };

  deleteLessonHist = (id) => {
    console.log("pooop2", id);
    this.props.dispatch({
      type: "DELETE_LESSON_HISTORY",
      payload: id,
    });
  };

  reSetUser = () => {
    this.props.dispatch({
      type: "CLEAR_ON_LOGOUT",
    });
  };

  render() {
    return (
      <div>
        {!this.props.history.loaded ? (
          <>
            <div className="scoreContainer">
              <h1 className="historyScore">
                Great Job!our score was{" "}
                {this.props.temp && this.props.temp.percent_correct}%
              </h1>
              <button
                className="register-form-button-score"
                onClick={this.getHistoryData}
              >
                View your past results
              </button>{" "}
            </div>
          </>
        ) : this.props.history.loaded ? (
          <>
            <div className="historyTitle">
              <h1>These are the repositories you have practiced in the past</h1>
            </div>
            <div className="historyTableWrapper">
              <table className="historyTable">
                <tr>
                  <th>Favorite Programmers</th>
                  <th>Chosen Programmer</th>
                  <th>Repository</th>
                  <th>File in Lesson</th>
                  <th>Date You Practiced</th>
                  <th>Score from lesson</th>
                  <th>Comments</th>
                  <th>edit Comments</th>
                  <th>delete</th>
                </tr>
                {this.props.history.data.map((score) => {
                  return (
                    <tr>
                      <td>
                        <img
                          className="avatar"
                          alt="avatar"
                          src={score.avatar_url}
                        />
                      </td>
                      <td>{score.name}</td>
                      <td>{score.repo_name}</td>
                      <td>{score.file_name}</td>
                      <td>{score.time_stamp}</td>
                      <td>{score.percent_correct}%</td>
                      <td>{score.comments}</td>
                      <Comment id={score.metrics_id} />

                      <td>
                        <button
                          className="historyDelete"
                          onClick={() =>
                            this.deleteLessonHist(score.metrics_id)
                          }
                        >
                          X
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </table>
            </div>
          </>
        ) : (
          <p>loading...</p>
        )}
      </div>
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
export default connect(mapStateToProps)(HistoryPage);
