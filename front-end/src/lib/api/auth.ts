import apiClient from "../apiClient";

export interface LoginPayload {
  email: string;
  password: string;
}

export interface SignUpPayload {
  name: string;
  email: string;
  password: string;
}

export async function login(payload: LoginPayload) {
  const res = await apiClient.post("/user/login", payload);
  return res.data;
}

export async function logout() {
  const res = await apiClient.post("/user/logout");
  return res.data;
}

export async function signUp(payload: SignUpPayload) {
  const res = await apiClient.post("/user/signup", payload);
  return res.data;
}
