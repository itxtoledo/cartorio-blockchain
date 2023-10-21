import axios, { AxiosError, AxiosInstance } from "axios";
import {
  BaseApiError,
  CheckDocumentResponse,
  GenericResponse,
  LoginParameters,
  LoginResponse,
  LostPasswordParameters,
  RegisterParameters,
  RegisterResponse,
  ResetPasswordParameters,
} from "../types/API";
import { TOKEN_KEY } from "../providers/AuthProvider";
import { Storage } from "./Storage";

export class API {
  private api: AxiosInstance;

  constructor() {
    this.api = axios.create({
      baseURL: import.meta.env.VITE_API_URL,
      timeout: 5000,
    });

    this.api.interceptors.request.use(async (config) => {
      config.headers["authorization"] = `Bearer ${Storage.get(TOKEN_KEY)}`;

      return config;
    });
  }

  async login(parameters: LoginParameters) {
    const res = await this.api.post<LoginResponse>(
      "/v1/auth/login",
      parameters
    );

    return res.data;
  }

  async register(parameters: RegisterParameters) {
    const res = await this.api.post<RegisterResponse>(
      "/v1/auth/register",
      parameters
    );

    return res.data;
  }

  async lostPassword(parameters: LostPasswordParameters) {
    const res = await this.api.post<GenericResponse>(
      "/v1/auth/lost-password",
      parameters
    );

    return res.data;
  }

  async resetPassword(parameters: ResetPasswordParameters) {
    const res = await this.api.post<GenericResponse>(
      "/v1/auth/reset-password",
      parameters
    );

    return res.data;
  }

  async registerDocument(document: File) {
    const formData = new FormData();

    formData.append("file", document);

    const res = await this.api.post<GenericResponse>(
      "/v1/notary/register",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    return res.data;
  }

  async checkDocument(document: File) {
    const formData = new FormData();

    formData.append("file", document);

    const res = await this.api.post<CheckDocumentResponse>(
      "/v1/notary/check",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    return res.data;
  }
}

export const parseAxiosErrorMessage = (error: AxiosError) => {
  return (error as AxiosError<BaseApiError>).response?.data.message;
};
