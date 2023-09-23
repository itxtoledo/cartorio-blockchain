import { useMemo } from "react";
import { API } from "../services/API";

export const useAPI = () => {
  const api = useMemo(() => new API(), []);

  return api;
};
