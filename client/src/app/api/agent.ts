import axios, { AxiosError, AxiosResponse } from "axios";
import { toast } from "react-toastify";
import history from "@/history";
import { PaginatedResponse } from "../models/pragination.inteface";

axios.defaults.baseURL = "http://localhost:5000/api/";
axios.defaults.withCredentials = true;

const sleep = (delay: number) =>
  new Promise((resolve) => setTimeout(resolve, delay));
const responseBody = (response: AxiosResponse) => response.data;

axios.interceptors.response.use(
  async (response) => {
    await sleep(500);
    const pagination = response.headers["pagination"];
    if (pagination)
      response.data = new PaginatedResponse(
        response.data,
        JSON.parse(pagination)
      );
    return response;
  },
  (error: AxiosError) => {
    const { data, status }: { data: any; status: number } = error.response!;
    switch (status) {
      case 400:
        if (data.errors) {
          const modalStateErrors: string[] = [];
          for (const key in data.errors) {
            if (data.errors[key]) {
              modalStateErrors.push(data.errors[key]);
            }
          }
          throw modalStateErrors.flat();
        }
        toast.error(data.title);
        break;
      case 401:
        toast.error(data.title);
        break;
      case 500:
        history.push("/server-error", { error: data });
        toast.error(data.title);
        break;
      default:
        break;
    }
    return Promise.reject(error);
  }
);

const requests = {
  get: (url: string, params?: URLSearchParams) =>
    axios.get(url, { params }).then(responseBody),
  post: (url: string, body: {}) => axios.post(url, body).then(responseBody),
  put: (url: string, body: {}) => axios.put(url, body).then(responseBody),
  del: (url: string) => axios.delete(url).then(responseBody),
};

const Catalog = {
  list: (params: URLSearchParams) => requests.get("products", params),
  details: (id: number) => requests.get(`products/${id}`),
  fetchFilters: () => requests.get("products/filters"),
};

const TestErrors = {
  get404: () => requests.get("buggy/not-found"),
  get500: () => requests.get("buggy/server-error"),
  get400: () => requests.get("buggy/bad-request"),
  get400ValidationError: () => requests.get("buggy/validation-error"),
  get401: () => requests.get("buggy/unauthorized"),
};

const Basket = {
  get: () => requests.get("basket"),
  addItem: (productId: number, quantity: number = 1) =>
    requests.post(`basket?productId=${productId}&quantity=${quantity}`, {}),
  removeItem: (productId: number, quantity: number = 1) =>
    requests.del(`basket?productId=${productId}&quantity=${quantity}`),
};

const agent = {
  Catalog,
  TestErrors,
  Basket,
};

export default agent;
