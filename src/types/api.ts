export interface AuthResponse {
  statusCode: number;
  message: string;
  data: any;
}

export interface ApiError {
  message: string;
  code?: string;
  status?: number;
  errors?: Record<string, string[]>;
}
