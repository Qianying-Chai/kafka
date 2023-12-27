import { SET_ITEMS_KEY } from "./constants";
export function setItemsKey(itemsKey) {
  return {
    type: SET_ITEMS_KEY,
    payload: itemsKey,
  };
}
