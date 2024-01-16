export interface JWTDecoded {
    id: number;
    email: string;
}

export interface AuthLoginForm {
    email: string;
    password: string;
}

export interface AuthLoginResponse {
    token: string;
  }