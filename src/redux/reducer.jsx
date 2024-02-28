import {
  SET_TAAS_SUB_NON_PROXY_PAGINATOR,
  SET_TAAS_SUB_PROXY_PAGINATOR,
  SET_MPS_SUB_PAGINATOR,
  SET_TAAS_SUB_PROXY_SORTER,
  SET_TAAS_SUB_PROXY_FILTER,
  SET_TAAS_SUB_NON_PROXY_DATA,
  SET_TAAS_SUB_PROXY_DATA,
} from "./constant";

const initialState = {
  taasSubProxyPaginator: {
    pageSize: 10,
    page: 1,
    total: 0,
  },

  taasSubNonProxyPaginator: {
    pageSize: 25,
    page: 1,
    total: 0,
  },
  mpsSubPaginator: {
    pageSize: 10,
    page: 1,
    total: 0,
  },

  taasSubProxySorter: {
    sorterKey: "",
    sorterOrder: "",
  },

  taasSubProxyFilter: {
    filterKey: "",
    filterValue: "",
  },

  taasSubNonProxyData: [],
  taasSubProxyData: [],
};

//reducer
const reducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case SET_TAAS_SUB_NON_PROXY_PAGINATOR:
      return { ...state, taasSubNonProxyPaginator: payload };
    case SET_TAAS_SUB_PROXY_PAGINATOR:
      return { ...state, taasSubProxyPaginator: payload };
    case SET_MPS_SUB_PAGINATOR:
      return { ...state, mpsSubPaginator: payload };
    case SET_TAAS_SUB_PROXY_SORTER:
      return { ...state, taasSubProxySorter: payload };
    case SET_TAAS_SUB_PROXY_FILTER:
      return { ...state, taasSubProxyFilter: payload };
    case SET_TAAS_SUB_NON_PROXY_DATA:
      return { ...state, taasSubNonProxyData: payload };
    case SET_TAAS_SUB_PROXY_DATA:
      return { ...state, taasSubProxyData: payload };
    default:
      return state;
  }
};

export default reducer;
