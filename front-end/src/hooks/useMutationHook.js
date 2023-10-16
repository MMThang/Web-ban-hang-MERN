import { useMutation } from "@tanstack/react-query";

export const useMutationHook = (callback) => {
  return useMutation({
    mutationFn: callback,
  });
};
