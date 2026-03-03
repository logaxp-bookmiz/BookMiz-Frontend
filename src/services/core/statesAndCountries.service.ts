import { AuthResponse } from "@/types/api";
import { coreApiClient } from "../api/client";

export const statesAndCountriesService = {
  countries: async (): Promise<AuthResponse> => {
    const response = await coreApiClient.get<AuthResponse>('base/country');
    return response;
  },

  states: async (countryId: string | number): Promise<AuthResponse> => {
    const response = await coreApiClient.get<AuthResponse>(`base/state?countryId=${countryId}`);
    return response;
  },
};