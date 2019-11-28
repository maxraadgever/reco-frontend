import Axios, { AxiosRequestConfig } from "axios";

class Api {
  constructor() {
    Axios.defaults.withCredentials = true;
    Axios.defaults.baseURL = process.env.REACT_APP_API_URL;
  }

  get(path: string) {
    return Axios.get(path);
  }

  post(path: string, data: any, options?: AxiosRequestConfig) {
    return Axios.post(path, data, options);
  }

  sendFile(path: string, imageFile: any, options?: AxiosRequestConfig) {
    const formData = new FormData();
    formData.append("image", imageFile);
    return Axios.post(path, formData, {
      headers: { "Content-type": "multipart/form-data" },
      ...options
    });
  }

  open(path: string) {
    window.open(process.env.REACT_APP_API_URL + path, "_blank");
  }
}

export const api = new Api();
