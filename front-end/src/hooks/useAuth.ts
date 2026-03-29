import { useMutation } from "@tanstack/react-query";
import { login, logout, signUp, LoginPayload, SignUpPayload } from "@/lib/api/auth";


export function useLogin() {
  return useMutation({
    mutationFn: (payload: LoginPayload) => login(payload),
  });
}

export function useLogout() {
  return useMutation({
    mutationFn: () => logout(),
  });
}

export function useSignUp() {
  return useMutation({
    mutationFn: (payload: SignUpPayload) => signUp(payload),
  });
}