// import { notifications } from "@mantine/notifications";
import axios, { AxiosError } from "axios";

const defaultRequest = axios.create({
  baseURL: `${import.meta.env.PUBLIC_API_URL}/api/`,
  withCredentials: true,
});

defaultRequest.interceptors.request.use(
  (config) => {
    config.headers["X-Timezone"] =
      Intl.DateTimeFormat().resolvedOptions().timeZone;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

defaultRequest.interceptors.response.use(
  (response) => response,
  (error: AxiosError | Error) => {
    if (axios.isAxiosError(error)) {
      console.log(error.response);

      if (error.response && error.response.status === 401) {
        window.location.href = "/login";
      }

      if (error.response && error.response.status >= 400) {
        // notifications.show({
        //   title: "Error",
        //   color: "red",
        //   message: error.response.data.message,
        // });
      }
    }
    return Promise.reject(error);
  }
);

export { defaultRequest };
