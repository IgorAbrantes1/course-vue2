export const configApi = {
  baseURL: "http://localhost:3000",
  withCredentials: false,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    "X-Requested-With": "XMLHttpRequest",
  },
  validateStatus: (status) => status < 500,
  timeout: 5000,
  timeoutErrorMessage: "Tempo limite de conexão",
};
