const reposReducer = (state = { loaded: false }, action) => {
  switch (action.type) {
    case "LOAD_REPOS_INTO_STATE":
      return action.payload;
      break;
    case "CLEAR_ON_LOGOUT":
      return [];
      break;
    case "CLEAR_FOR_NEWUSER":
      return [];
    default:
      return state;
  }
};

export default reposReducer;
