import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getUserName,
  getBriefProfile,
  getTotalEventCount,
  updateProfile,
  updatePassword,
  deleteAccount,
  UpdateProfilePayload,
  UpdatePasswordPayload,
} from "@/lib/api/user";

export function useUserName() {
  return useQuery({
    queryKey: ["userName"],
    queryFn: getUserName,
  });
}

export function useBriefProfile() {
  return useQuery({
    queryKey: ["briefProfile"],
    queryFn: getBriefProfile,
  });
}

export function useTotalEventCount() {
  return useQuery({
    queryKey: ["totalEventCount"],
    queryFn: getTotalEventCount,
  });
}

export function  useUpdateProfile() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: UpdateProfilePayload) => updateProfile(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["briefProfile"] }); //tell that these queries need to refetched since the previous values are stale by using queryKey
      queryClient.invalidateQueries({ queryKey: ["userName"] });
    },
  });
}

export function useUpdatePassword() {
  return useMutation({
    mutationFn: (payload: UpdatePasswordPayload) => updatePassword(payload),
  });
}

export function useDeleteAccount() {
  return useMutation({
    mutationFn: () => deleteAccount(),
  });
}
