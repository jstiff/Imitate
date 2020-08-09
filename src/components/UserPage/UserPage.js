import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import LogOutButton from "../LogOutButton/LogOutButton";
import reactDOM from "react-dom";
import TextArea from "../TextArea/TextArea";

class UserPage extends Component {
  // this component doesn't do much to start, just renders some user info to the DOM
  state = {
    input: "",
    // page1: false,
    // page2: false,
  };

  grabTree = (event, repo) => {
    console.log("clicked");
    this.props.dispatch({
      type: "GET_REPO_TREE",
      payload: {
        userName: this.props.gitHub.data.login,
        repoName: repo,
      },
    });
  };

  viewRepos = () => {
    this.props.dispatch({
      type: "GET_REPOS",
      payload: this.props.gitHub.data.login,
    });
  };
  handleChange = (event) => {
    this.setState({
      userName: event.target.value,
    });
  };
  sendUserName = () => {
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
          <h2 className="homeWelcome">
            Welcome {this.props.user.first_name},{" "}
            <span style={{ marginLeft: "10px" }}></span>search GitHub for your
            favorite developer!
          </h2>
          <br />
          <div className="gitHubSearchContainer">
            <input
              className="apiSearchInput"
              onChange={this.handleChange}
              type="text"
            />
            <button
              className="register-form-button button-ghost"
              onClick={this.sendUserName}
            >
              Search user
            </button>
          </div>
        </div>

        <div className="apiResults">
          {this.props.gitHub.success && !this.props.repos.load ? (
            <div className="gitHubCard">
              <h2>
                {this.props.gitHub.data.name} has{" "}
                {this.props.gitHub.data.public_repos} repositories to view.
                Would you like to check any out?
              </h2>

              <button onClick={this.viewRepos} className="register-form-button">
                yes
              </button>
            </div>
          ) : this.props.gitHub.success && this.props.repos.load ? (
            <>
              <h1>Choose one of these repositories</h1>
              <div className="repoGrid">
                {this.props.repos.data.map((repo, index) => {
                  return (
                    <div className="repoContainer">
                      <h3>
                        <div
                          onClick={(event) => this.grabTree(event, repo.name)}
                        >
                          {repo.name}
                          <br />
                          {repo.description} <br />
                          It was mostly written in {repo.language}
                          <br />
                        </div>
                      </h3>
                    </div>
                  );
                })}
              </div>
            </>
          ) : (
            <p></p>
          )}
        </div>
      </>
    );
  }
}

// Instead of taking everything from state, we just want the user info.
const mapStateToProps = (state) => ({
  user: state.user,
  lesson: state.lessonText,
  gitHub: state.apiReducer,
  //name: state.apiReducer.data,
  repos: state.reposReducer,
  //githubUserName: state.apiReducer.data.login,
  poop: "come on man!",
});

// this allows us to use <App /> in index.js
export default connect(mapStateToProps)(UserPage);

// const add = (x)=> {
//   return (y)=>{x + y}
// }
// add(5)(4) (y) =>{5 + y }     connect takes the mapStateToProps function and injects it into another function then calls that new function with UserPage as its argument.
//           (4) => { 5 + 4}
//                    9
