import { SET_PATH_NAME, SET_SELECTED_TAAS_SUBSCRIPTIONS } from "./constants";
export function setPathName(pathName) {
  return {
    type: SET_PATH_NAME,
    payload: pathName,
  };
}
export function setSelectedTaasSubscriptions(selectedTaasSubscriptions) {
  return {
    type: SET_SELECTED_TAAS_SUBSCRIPTIONS,
    payload: selectedTaasSubscriptions,
  };
}
