// const apiState = {
//   userState: { data: [], loaded: false },
//   repoState: null,
//   treeState: null,
// };

const apiReducer = (state = { load: false }, action) => {
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
