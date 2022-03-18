export const configApi = {
  baseURL: "https://igorabrantes.com/api",
  withCredentials: false,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    "X-Requested-With": "XMLHttpRequest",
  },
  validateStatus: (status) => status < 500,
  timeout: 5000,
};
