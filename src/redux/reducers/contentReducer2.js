const contentReducer2 = (state = { loaded: false }, action) => {
  switch (action.type) {
    case "LOAD_ADDED_CONTENT_INTO_STATE":
      return action.payload;
      break;
    case "CLEAR_ON_LOGOUT":
      return [];
      break;
    default:
      return state;
  }
};
export default contentReducer2;
