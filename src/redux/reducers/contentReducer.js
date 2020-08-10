const contentReducer = (state = { loaded: false }, action) => {
  switch (action.type) {
    case "LOAD_CONTENT_INTO_STATE":
      return action.payload;
      break;
    default:
      return state;
  }
};
export default contentReducer;
