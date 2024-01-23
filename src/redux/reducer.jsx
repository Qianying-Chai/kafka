// constants
const SET_TAAS_SUB_NONPROXY_DATA = "SET_TAAS_SUB_NONPROXY_DATA";
const initialState = {
  taasSubNonProxyData: {},
};

//reducer
const reducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case SET_TAAS_SUB_NONPROXY_DATA:
      return { ...state, taasSubNonProxyData: payload };
    default:
      return state;
  }
};

export default reducer;

//action
export function setTaasSubNonProxyData(taasSubNonProxyData) {
  return {
    type: SET_TAAS_SUB_NONPROXY_DATA,
    payload: taasSubNonProxyData,
  };
}
