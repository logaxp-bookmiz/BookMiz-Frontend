import { useQuery } from '@tanstack/react-query';
import { statesAndCountriesService } from '@/services/core/statesAndCountries.service';

export const useStatesAndCountries = (countryId?: string | number) => {
  const { data: countries, isLoading: countriesLoading, error: countriesError } = useQuery({
    queryKey: ['countries'],
    queryFn: statesAndCountriesService.countries,
  });

  const { data: states, isLoading: statesLoading, error: statesError } = useQuery({
    queryKey: ['states', countryId],
    queryFn: () => statesAndCountriesService.states(countryId),
    enabled: !!countryId,
  });

  return {
    countries: countries?.data || [],
    states: states?.data || [],
    isLoading: countriesLoading || statesLoading,
    error: countriesError || statesError,
  };
};