import React, { Component } from "react";
import { connect } from "react-redux";
//import "./RegisterPage.css";

class RegisterPage extends Component {
  state = {
    first_name: "",
    email: "",
    username: "",
    password: "",
  };

  registerUser = (event) => {
    event.preventDefault();

    if (
      this.state.username &&
      this.state.password &&
      this.state.first_name &&
      this.state.email
    ) {
      this.props.dispatch({
        type: "REGISTER",
        payload: {
          first_name: this.state.first_name,
          email: this.state.email,
          username: this.state.username,
          password: this.state.password,
        },
      });
    } else {
      this.props.dispatch({ type: "REGISTRATION_INPUT_ERROR" });
      alert("Please fill in all feilds");
    }
  }; // end registerUser

  handleInputChangeFor = (propertyName) => (event) => {
    this.setState({
      [propertyName]: event.target.value,
    });
  };

  render() {
    return (
      <div>
        {this.props.errors.registrationMessage && (
          <h2 className="alert" role="alert">
            {this.props.errors.registrationMessage}
          </h2>
        )}
        <div className="container">
          <form className="" onSubmit={this.registerUser}>
            <h1>Register User</h1>
            <div className="register-form">
              <label htmlFor="First name">
                First name:
                <input
                  type="text"
                  name="name"
                  value={this.state.first_name}
                  onChange={this.handleInputChangeFor("first_name")}
                />
              </label>
            </div>
            <div className="register-form">
              <label htmlFor="email">
                email:
                <input
                  type="text"
                  name="email"
                  value={this.state.email}
                  onChange={this.handleInputChangeFor("email")}
                />
              </label>
            </div>
            <div className="register-form">
              <label htmlFor="username">
                Username:
                <input
                  type="text"
                  name="username"
                  value={this.state.username}
                  onChange={this.handleInputChangeFor("username")}
                />
              </label>
            </div>
            <div className="register-form">
              <label htmlFor="password">
                Password:
                <input
                  type="password"
                  name="password"
                  value={this.state.password}
                  onChange={this.handleInputChangeFor("password")}
                />
              </label>
            </div>
            <div>
              <input
                className="register-form-button button-ghost"
                type="submit"
                name="submit"
                value="Register"
              />
            </div>
          </form>
        </div>
        <center>
          <button
            type="button"
            className="link-button"
            onClick={() => {
              this.props.dispatch({ type: "SET_TO_LOGIN_MODE" });
            }}
          >
            Login
          </button>
        </center>
      </div>
    );
  }
}

// Instead of taking everything from state, we just want the error messages.
// if you wanted you could write this code like this:
// const mapStateToProps = ({errors}) => ({ errors });
const mapStateToProps = (state) => ({
  errors: state.errors,
});

export default connect(mapStateToProps)(RegisterPage);
