import { useQuery, useMutation } from "@tanstack/react-query";
import { isEnabledMFA, setMFA, verifyMFA } from "@/lib/api/mfa";

export function useIsEnabledMFA() {
  return useQuery({
    queryKey: ["mfaEnabled"],
    queryFn: isEnabledMFA,
  });
}

export function useSetMFA() {
  return useMutation({
    mutationFn: () => setMFA(),
  });
}

export function useVerifyMFA() {
  return useMutation({
    mutationFn: ({ token, user_id }: { token: string; user_id?: string }) =>
      verifyMFA(token, user_id),
  });
}
