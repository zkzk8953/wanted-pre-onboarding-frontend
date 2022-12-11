import configAxios from "./configAxios";

export default {
  /**
   * 사용자 로그인
   * @param params email, password
   * @returns AxiosResponse 객체
   */
  auth(params: { email: string; password: string }) {
    return configAxios({
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
    return configAxios({
      url: "auth/signup",
      method: "post",
      params,
    });
  },

  /**
   * todo 목록 불러오기
   */
  loadTodoItem() {
    return configAxios({
      url: "/todos",
      method: "get",
    });
  },

  /**
   * todo 아이템 추가
   * @param params todo
   * @returns AxiosResponse 객체
   */
  createTodoItem(params: { todo: string }) {
    return configAxios({
      url: "/todos",
      method: "post",
      params,
    });
  },
};
