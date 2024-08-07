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

export function setTaasSubNonProxyPaginator(taasSubNonProxyPaginator) {
  return {
    type: SET_TAAS_SUB_NON_PROXY_PAGINATOR,
    payload: taasSubNonProxyPaginator,
  };
}

export function setTaasSubProxyPaginator(taasSubProxyPaginator) {
  return {
    type: SET_TAAS_SUB_PROXY_PAGINATOR,
    payload: taasSubProxyPaginator,
  };
}

export function setClusterSubPaginator(clusterSubPaginator) {
  return {
    type: SET_CLUSTER_SUB_PAGINATOR,
    payload: clusterSubPaginator,
  };
}

export function setTaasSubProxySorter(taasSubProxySorter) {
  return {
    type: SET_TAAS_SUB_PROXY_SORTER,
    payload: taasSubProxySorter,
  };
}

export function setClusterSubSorter(clusterSubSorter) {
  return {
    type: SET_CLUSTER_SUB_SORTER,
    payload: clusterSubSorter,
  };
}

export function setTaasSubProxyFilter(taasSubProxyFilter) {
  return {
    type: SET_TAAS_SUB_PROXY_FILTER,
    payload: taasSubProxyFilter,
  };
}

export function setClusterSubFilter(clusterSubFilter) {
  return {
    type: SET_CLUSTER_SUB_FILTER,
    payload: clusterSubFilter,
  };
}

export function setTaasSubNonProxyData(taasSubNonProxyData) {
  return {
    type: SET_TAAS_SUB_NON_PROXY_DATA,
    payload: taasSubNonProxyData,
  };
}

export function setTaasSubProxyData(taasSubProxyData) {
  return {
    type: SET_TAAS_SUB_PROXY_DATA,
    payload: taasSubProxyData,
  };
}

export function setClusterSubData(clusterSubData) {
  return {
    type: SET_CLUSTER_SUB_DATA,
    payload: clusterSubData,
  };
}

export function setSelectedSiderKey(selectedSiderKey) {
  return {
    type: SET_SELECTED_SIDER_KEY,
    payload: selectedSiderKey,
  };
}
