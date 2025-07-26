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
      // Check for logical API errors (success: false)
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
        err && typeof err === 'object' && 'message' in err
          ? String((err as { message?: unknown }).message)
          : 'Request failed'
      );
      if (onError) onError(err);
      return null;
    }
  };

  return { postData, loading, error };
} 