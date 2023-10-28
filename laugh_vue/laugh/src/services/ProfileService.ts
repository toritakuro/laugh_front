import http from "@/http-common";

class ProfileService {

  /** 新規作成 */
  create(data: any): Promise<any> {
    console.log(data);
    return http.post("/profile/register", data);
  }

  send(data: any): Promise<any> {
    console.log(data);
    return http.post("/profile/init", data);
  }
}

export default new ProfileService();