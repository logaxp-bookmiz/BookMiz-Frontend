export interface AuthResponse {
  code: number;
  status: string;
  data: any;
}

export interface ApiError {
  message: string;
  code?: string;
  status?: number;
  errors?: Record<string, string[]>;
}
