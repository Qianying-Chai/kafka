// constants
const SET_PAGINATION = "SET_PAGINATION";
const SET_TAAS_SUB_NONPROXY_DATA = "SET_TAAS_SUB_NONPROXY_DATA";
const SET_TAAS_SUB_PROXY_DATA = "SET_TAAS_SUB_PROXY_DATA";

const initialState = {
  pagination: {
    pageSize: 10,
    page: 1,
    total: 0,
  },
  taasSubNonProxyData: [],
  taasSubProxyData: [],
};

//reducer
const reducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case SET_PAGINATION:
      return { ...state, pagination: payload };
    case SET_TAAS_SUB_NONPROXY_DATA:
      return { ...state, taasSubNonProxyData: payload };
    case SET_TAAS_SUB_PROXY_DATA:
      return { ...state, taasSubProxyData: payload };
    default:
      return state;
  }
};

export default reducer;

//action
export function setPagination(pagination) {
  return {
    type: SET_PAGINATION,
    payload: pagination,
  };
}

export function setTaasSubNonProxyData(taasSubNonProxyData) {
  return {
    type: SET_TAAS_SUB_NONPROXY_DATA,
    payload: taasSubNonProxyData,
  };
}

export function setTaasSubProxyData(taasSubProxyData) {
  return {
    type: SET_TAAS_SUB_PROXY_DATA,
    payload: taasSubProxyData,
  };
}
