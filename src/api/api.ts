import axios, { AxiosInstance } from "axios";

type CustomResponseError = {
  result: boolean;
  message: string;
};

const api: AxiosInstance = axios.create({
  baseURL: "https://pre-onboarding-selection-task.shop",
  headers: {
    "Content-Type": "application/json",
    token: "",
  },
  timeout: 5000,
});

api.interceptors.request.use(
  (config) => {
    // 요청 전에 수행할 코드

    return config;
  },
  (error) => {
    // 오류 요청을 보내기 전 수행할 코드

    return Promise.reject(error);
  },
);

api.interceptors.response.use(
  (response) => {
    // 응답 전에 수행할 코드

    return response;
  },
  (error) => {
    // 오류 응답을 보내기 전 수행할 코드
    const customError: CustomResponseError = {
      result: true,
      message: error.response.data.message,
    };

    return Promise.reject(customError);
  },
);

export default api;
