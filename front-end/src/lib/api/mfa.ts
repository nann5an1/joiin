import apiClient from "../apiClient";

export async function isEnabledMFA() {
  const res = await apiClient.get("/user/isEnabledMFA");
  return res.data;
}

export async function setMFA() {
  const res = await apiClient.post("/user/setMFA");
  return res.data;
}

export async function verifyMFA(token: string, user_id?: string) {
  const params = new URLSearchParams({ token });
  if (user_id) params.append("user_id", user_id);
  const res = await apiClient.get(`/user/verifyMFA?${params}`);
  return res.data;
}
