/* Libraries */
import { AxiosResponse } from "axios";
import configAxios from "./configAxios";

export default {
  /**
   * 사용자 로그인
   * @param data email, password
   * @returns AxiosResponse 객체
   */
  auth(data: { email: string; password: string }): Promise<AxiosResponse> {
    return configAxios({
      url: "auth/signin",
      method: "POST",
      data,
    });
  },

  /**
   * 사용자 회원가입
   * @param data email, password
   * @returns AxiosResponse 객체
   */
  userJoin(data: { email: string; password: string }): Promise<AxiosResponse> {
    return configAxios({
      url: "auth/signup",
      method: "POST",
      data,
    });
  },

  /**
   * todo 목록 불러오기
   */
  loadTodoItem(): Promise<AxiosResponse> {
    return configAxios({
      url: "/todos",
      method: "get",
    });
  },

  /**
   * todo 아이템 추가
   * @param data todo
   * @returns AxiosResponse 객체
   */
  createTodoItem(data: { todo: string }): Promise<AxiosResponse> {
    return configAxios({
      url: "/todos",
      method: "post",
      data,
    });
  },

  /**
   * todo 아이템 수정
   * @param id
   * @param data
   * @returns
   */
  editTodoItem(
    id: number,
    data: { todo: string; isCompleted: boolean },
  ): Promise<AxiosResponse> {
    return configAxios({
      url: `/todos/${id}`,
      method: "put",
      data,
    });
  },

  /**
   * todo 아이템 삭제
   * @param id
   * @returns
   */
  deleteTodoItem(id: number): Promise<AxiosResponse> {
    return configAxios({
      url: `/todos/${id}`,
      method: "delete",
    });
  },
};
