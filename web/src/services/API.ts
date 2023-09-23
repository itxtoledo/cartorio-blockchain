import axios, { AxiosError, AxiosInstance } from "axios";
import {
  BaseApiError,
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
    const res = await this.api.post<LoginResponse>("/auth/login", parameters);

    return res.data;
  }

  async register(parameters: RegisterParameters) {
    const res = await this.api.post<RegisterResponse>(
      "/auth/register",
      parameters
    );

    return res.data;
  }

  async lostPassword(parameters: LostPasswordParameters) {
    const res = await this.api.post<GenericResponse>(
      "/auth/lost-password",
      parameters
    );

    return res.data;
  }

  async resetPassword(parameters: ResetPasswordParameters) {
    const res = await this.api.post<GenericResponse>(
      "/auth/reset-password",
      parameters
    );

    return res.data;
  }
}

export const parseAxiosErrorMessage = (error: AxiosError) => {
  return (error as AxiosError<BaseApiError>).response?.data.message;
};
