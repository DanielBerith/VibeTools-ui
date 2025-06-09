import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toolsApi } from '../services/api';

export const useReviews = (toolId: string) => {
  return useQuery({
    queryKey: ['reviews', toolId],
    queryFn: () => toolsApi.getReviews(toolId),
    select: (response) => response.data,
    enabled: !!toolId,
  });
};

export const useCreateReview = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: toolsApi.createReview,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['reviews', variables.toolId] });
      queryClient.invalidateQueries({ queryKey: ['tools'] });
      queryClient.invalidateQueries({ queryKey: ['tool', variables.toolId] });
    },
  });
};