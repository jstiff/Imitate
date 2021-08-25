const startState = {
  authenticated: false,
  user_profile: {},
};

const oAuth_reducer = (state = startState, action) => {
  switch (action.type) {
    case "SET_USER_TO_AUTHENTICATED": {
      return {
        ...state,
        authenticated: action.payload.authenticated,
        user_profile: action.payload.user.profile._json,
      };
    }

    case "LOGOUT_REDUCER": {
      localStorage.clear();
      return {
        ...state,
        isLoggedIn: false,
        user: null,
      };
    }

    default:
      return state;
  }
};

export default oAuth_reducer;
