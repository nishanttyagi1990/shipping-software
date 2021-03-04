import axios from "axios";
import {
  CUSTOME_PACKAGING_FETCH,
  CUSTOME_PROMOTIONAL_FETCH,
} from "../constants";

export const BASE_URL = "https://api.shiphype.com/api/";
const dataFetch = (data, type) => ({
  type,
  data,
});

export const fetchCustomePackagingAction = (userid, packaggingtypeid) => (
  dispatch
) => {
  axios({
    method: "post",
    url: BASE_URL + "Packaging/Fetch",
    headers: {
      "Content-Type": "application/json",
    },
    data: {
      userid: userid,
      packaggingtypeid: packaggingtypeid,
    },
  }).then((response) => {
    console.log(response);
    dispatch(dataFetch(response.data.data, CUSTOME_PACKAGING_FETCH));
    return Promise.resolve();
  });
};

export const fetchCustomePromotionalAction = (userid, packaggingtypeid) => (
  dispatch
) => {
  axios({
    method: "post",
    url: BASE_URL + "Packaging/Fetch",
    headers: {
      "Content-Type": "application/json",
    },
    data: {
      userid: userid,
      packaggingtypeid: packaggingtypeid,
    },
  }).then((response) => {
    console.log(response);
    dispatch(dataFetch(response.data.data, CUSTOME_PROMOTIONAL_FETCH));
    return Promise.resolve();
  });
};
