import { SET_PATH_NAME, SET_SELECTED_TAAS_SUBSCRIPTIONS } from "./constants";
const initialState = {
  pathName: "",
  selectedTaasSubscriptions: "nonProxy",
};
const reducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case SET_PATH_NAME:
      return { ...state, pathName: payload };
    case SET_SELECTED_TAAS_SUBSCRIPTIONS:
      return { ...state, selectedTaasSubscriptions: payload };
    default:
      return state;
  }
};

export default reducer;
