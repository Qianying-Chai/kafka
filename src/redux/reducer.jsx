import {
  SET_TAAS_SUB_NON_PROXY_PAGINATOR,
  SET_TAAS_SUB_PROXY_PAGINATOR,
  SET_CLUSTER_SUB_PAGINATOR,
  SET_CLUSTER_SUB_SORTER,
  SET_TAAS_SUB_PROXY_SORTER,
  SET_TAAS_SUB_PROXY_FILTER,
  SET_CLUSTER_SUB_FILTER,
  SET_TAAS_SUB_NON_PROXY_DATA,
  SET_TAAS_SUB_PROXY_DATA,
  SET_CLUSTER_SUB_DATA,
  SET_SELECTED_SIDER_KEY,
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
  clusterSubPaginator: {
    pageSize: 10,
    page: 1,
    total: 0,
  },

  taasSubProxySorter: {
    sorterKey: "",
    sorterOrder: "",
  },

  clusterSubSorter: {
    sorterKey: "",
    sorterOrder: "",
  },
  taasSubProxyFilter: {
    filterKey: "",
    filterValue: "",
  },
  clusterSubFilter: {
    filterKey: "",
    filterValue: "",
  },

  taasSubNonProxyData: [],
  taasSubProxyData: [],
  clusterSubData: [],
  selectedSiderKey: "",
};

//reducer
const reducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case SET_TAAS_SUB_NON_PROXY_PAGINATOR:
      return { ...state, taasSubNonProxyPaginator: payload };
    case SET_TAAS_SUB_PROXY_PAGINATOR:
      return { ...state, taasSubProxyPaginator: payload };
    case SET_CLUSTER_SUB_PAGINATOR:
      return { ...state, clusterSubPaginator: payload };
    case SET_TAAS_SUB_PROXY_SORTER:
      return { ...state, taasSubProxySorter: payload };
    case SET_CLUSTER_SUB_SORTER:
      return { ...state, clusterSubSorter: payload };
    case SET_TAAS_SUB_PROXY_FILTER:
      return { ...state, taasSubProxyFilter: payload };
    case SET_CLUSTER_SUB_FILTER:
      return { ...state, clusterSubFilter: payload };
    case SET_TAAS_SUB_NON_PROXY_DATA:
      return { ...state, taasSubNonProxyData: payload };
    case SET_TAAS_SUB_PROXY_DATA:
      return { ...state, taasSubProxyData: payload };
    case SET_CLUSTER_SUB_DATA:
      return { ...state, clusterSubData: payload };
    case SET_SELECTED_SIDER_KEY:
      return { ...state, selectedSiderKey: payload };
    default:
      return state;
  }
};

export default reducer;
