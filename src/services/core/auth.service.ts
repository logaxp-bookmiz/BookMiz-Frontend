import { AuthResponse } from "@/types/api";
import { coreApiClient } from "../api/client";
import { ILogin, IRegister, IVerifyEmail } from "@/types/authService";

export const authService = {
  register: async (data: IRegister): Promise<AuthResponse> => {
    const response = await coreApiClient.post<AuthResponse>('account', data);

    return response;
  },

  verifyEmail: async (data: IVerifyEmail): Promise<AuthResponse> => {
    const response = await coreApiClient.post<AuthResponse>('account/otp/verify', data);
    return response;
  },

  login: async (credentials: ILogin): Promise<AuthResponse> => {
    const response = await coreApiClient.post<AuthResponse>('account/token', credentials);

    // Store tokens in localStorage
    if (response.data.accessToken) {
      localStorage.setItem('accessToken', response.data.accessToken);
    }
    if (response.data.refreshToken) {
      localStorage.setItem('refreshToken', response.data.refreshToken);
    }

    return response;
  },

  logout: async (): Promise<void> => {
    // Clear tokens from localStorage
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
  },
};