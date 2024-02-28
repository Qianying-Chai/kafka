import {
  SET_TAAS_SUB_NON_PROXY_PAGINATOR,
  SET_TAAS_SUB_PROXY_PAGINATOR,
  SET_MPS_SUB_PAGINATOR,
  SET_TAAS_SUB_PROXY_SORTER,
  SET_TAAS_SUB_PROXY_FILTER,
  SET_TAAS_SUB_NON_PROXY_DATA,
  SET_TAAS_SUB_PROXY_DATA,
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

export function setMpsSubPaginator(mpsSubPaginator) {
  return {
    type: SET_MPS_SUB_PAGINATOR,
    payload: mpsSubPaginator,
  };
}

export function setTaasSubProxySorter(taasSubProxySorter) {
  return {
    type: SET_TAAS_SUB_PROXY_SORTER,
    payload: taasSubProxySorter,
  };
}

export function setTaasSubProxyFilter(taasSubProxyFilter) {
  return {
    type: SET_TAAS_SUB_PROXY_FILTER,
    payload: taasSubProxyFilter,
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
