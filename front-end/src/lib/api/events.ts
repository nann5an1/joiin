import apiClient from "../apiClient";

export interface EventFilters {
  recent?: boolean;
  nearest?: boolean;
  popular?: boolean;
  free?: boolean;
  all?: boolean;
}

export async function getAllEvents(filters: EventFilters = {}) {
  const params = new URLSearchParams();
  if (filters.recent) params.append("recent", "true");
  if (filters.nearest) params.append("nearest", "true");
  if (filters.popular) params.append("popular", "true");
  if (filters.free) params.append("free", "true");
  if (!filters.recent && !filters.nearest && !filters.popular && !filters.free) {
    params.append("all", "true");
  }
  const res = await apiClient.get(`/events/allevents?${params}`);
  return res.data;
}

export async function searchEvents(search: string) {
  const res = await apiClient.get(`/events/search_events?search=${search}`);
  return res.data;
}

export async function getFeaturedEvents() {
  const res = await apiClient.get("/events/featured_events");
  return res.data;
}

export async function getEventDetails(event_id: string | number) {
  const res = await apiClient.get(`/events/event_details?event_id=${event_id}`);
  return res.data;
}

export async function joinEvent(event_id: number) {
  const params = new URLSearchParams({ event_id: event_id.toString() });
  const res = await apiClient.post(`/events/join_events?${params}`);
  return res.data;
}

export async function addInterestedEvent(event_id: number) {
  const params = new URLSearchParams({ event_id: event_id.toString() });
  const res = await apiClient.post(`/events/interested_events?${params}`);
  return res.data;
}

export async function createEvent(formData: FormData) {
  const res = await apiClient.post("/events/create", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
}

export async function getYourEvents() {
  const res = await apiClient.get("/events/yourevents");
  return res.data;
}
