import axios from 'axios';
import { CreateReviewRequest, CreateToolRequest } from './types';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5051/api';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: { 'Content-Type': 'application/json' }
});

export const toolsApi = {
  getTools: (search?: string, tags?: string[]) => 
    apiClient.get('/tools', { params: { search, tags } }),
  getTool: (id: string) => apiClient.get(`/tools/${id}`),
  createTool: (data: CreateToolRequest) => apiClient.post('/tools', data),
  getReviews: (toolId: string) => apiClient.get(`/tools/${toolId}/reviews`),
  createReview: (data: CreateReviewRequest) => apiClient.post('/reviews', data)
};