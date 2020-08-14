import React, { Component } from "react";
import { connect } from "react-redux";
//import { Link } from "react-router-dom";

class HistoryPage extends Component {
  getHistoryData = () => {
    this.props.dispatch({ type: "GET_HISTORY" });
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
                <th>Comments on the lesson</th>
                <th>edit</th>
                <th>delete</th>
              </tr>
              {this.props.history.data.map((score) => {
                return (
                  <tr>
                    <td>
                      <img alt="avatar" />
                    </td>
                    <td>full name</td>
                    <td>repo</td>
                    <td>file</td>
                    <td>{score.time_stamp}</td>
                    <td>{score.percent_correct}%</td>
                    <td>
                      <textarea placeholder="comments"></textarea>
                    </td>
                    <td>
                      <button>edit</button>
                    </td>
                    <td>
                      <button>delete</button>
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
