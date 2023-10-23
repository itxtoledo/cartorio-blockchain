import React, {
  useState,
  createContext,
  useLayoutEffect,
  useRef,
  useCallback,
} from "react";
import jwtDecode from "jwt-decode";
import { Storage } from "../services/Storage";
import { useNavigate } from "react-router-dom";
import cogoToast from "cogo-toast";
import { IUser } from "../hooks/useAuth";

export const TOKEN_KEY = "token";

export interface IAuthContext {
  user: IUser | null;
  setJWT: (jwt?: string) => boolean;
  logout: () => void;
  startup: boolean;
}

export const AuthContext = createContext<IAuthContext | null>(null);

const AuthProvider: React.FC<{ children: React.ReactElement }> = ({
  children,
}) => {
  const fetchLock = useRef(false);
  const navigate = useNavigate();
  const [user, setUser] = useState<IUser | null>(null);
  const [startup, setStartup] = useState(true);

  const getStoredToken = useCallback(() => {
    const token: string = Storage.get(TOKEN_KEY) ?? "";
    setJWT(token);
    setStartup(false);
  }, []);

  useLayoutEffect(() => {
    const withLock = async (cb: () => Promise<void>) => {
      if (!fetchLock.current) {
        fetchLock.current = true;

        await cb();

        fetchLock.current = false;
      }
    };

    withLock(async () => getStoredToken());
  }, [getStoredToken]);

  // send mutation to server to invalidate this token
  const logout = () => {
    Storage.unset(TOKEN_KEY);
    setUser(null);
    cogoToast.success("successfully logout");
    navigate("/");
  };

  const setJWT = (jwt?: string): boolean => {
    const parsedToken = jwt ? jwtDecode<IUser & { exp: number }>(jwt) : null;

    if (parsedToken) {
      Storage.set(TOKEN_KEY, jwt);

      setUser(parsedToken);
      return true;
    }

    return false;
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        setJWT,
        logout,
        startup,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
