import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getAttendingEvents,
  removeAttendingEvent,
  getCreatedEvents,
  getHistoryEvents,
  deleteCreatedEvent,
  getInterestedEvents,
  removeInterestedEvent,
} from "@/lib/api/userEvents";

export function useAttendingEvents() {
  return useQuery({
    queryKey: ["attendingEvents"],
    queryFn: getAttendingEvents,
    refetchOnMount: 'always',
    staleTime: 0,
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

export function useHistoryEvents() {
  return useQuery({
    queryKey: ["historyEvents"],
    queryFn: getHistoryEvents,
  })
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
    refetchOnMount: 'always',
    staleTime: 0,
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
