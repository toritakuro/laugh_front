import axios, { AxiosInstance,AxiosResponse } from "axios";
import Vue from 'vue'
import store from "@/store"

const apiClient: AxiosInstance = axios.create({
  baseURL: "http://localhost:8080/",
  headers: {
    "Content-type": "application/json",
    "Authorization": "Bearer " + store.state.token.idToken,
  },
});

apiClient.interceptors.response.use(
  function (response) {
    // ステータスコードが 2xx の範囲にある場合、この関数が起動します
    // リクエスト データの処理
    if (response.data.data.messages !== undefined) {
      store.dispatch('message/showMessage',{
        messages: [...response.data.data.messages], // TODO返却値からmsgがあれば取り出す
        result: 'success'
      });
    }
    return response;
  },
  function (error) {
    switch (error.response.status) {
      case 400: // バリデーション
        const msg = error.response.data.errMsg;
        if (msg !== undefined) {
          const _msg = [];
          for (let key in msg) {
            if (msg.hasOwnProperty(key)) {
              _msg.push(msg[key]);
              console.log(key + ': ' + msg[key]);
            }
          }
          store.dispatch('message/showMessage',{
            messages: [..._msg],
            result: 'warning'
          });
        }
        break;
      case 401: // バリデーション
      default:
        break
    }
    return error;
  },
);
export default apiClient;