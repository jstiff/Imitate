import React, { Component } from "react";
import { connect } from "react-redux";
import LogOutButton from "../LogOutButton/LogOutButton";
import reactDOM from "react-dom";
import "./TextArea.css";

class TextArea extends Component {
  // this component doesn't do much to start, just renders some user info to the DOM

  componentDidMount() {
    document.getElementsByTagName("pre")[0].focus();
    this.setState({
      keyValue: true,
    });
  }
  style = {
    border: "1px solid black",
    height: "auto",
    width: "auto",
    margin: "60px",
    padding: "30px",
  };
  styleWrong = {
    fontSize: "24px",
    padding: "3px",
    backgroundColor: "red",
  };
  styleCorrect = {
    backgroundColor: "green",
    fontSize: "24px",
    padding: "3px",
    borderRadius: "3px",
  };
  styleStart = {
    backgroundColor: "white",
    fontSize: "24px",
    padding: "3px",
  };

  state = {
    keyIndex: 0,
    keyValue: false,
    metrics: {
      correct: 0,
      wrong: 0,
      lessonScore: 0,
    },
  };

  sendMetrics = () => {
    let { correct } = this.state.metrics;
    let { wrong } = this.state.metrics;
    const results = {
      percentCorrect: Math.round(
        (parseInt(correct) / (parseInt(correct) + parseInt(wrong))) * 100
      ),
    };

    this.setState({
      metrics: {
        lessonScore: results.percentCorrect,
      },
    });
    this.props.dispatch({
      type: "ADD_SCORE",
      payload: results.percentCorrect,
    });
  };

  handleKeyPress = (event, index) => {
    console.log("EVENT", event.keyCode, this.state.keyIndex);
    if (event.key === this.props.lesson.data[index]) {
      console.log("sucess");

      this.setState({
        keyIndex: this.state.keyIndex + 1,
        keyValue: true,
        metrics: {
          correct: this.state.metrics.correct + 1,
          wrong: this.state.metrics.wrong,
          lessonLength: this.props.lesson.length,
        },
      });
    } else if (event.key === "Backspace" || event.key === "Delete") {
      console.log("backspace");
      this.setState({
        keyIndex: this.state.keyIndex - 1,
        keyValue: true,
      });
    } else if (
      event.key === "Return" ||
      ("Enter" && this.props.lesson.data[index] == "\n")
    ) {
      event.preventDefault();
      this.setState({
        keyIndex: this.state.keyIndex + 1,
        keyValue: true,
        metrics: {
          correct: this.state.metrics.correct + 1,
          wrong: this.state.metrics.wrong,
          lessonLength: this.props.lesson.length,
        },
      });
    } else if (event.key !== this.props.lesson.data[index]) {
      console.log("wrong");
      this.setState({
        keyValue: false,
        metrics: {
          correct: this.state.metrics.correct,
          wrong: this.state.metrics.wrong + 1,
          lessonLength: this.props.lesson.length,
        },
      });
    }
    event.preventDefault();
  };

  render() {
    return (
      <>
        {JSON.stringify(this.state)}

        <pre
          contentEditable="true"
          className="lessonContainer"
          style={this.style}
          onKeyDown={(event) => this.handleKeyPress(event, this.state.keyIndex)}
        >
          {this.props.lesson.loaded
            ? this.props.lesson.data.map((letter, index) => {
                return (
                  <span
                    style={
                      this.state.keyValue && index === this.state.keyIndex
                        ? this.styleCorrect
                        : !this.state.keyValue && index === this.state.keyIndex
                        ? this.styleWrong
                        : this.styleStart
                    }
                    id={index}
                  >
                    {letter}
                  </span>
                );
              })
            : null}
        </pre>
        <div className="scoreContainer">
          <h1> {this.state.metrics.lessonScore} %</h1>
          <button className="register-form-button" onClick={this.sendMetrics}>
            Calculate percent correct
          </button>
        </div>
      </>
    );
  }
}

// Instead of taking everything from state, we just want the user info.
const mapStateToProps = (state) => ({
  user: state.user,
  //lesson: state.lessonText,
  repos: state.reposReducer,
  lesson: state.contentReducer,
});

// this allows us to use <App /> in index.js
export default connect(mapStateToProps)(TextArea);
