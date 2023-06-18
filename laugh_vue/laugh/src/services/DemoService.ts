import http from "@/http-common";
// import type Demo from "@/types/Demo";

class DemoService {
  /** 一覧取得 */
  getAll(): Promise<any> {
    return http.get("/demo/list");
  }

  /** 新規作成 */
  create(data: any): Promise<any> {
    return http.post("/demo/insert", data);
  }
}

export default new DemoService();