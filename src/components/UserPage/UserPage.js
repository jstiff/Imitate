import React, { Component } from "react";
import { connect } from "react-redux";
import LogOutButton from "../LogOutButton/LogOutButton";
import reactDOM from "react-dom";
import TextArea from "../TextArea/TextArea";

class UserPage extends Component {
  // this component doesn't do much to start, just renders some user info to the DOM
  state = {
    input: "",
  };
  handleChange = (event) => {
    this.setState({
      userName: event.target.value,
    });
  };
  handleClick = () => {
    this.props.dispatch({
      type: "FETCH_GITHUB_USER",
      payload: this.state.userName,
    });
  };

  render() {
    return (
      <>
        <div>
          {/* <h1 id="welcome">Welcome, {this.props.user.username}!</h1> */}
          {/* <p>Your ID is: {this.props.user.id}</p>
        <LogOutButton className="log-in" /> */}
          <br />
          <TextArea />
          <input onChange={this.handleChange} type="text" />
          <button onClick={this.handleClick}>Search user</button>
        </div>
        <div>{this.props.gitHub}</div>
      </>
    );
  }
}

// Instead of taking everything from state, we just want the user info.
const mapStateToProps = (state) => ({
  user: state.user,
  lesson: state.lessonText,
  gitHub: state.apiReducer,
});

// this allows us to use <App /> in index.js
export default connect(mapStateToProps)(UserPage);

// const add = (x)=> {
//   return (y)=>{x + y}
// }
// add(5)(4) (y) =>{5 + y }     connect takes the mapStateToProps function and injects it into another function then calls that new function with UserPage as its argument.
//           (4) => { 5 + 4}
//                    9
