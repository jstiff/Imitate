const apiReducer = (state = [], action) => {
  switch (action.type) {
    case "LOAD_INTO_STORE":
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
