import { SET_ITEMS_KEY } from "./constants";
const initialState = {
  itemsKey: "",
};
const reducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case SET_ITEMS_KEY:
      return { ...state, itemsKey: payload };
    default:
      return state;
  }
};

export default reducer;
