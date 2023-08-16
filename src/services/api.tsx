import axios, { AxiosInstance, AxiosResponse } from "axios";


const accessHeaderValue = process.env.REACT_APP_ACCESS_HEADER;
const appURL = process.env.REACT_APP_SERVER_URL;


class ApiService {
  private api: AxiosInstance;

  constructor() {
    this.api = axios.create({
      baseURL: appURL,
      timeout: 4000,
    });

    this.setupInterceptors();
  }

  private setupInterceptors() {
    const storedToken =
      localStorage.getItem("user") || sessionStorage.getItem("user");

    if (storedToken) {
      const tokenObject = JSON.parse(storedToken);
      const tokenValue = tokenObject.token;
      this.api.defaults.headers.common["Authorization"] = `${tokenValue}`;

    } else {
      console.log("Token ?????????");
    }

    if (accessHeaderValue) {
      this.api.defaults.headers.common["Access"] = accessHeaderValue;
    }
  }

  async fetchData<T>(endpoint: string): Promise<T> {
    try {
      const response: AxiosResponse<T> = await this.api.get(endpoint);
      return response.data;
    } catch (error) {
      throw new Error("Error fetching data");
    }
  }

  async postData<T>(endpoint: string, data: any): Promise<T> {
    try {
      const response: AxiosResponse<T> = await this.api.post(endpoint, data);
      return response.data;
    } catch (error) {
      throw new Error("Error posting data");
    }
  }

  async putData<T>(endpoint: string, data: any): Promise<T> {
    try {
      const response: AxiosResponse<T> = await this.api.put(endpoint, data);
      return response.data;
    } catch (error) {
      throw new Error("Error updating data");
    }
  }

  async deleteData<T>(endpoint: string): Promise<T> {
    try {
      const response: AxiosResponse<T> = await this.api.delete(endpoint);
      return response.data;
    } catch (error) {
      throw new Error("Error deleting data");
    }
  }
}

export default new ApiService();
