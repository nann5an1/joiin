import apiClient from "../apiClient";

export interface UpdateProfilePayload {
  username: string;
  [key: string]: unknown;
}

export interface UpdatePasswordPayload {
  currentPassword: string;
  newPassword: string;
}

export async function getUserName() {
  const res = await apiClient.get("/user/getUserName");
  return res.data;
}

export async function getBriefProfile() {
  const res = await apiClient.get("/user/briefProfile");
  return res.data;
}

export async function getTotalEventCount() {
  const res = await apiClient.get("/user/totalEventCount");
  return res.data;
}

export async function updateProfile(payload: UpdateProfilePayload) {
  const res = await apiClient.put(`/user/updateProfile?username=${payload.username}`, payload);
  return res.data;
}

export async function updatePassword(payload: UpdatePasswordPayload) {
  const res = await apiClient.put("/user/updatePassword", payload);
  return res.data;
}

export async function deleteAccount() {
  const res = await apiClient.delete("/user/deleteAccount");
  return res.data;
}
