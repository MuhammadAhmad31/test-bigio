import Cookies from "js-cookie";
import { JWTDecoded } from "../types/auth.type";

const token = Cookies.get("token");

export const getToken = () => {
  return token;
};

export const getDecodeToken = (currentToken?: string) => {
  const token = currentToken || getToken();
  let decodeToken: JWTDecoded | null = null;

  try {
    decodeToken = token ? JSON.parse(atob(token.split(".")[1])) : null;
  } catch {
    return null;
  }

  return decodeToken;
};
