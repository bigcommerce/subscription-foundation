import { APP_URL } from "@/constants/common";
import Axios from "axios";
import alertManager from "./alerts";

export const axios = Axios.create({
  baseURL: APP_URL
});

export const sAxios = req => {
  axios.defaults.headers.get.Cookie = req.headers?.cookie ?? {};
  return axios;
};
const errorHandler = async error => {
  alertManager.clear();
  const code = parseInt(error.response && error.response.status, 10);
  if (code === 401) {
    alertManager.add({
      messages: [{ text: "You need to reload this page" }],
      type: "error"
    });
  } else if (code === 403) {
    alertManager.add({
      messages: [{ text: "You do not have permission to do that" }],
      type: "error"
    });
  } else if (code === 422) {
    alertManager.add({
      messages: [
        {
          text: "The given data was invalid."
        }
      ],
      type: "error"
    });
  } else {
    const errorMessage =
      error?.response?.data?.error ??
      error?.response?.message ??
      error?.response?.error?.message ??
      error?.response?.data?.message ??
      error?.response?.data?.errors?.message ??
      "Something went wrong";
    if (errorMessage) {
      alertManager.add({
        messages: [
          {
            text: errorMessage
          }
        ],
        type: "error",
        autoDismiss: true
      });
    }
  }
  throw error;
};
axios.interceptors.response.use(
  response => response,
  error => errorHandler(error)
);
