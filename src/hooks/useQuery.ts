import { useQuery, useMutation, useQueryClient, UseQueryOptions, UseMutationOptions } from '@tanstack/react-query';

// 기본 쿼리 훅
export const useCustomQuery = <TData, TError = Error>(
  queryKey: string[],
  queryFn: () => Promise<TData>,
  options?: Omit<UseQueryOptions<TData, TError>, 'queryKey' | 'queryFn'>
) => {
  return useQuery({
    queryKey,
    queryFn,
    ...options,
  });
};

// 기본 뮤테이션 훅
export const useCustomMutation = <TData, TError = Error, TVariables = unknown>(
  mutationFn: (variables: TVariables) => Promise<TData>,
  options?: Omit<UseMutationOptions<TData, TError, TVariables>, 'mutationFn'>
) => {
  return useMutation({
    mutationFn,
    ...options,
  });
};

// 쿼리 클라이언트 훅
export const useCustomQueryClient = () => {
  return useQueryClient();
}; 