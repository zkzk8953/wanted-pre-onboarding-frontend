import axios, { AxiosInstance } from "axios";

type CustomAxiosError = {
  result: boolean;
  message: string;
};

const ConfigAxios: AxiosInstance = axios.create({
  baseURL: "https://pre-onboarding-selection-task.shop",
  headers: {
    "Content-Type": "application/json",
    token: "",
  },
  timeout: 5000,
});

ConfigAxios.interceptors.request.use(
  // eslint-disable-next-line arrow-body-style
  (config) => {
    // 요청 전에 수행할 코드
    return config;
  },
  (error) => {
    // 오류 응답을 보내기 전 수행할 코드
    const customError: CustomAxiosError = {
      result: false,
      message: error.response.data.message,
    };

    return Promise.reject(customError);
  },
);

ConfigAxios.interceptors.response.use(
  // eslint-disable-next-line arrow-body-style
  (response) => {
    // 응답 전에 수행할 코드
    return response;
  },
  (error) => {
    // 오류 응답을 보내기 전 수행할 코드
    const customError: CustomAxiosError = {
      result: false,
      message: error.response.data.message,
    };

    return Promise.reject(customError);
  },
);

export default ConfigAxios;
