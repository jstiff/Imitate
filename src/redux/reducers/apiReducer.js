const apiReducer = (state = [], action) => {
  if (action.type === "LOAD_INTO_STORE") {
    return [action.payload];
  }
  return state;
};

export default apiReducer;
