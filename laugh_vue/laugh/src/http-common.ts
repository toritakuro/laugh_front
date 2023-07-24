import axios, { AxiosInstance } from "axios";
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
  response => response,
  error => {
    if (true) {
      store.dispatch('message/showMessage',{
        messages: ['1' ,'2','2'], // TODO返却値からmsgがあれば取り出す
        result: 'warning'
      });  
    }
    return;
    //return Promise.reject(error);
  }
);
export default apiClient;