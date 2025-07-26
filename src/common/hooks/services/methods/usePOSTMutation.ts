'use client'

import { useMutation } from '@tanstack/react-query';
import baseAPI from '../baseApi';
import axios from 'axios';
import { logError } from '@/common/utils/logError';
import { notify } from '@/common/utils/notify';

export interface UsePostMutationOptions<T, B> {
  withCredentials?: boolean;
}

export const useRawPostMutation = <T, B = unknown>(
  url: string,
  options: UsePostMutationOptions<T, B> = {}
) => {
  const {
    withCredentials = true,
  } = options;

  const mutation = useMutation<T, Error, B>({
    mutationFn: async (body: B) => {
      const res = await baseAPI.post<{ data: T }>(url, body, { withCredentials });
      return res.data.data;
    },
    onSuccess: () => {},
    onError: (error: unknown) => {
      notify.error("Error Submitting the Form")
      if (axios.isAxiosError(error)) {
        logError({
          error: error.response?.data?.message || error.message,
          location: 'src/common/hooks/services/methods/usePOSTMutation',
          when: 'sending form data to server',
        });
      }
    },
  });

  return {
    postAsync: mutation.mutateAsync,
    loading: mutation.isPending,
    data: mutation.data,
    error: mutation.error,
    isSuccess: mutation.isSuccess,
    isError: mutation.isError,
  };
};
