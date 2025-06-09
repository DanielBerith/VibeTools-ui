import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toolsApi } from '../services/api';
import { Tool, CreateToolRequest } from '../services/types';

export const useTools = (search?: string, tags?: string[]) => {
  return useQuery({
    queryKey: ['tools', search, tags],
    queryFn: () => toolsApi.getTools(search, tags),
    select: (response) => response.data.filter((tool: Tool) => !tool.isHidden),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

export const useCreateTool = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (data: CreateToolRequest) => toolsApi.createTool(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tools'] });
    },
  });
};