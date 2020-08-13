const tempReducer = (state = [], action) => {
  switch (action.type) {
    case "LOAD_INTO_TEMP":
      return [...state, action.payload];
      break;
    case "CLEAR_ON_LOGOUT":
      return [];
      break;
    default:
      return state;
  }
};
export default tempReducer;
