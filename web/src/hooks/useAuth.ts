import { useContext } from "react";
import { AuthContext, IAuthContext } from "../providers/AuthProvider";

export interface IUser {
  id: string;
  name: string;
  email: string;
  birthdate: Date;
  createdAt: Date;
  phone: string;
}

export const useAuth = (): IAuthContext => {
  const ctx = useContext(AuthContext);

  return ctx as unknown as IAuthContext;
};
