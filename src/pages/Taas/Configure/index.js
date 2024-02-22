import React from "react";
import axios from "axios";
export const apiEndpoint = {
  LEGACY: {
    DELETE_NON_PROXY_SUBSCRIPTION_DEV: "DELETE_NON_PROXY_SUBSCRIPTION_DEV",
  },
  MPS: {
    SUPSCRIPTION_PROXY_ACTION: "SUPSCRIPTION_PROXY_ACTION",
    POST_TAAS_OFFSET_RESET: "POST_TAAS_OFFSET_RESET",
    DELETE_MPS_SUBSCRIPTION_DEV: "DELETE_MPS_SUBSCRIPTION_DEV",
  },
};

export const getEndpoint = (type, data, actionState) => {
  switch (type) {
    case apiEndpoint.MPS.SUPSCRIPTION_PROXY_ACTION:
      return axios.get(
        actionState === "START"
          ? `http://localhost:1337/api/starts`
          : `http://localhost:1337/api/stops`
      );

    case apiEndpoint.MPS.POST_TAAS_OFFSET_RESET:
      return data
        ? axios.post(`http://localhost:1337/api/reset-offsets`, {
            data: data,
          })
        : null;
    case apiEndpoint.MPS.DELETE_MPS_SUBSCRIPTION_DEV:
      return axios.delete(
        `http://localhost:1337/api/cluster-subscriptions/${data}`
      );
    case apiEndpoint.LEGACY.DELETE_NON_PROXY_SUBSCRIPTION_DEV:
      return axios.delete(`http://localhost:1337/api/subscriptions/${data}`);

    default:
      return null;
  }
};
