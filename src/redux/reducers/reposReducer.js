const reposReducer = (state = [], action) => {
  if (action.type === "LOAD_REPOS") {
    return action.payload;
  }
  return state;
};

export default reposReducer;
