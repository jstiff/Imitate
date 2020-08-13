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
        <h1>
          Your score was {this.props.temp && this.props.temp.percent_correct}
        </h1>
        <button onClick={this.getHistoryData}>History</button>

        {this.props.history.loaded ? (
          <>
            <h1>History page</h1>
            <table>
              <tr>
                <th>Data lesson was completed</th>
                <th>Percent correct</th>
                <th>edit</th>
              </tr>
              {this.props.history.data.map((score) => {
                return (
                  <tr>
                    <td>{score.time_stamp}</td>
                    <td>{score.percent_correct}</td>
                    <td>
                      <button>click</button>
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
