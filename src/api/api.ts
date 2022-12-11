import ConfigAxios from "./ConfigAxios";

export default {
  /**
   * 사용자 로그인
   * @param params email, password
   * @returns AxiosResponse 객체
   */
  auth(params: { email: string; password: string }) {
    return ConfigAxios({
      url: "auth/signin",
      method: "post",
      params,
    });
  },

  /**
   * 사용자 회원가입
   * @param params email, password
   * @returns AxiosResponse 객체
   */
  userJoin(params: { email: string; password: string }) {
    return ConfigAxios({
      url: "auth/signup",
      method: "post",
      params,
    });
  },
};
