import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useMutationHook = (callback, keys) => {
  return useMutation({
    mutationFn: callback,
  });
};
