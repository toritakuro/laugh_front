import http from "@/http-common";
// import type User from "@/types/User";

class LoginService {
  /** ログインユーザー認証 */
  getLoginUser(email: string, password: string): Promise<any> {
    return http.post("/login", { email, password });
  }
}

export default new LoginService();
