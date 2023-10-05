import * as yup from "yup";

export const registerSchema = yup.object({
  email: yup.string().email().required(),
  firstName: yup.string().required(),
  lastName: yup.string().required(),
  password: yup.string().max(256).required(),
});

export const loginSchema = yup.object({
  email: yup.string().email().required(),
  password: yup.string().max(256).required(),
});

export const lostPasswordSchema = yup.object({
  email: yup.string().email().required(),
});

export const resetPasswordSchema = yup.object({
  token: yup.string().required(),
  password: yup.string().max(256).required(),
});
