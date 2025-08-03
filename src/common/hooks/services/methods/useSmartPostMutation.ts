import { useState } from 'react';
import { useRawPostMutation, UsePostMutationOptions } from './usePOSTMutation';

export interface UsePOSTDataOptions<T, B> extends UsePostMutationOptions<T, B> {
  onSuccess?: (data: T, variables: B) => void;
  onError?: (error: unknown) => void;
}

/**
 * usePOSTData is a higher-level wrapper around useRawPostMutation.
 * and exposes loading and error for ergonomic use in components.
 *
 * @param url - The endpoint to POST to
 * @param options - Optional mutation options
 */
export function usePOSTData<T, B = unknown>(
  url: string,
  options: UsePOSTDataOptions<T, B> = {}
) {
  const { postAsync, loading } = useRawPostMutation<T, B>(url, options);
  const [error, setError] = useState<string | null>(null);
  const { onSuccess, onError } = options;

  const postData = async (body: B): Promise<T | null> => {
    setError(null);
    try {
      const result = await postAsync(body);
      if (
        result &&
        typeof result === 'object' &&
        'success' in result &&
        (result as { success: boolean }).success === false
      ) {
        const message =
          'message' in result && typeof (result as { message?: unknown }).message === 'string'
            ? (result as { message: string }).message
            : 'Request failed';
        throw new Error(message);
      }
      if (onSuccess) onSuccess(result, body);
      return result;
    } catch (err: unknown) {
      setError(
        typeof err === 'object' &&
        err !== null &&
        'response' in err &&
        typeof (err as { response: unknown }).response === 'object' &&
        'data' in (err as { response: { data: unknown } }).response &&
        typeof (err as { response: { data: { message: unknown } } }).response.data.message === 'string'
          ? (err as { response: { data: { message: string } } }).response.data.message
          : 'Request failed'
      );
      
      
      
      if (onError) onError(err);
      return null;
    }
  };

  return { postData, loading, error };
} 