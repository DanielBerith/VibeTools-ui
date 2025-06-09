export interface Tool {
  id: string; 
  name: string;
  description: string;
  category: string;
  averageRating: number; 
  isCommunityFavorite: boolean;
  isHidden: boolean;
}

export interface ToolDetails {
  id: string; 
  name: string;
  description: string;
  category: string;
  averageRating: number; 
  isCommunityFavorite: boolean;
  isHidden: boolean;
  reviews: Review[];
}

export interface Review {
  id: number;
  toolId: string;
  rating: number;
  comment: string;
  createdAt: string;
}

export interface CreateToolRequest {
  name: string;
  description: string;
  category: string;
}

export interface CreateReviewRequest {
  toolId: string;
  rating: number;
  comment: string;
}

export interface CreateToolResponse {
  id: string;
}

export interface CreateReviewResponse {
  id: string;
}

// API service types
export interface GetToolsResponse {
  tools: Tool[];
}

export interface GetToolDetailsResponse extends ToolDetails {}

export interface ApiError {
  message: string;
  statusCode?: number;
}