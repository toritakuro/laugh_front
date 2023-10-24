import http from "@/http-common";
import store from "@/store"

class TopService {

  /** 一覧取得 */
  getUserList(userType: number): Promise<any> {
    return http.get("/top/init", {
      params: {
      // パラメーターをここに追加
      userType: userType
      }
    });
  }

  getUserList2(): Promise<any> {
    return http.get("/top/init");
  }
}

export default new TopService();