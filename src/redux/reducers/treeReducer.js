const treeReducer = (state = [], action) => {
  if (action.type === "LOAD_TREE") {
    return action.payload;
  }
  return state;
};

export default treeReducer;
