import * as yup from "yup";
import {
  loginSchema,
  lostPasswordSchema,
  registerSchema,
  resetPasswordSchema,
} from "../schemas/AuthSchemas";

export type LoginParameters = yup.InferType<typeof loginSchema>;

export interface LoginResponse {
  needCompleteAccount: boolean;
  jwt: string;
}

export type RegisterParameters = yup.InferType<typeof registerSchema>;

export interface RegisterResponse {
  id: string;
}

export type LostPasswordParameters = yup.InferType<typeof lostPasswordSchema>;

export type ResetPasswordParameters = yup.InferType<typeof resetPasswordSchema>;

export interface GenericResponse {
  success: boolean;
}

export interface BaseApiError {
  message: string;
}
