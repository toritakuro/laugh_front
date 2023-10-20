import axios, { AxiosInstance,AxiosResponse } from "axios";
import Vue from 'vue'
import store from "@/store"

const apiClient: AxiosInstance = axios.create({
  baseURL: "http://localhost:8080/",
  headers: {
    "Content-type": "application/json",
  },
});
apiClient.interceptors.request.use(
  function (config) {
    const idToken = store.getters['token/getIdToken'];
    if (idToken) {
      config.headers.Authorization = `Bearer ${idToken}`;
    } else {
      console.log("未定義"); // TODO：エラー処理
    }
    return config;
  }
);
apiClient.interceptors.response.use(
  function (response) {
    // ステータスコードが 2xx の範囲にある場合、この関数が起動します
    // リクエスト データの処理
    if (response.data.message !== undefined) {
      store.dispatch('message/showMessage',{
        messages: [...response.data.message], // TODO返却値からmsgがあれば取り出す
        result: 'teal-darken-1'
      });
    }
    return response;
  },
  function (error) {
    switch (error.response.status) {
      case 400: // バリデーション
      case 401: // バリデーション
      console.log(111);
        const msg = error.response.data.errMsg;
        if (msg !== undefined) {
          const _msg = [];
          for (let key in msg) {
            if (msg.hasOwnProperty(key)) {
              _msg.push(msg[key]);
            }
          }
          store.dispatch('message/showMessage',{
            messages: [..._msg],
            result: 'red-lighten-1'
          });
        }
        break;
      default:
        break
    }
    return error;
  },
);
export default apiClient;