import axios from "axios";

axios.defaults.baseURL = "https://drfa-api-0c6557539d5a.herokuapp.com/";
axios.defaults.headers.post["Content-Type"] = "multipart/form-data";
axios.defaults.withCredentials = true;

export const axiosReq = axios.create();
export const axiosRes = axios.create();