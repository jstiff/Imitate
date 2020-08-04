import React, { Component } from "react";
import { connect } from "react-redux";
import LogOutButton from "../LogOutButton/LogOutButton";
import reactDOM from "react-dom";
class UserPage extends Component {
  // this component doesn't do much to start, just renders some user info to the DOM
  componentDidMount() {
    let code = reactDOM.findDOMNode(this);
    console.log("onload DOMnode", code);
    this.setState({
      value: true,
    });
    //this.props.lesson[0];
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
  };
  state = {
    keyIndex: 0,
    value: false,
  };
  //key_index = 0;
  handleKeyPress = (event, index) => {
    console.log("event.key", event.key);
    if (event.key == this.props.lesson[index]) {
      console.log("sucess");
      //this.key_index += 1;
      this.setState({
        keyIndex: this.state.keyIndex + 1,
        value: true,
      });
    } else if (event.key == "Backspace" || event.key == "Delete") {
      console.log("backspace");
      this.setState({
        keyIndex: this.state.keyIndex - 1,
      });
    } else {
      console.log("wrong");
    }
    event.preventDefault();
  };

  render() {
    return (
      <div>
        <h1 id="welcome">Welcome, {this.props.user.username}!</h1>
        <p>Your ID is: {this.props.user.id}</p>
        <LogOutButton className="log-in" />
        <br />
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
                  this.state.value && index == this.state.keyIndex
                    ? this.styleCorrect
                    : this.styleWrong
                }
                id={index}
              >
                {letter}
              </span>
            );
          })}
          <h3>{this.props.lesson.length}</h3>
        </pre>
      </div>
    );
  }
}

// Instead of taking everything from state, we just want the user info.
const mapStateToProps = (state) => ({
  user: state.user,
  lesson: state.lessonText,
});

// this allows us to use <App /> in index.js
export default connect(mapStateToProps)(UserPage);
