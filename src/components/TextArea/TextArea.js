import React, { Component } from "react";
import { connect } from "react-redux";
import LogOutButton from "../LogOutButton/LogOutButton";
import reactDOM from "react-dom";
//import "./TextArea.css";

class TextArea extends Component {
  // this component doesn't do much to start, just renders some user info to the DOM
  componentDidMount() {
    document.getElementsByTagName("pre")[0].focus();

    let code = reactDOM.findDOMNode(this);
    console.log("onload DOMnode", code);
    this.setState({
      keyValue: true,
    });
  }
  style = {
    border: "1px solid black",
    height: "200px",
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
      lessonLength: this.props.lesson.length,
    },
  };

  sendMetrics = () => {
    const results = {
      percentCorrect:
        this.props.lesson.length / this.state.metrics.correct -
        this.state.metrics.wrong,
      percentWrong: this.props.lesson.length / this.state.metrics.wrong,
    };
    //   this.props.dispatch({
    //       type: "RESULTS",
    //       payload: this.state.metrics
    //   })
    console.log("metrics!!!!", this.state.metrics);
    console.log("results!!!!", results);
  };

  handleKeyPress = (event, index) => {
    console.log("event.key", event.key, this.state.keyIndex);
    if (event.key === this.props.lesson[index]) {
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
    } else if (event.key !== this.props.lesson[index]) {
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
          {this.props.lesson.map((letter, index) => {
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
          })}
          <h3>{this.props.lesson.length}</h3>
        </pre>
        <button onClick={this.sendMetrics}>poop</button>
      </>
    );
  }
}

// Instead of taking everything from state, we just want the user info.
const mapStateToProps = (state) => ({
  user: state.user,
  lesson: state.lessonText,
});

// this allows us to use <App /> in index.js
export default connect(mapStateToProps)(TextArea);
