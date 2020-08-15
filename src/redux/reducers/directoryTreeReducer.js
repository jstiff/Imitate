const directoryTreeReducer = (state = { loaded: false }, action) => {
  switch (action.type) {
    case "LOAD_SECOND_TREE_INTO_STATE":
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

export default directoryTreeReducer;
