export const configApi = {
  baseURL: "http://localhost:8000/api",
  withCredentials: false,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    "X-Requested-With": "XMLHttpRequest",
  },
  validateStatus: (status) => status < 500,
  timeout: 5000,
};
