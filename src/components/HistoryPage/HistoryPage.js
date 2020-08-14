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
        {this.props.temp &&
          this.props.temp.percent_correct &&
          !this.props.history.loaded}{" "}
        ?
        <h1 className="historyScore">
          Your score was {this.props.temp && this.props.temp.percent_correct}
        </h1>
        <button className=".register-form-button" onClick={this.getHistoryData}>
          View your past results
        </button>{" "}
        :
        {this.props.history.loaded ? (
          <>
            <h1>History page</h1>
            <table>
              <tr>
                <th>Avatar</th>
                <th>Chosen Programmer</th>
                <th>Repository</th>
                <th>File in Lesson</th>
                <th>Date You Practiced</th>
                <th>Score from lesson</th>
                <th>Comments</th>
                <th>edit Comments</th>
                <th>edit</th>
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
                    <td>file</td>
                    <td>{score.time_stamp}</td>
                    <td>{score.percent_correct}%</td>
                    <td>{score.comments}</td>
                    <Comment id={score.metrics_id} />

                    <td>
                      <button
                        onClick={() => this.deleteLessonHist(score.metrics_id)}
                      >
                        delete
                      </button>
                    </td>
                  </tr>
                );
              })}
            </table>
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
