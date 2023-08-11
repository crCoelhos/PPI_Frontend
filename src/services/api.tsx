import axios, { AxiosInstance, AxiosResponse } from "axios";

class ApiService {
  private api: AxiosInstance;

  constructor() {
    this.api = axios.create({
      baseURL: "http://localhost:3000",
      timeout: 10000,
    });

    const storedToken =
      localStorage.getItem("user") || sessionStorage.getItem("user");

    if (storedToken) {
      const tokenObject = JSON.parse(storedToken);
      const tokenValue = tokenObject.token;

      console.log("rogerio");
      console.log(tokenValue);

      this.api.defaults.headers.common[
        "Authorization"
      ] = `${tokenValue}`;
    } else {
      console.log("Token ?????????");
    }

    const accessHeaderValue = process.env.REACT_APP_ACCESS_HEADER;
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
}

export default new ApiService();
