import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getAttendingEvents,
  removeAttendingEvent,
  getCreatedEvents,
  deleteCreatedEvent,
  getInterestedEvents,
  removeInterestedEvent,
} from "@/lib/api/userEvents";

export function useAttendingEvents() {
  return useQuery({
    queryKey: ["attendingEvents"],
    queryFn: getAttendingEvents,
  });
}

export function useRemoveAttendingEvent() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (event_id: number) => removeAttendingEvent(event_id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["attendingEvents"] });
    },
  });
}

export function useCreatedEvents() {
  return useQuery({
    queryKey: ["createdEvents"],
    queryFn: getCreatedEvents,
  });
}

export function useDeleteCreatedEvent() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (event_id: number) => deleteCreatedEvent(event_id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["createdEvents"] });
    },
  });
}

export function useInterestedEvents() {
  return useQuery({
    queryKey: ["interestedEvents"],
    queryFn: getInterestedEvents,
  });
}

export function useRemoveInterestedEvent() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (event_id: number) => removeInterestedEvent(event_id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["interestedEvents"] });
    },
  });
}
