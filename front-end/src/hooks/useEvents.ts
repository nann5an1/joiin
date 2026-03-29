import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getAllEvents,
  searchEvents,
  getFeaturedEvents,
  getEventDetails,
  joinEvent,
  addInterestedEvent,
  createEvent,
  getYourEvents,
  EventFilters,
} from "@/lib/api/events";

export function useAllEvents(filters: EventFilters = {}) {
  return useQuery({
    queryKey: ["allEvents", filters],
    queryFn: () => getAllEvents(filters),
  });
}

export function useSearchEvents(search: string) {
  return useQuery({
    queryKey: ["searchEvents", search],
    queryFn: () => searchEvents(search),
    enabled: search.trim().length > 0,
  });
}

export function useFeaturedEvents() {
  return useQuery({
    queryKey: ["featuredEvents"],
    queryFn: getFeaturedEvents,
  });
}

export function useEventDetails(event_id: string | number | null) {
  return useQuery({
    queryKey: ["eventDetails", event_id],
    queryFn: () => getEventDetails(event_id!),
    enabled: event_id != null,
  });
}

export function useYourEvents() {
  return useQuery({
    queryKey: ["yourEvents"],
    queryFn: getYourEvents,
  });
}

export function useJoinEvent() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (event_id: number) => joinEvent(event_id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["attendingEvents"] });
    },
  });
}

export function useAddInterestedEvent() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (event_id: number) => addInterestedEvent(event_id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["interestedEvents"] });
    },
  });
}

export function useCreateEvent() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (formData: FormData) => createEvent(formData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["yourEvents"] });
      queryClient.invalidateQueries({ queryKey: ["createdEvents"] });
    },
  });
}
