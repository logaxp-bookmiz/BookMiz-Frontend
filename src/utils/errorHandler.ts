import { ApiError } from "@/types/api";
import { AxiosError } from "axios";

export function handleApiError(error: unknown): ApiError {
  if (error instanceof AxiosError) {
    const apiError: ApiError = {
      message: error.response?.data?.message || 'An error occurred',
      code: error.response?.data?.code,
      status: error.response?.status,
      errors: error.response?.data?.errors,
    };
    return apiError;
  }

  return {
    message: 'An unexpected error occurred',
  };
}