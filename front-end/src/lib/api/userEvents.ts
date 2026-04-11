import apiClient from "../apiClient";

export async function getAttendingEvents() {
  const res = await apiClient.get("/user/attend_events");
  return res.data;
}

export async function removeAttendingEvent(event_id: number) {
  const params = new URLSearchParams({ event_id: event_id.toString() });
  const res = await apiClient.delete(`/user/remove_attending_events?${params}`);
  return res.data;
}

export async function getCreatedEvents() {
  const res = await apiClient.get("/user/created_events");
  return res.data;
}

export async function getHistoryEvents(){
  const res = await apiClient.get("/user/history_events");
  return res.data;
}

export async function deleteCreatedEvent(event_id: number) {
  const res = await apiClient.delete(`/user/del_created_event?event_id=${event_id}`);
  return res.data;
}

export async function getInterestedEvents() {
  const res = await apiClient.get("/user/interested_events");
  return res.data;
}

export async function removeInterestedEvent(event_id: number) {
  const params = new URLSearchParams({ event_id: event_id.toString() });
  const res = await apiClient.delete(`/user/del_interested_event?${params}`);
  return res.data;
}
