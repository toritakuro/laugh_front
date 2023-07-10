import axios, { AxiosInstance } from "axios";
import store from "@/store"

console.log(store.state.token.idToken);

const apiClient: AxiosInstance = axios.create({
  baseURL: "http://localhost:8080/",
  headers: {
    "Content-type": "application/json",
    "Authorization": "Bearer " + store.state.token.idToken,
  },
});

export default apiClient;