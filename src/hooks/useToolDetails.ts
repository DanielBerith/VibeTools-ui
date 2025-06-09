import { useQuery } from '@tanstack/react-query';
import { toolsApi } from '../services/api';

export const useToolDetails = (toolId: string) => {
  return useQuery({
    queryKey: ['tool', toolId],
    queryFn: () => toolsApi.getTool(toolId),
    select: (response) => response.data,
    enabled: !!toolId,
  });
};