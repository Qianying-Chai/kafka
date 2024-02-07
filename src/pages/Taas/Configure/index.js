import React from "react";
// import axios from "axios ";

export const apiEndpoint = {
  MPS: {
    SUPSCRIPTION_PROXY_ACTION: "SUPSCRIPTION_PROXY_ACTION",
  },
};

export const getEndpoint = (type, data) => {
  const axios = require("axios");
  switch (type) {
    case apiEndpoint.MPS.SUPSCRIPTION_PROXY_ACTION:
      console.log("type=>", type, data);
      return data
        ? axios({
            method: "POST",
            url: `/api/${data.subscriptionname}s`,
            data: data,
          })
        : null;
    default:
      return null;
  }
};
