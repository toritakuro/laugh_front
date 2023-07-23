import axios, { AxiosInstance } from "axios";
import Vue from 'vue'
import store from "@/store"

const apiClient: AxiosInstance = axios.create({
  baseURL: "http://localhost:8080/",
  headers: {
    "Content-type": "application/json",
    //"Authorization": "Bearer " + store.state.token.idToken,
  },
});

apiClient.interceptors.response.use(
  response => response,
  error => {
    //store.commit('token/saveIdToken', 'your-token-value');
    store.commit('increment'); // incrementミューテーションを呼び出す

    console.log(error);
    return;
    //return Promise.reject(error);
  }
);
export default apiClient;