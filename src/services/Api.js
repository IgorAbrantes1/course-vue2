import ApiErrorWithResponse from "@/services/ApiErrorWithResponse";
import { configApi } from "@/services/config";
import store from "@/store";
import axios from "axios";
import NProgress from "nprogress";

export default () => {
  let api = axios.create(configApi);

  api.interceptors.request.use((config) => {
    NProgress.start();
    return config;
  });

  api.interceptors.response.use(
    (response) => {
      let message = "";
      let isError = false;

      if (response.status === 422) {
        message = "Erro ao enviar formulário, campos inválidos";
        if (Object.keys(response.data.errors).some((e) => /email/g.test(e))) {
          message = `Email inválido`;
        }
        isError = true;
      }

      if (response.status === 405) {
        message = "Não encontramos o que procura";
        isError = true;
      }

      if (response.status === 404) {
        message = "Não encontramos o que procura";
        isError = true;
      }

      if (response.status === 403) {
        message = response.data.message
          ? response.data.message
          : "Operação não permitida";
        isError = true;
      }

      if (response.status === 401) {
        if (response.data.message === "Unauthenticated.") {
          store.commit("logout");
          window.location.href = "/";
        }
        message = "Permissão negada";
        isError = true;
      }

      if (response.status === 400) {
        if (response.data.message) {
          message = response.data.message;
        } else {
          message = "Requisição inválida";
        }
        isError = true;
      }
      console.log(message);

      if (isError) {
        return Promise.reject(new ApiErrorWithResponse(message, response));
      }

      NProgress.done();
      return response;
    },
    (error) => {
      NProgress.done();
      return Promise.reject(error);
    }
  );

  return api;
};