const apiReducer = (state = { loaded: false }, action) => {
  switch (action.type) {
    case "LOAD_USER_STATE":
      return action.payload;
      break;
    case "CLEAR_ON_LOGOUT":
      return [];
      break;
    default:
      return state;
  }
};

export default apiReducer;
