import { useMutation, useQueryClient } from '@tanstack/react-query';
import { authService } from '@/services/core/auth.service';
import { handleApiError } from '@/utils/errorHandler';
import { toast } from 'sonner';
import { ILogin, IRegister } from '@/types/authService';

export const useRegister = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: IRegister) => authService.register(data),
    onError: (error) => {
      const apiError = handleApiError(error);
      toast.error(apiError.message);
    },
    onSuccess: ({ data }) => {
      localStorage.setItem('token', data.token);
      queryClient.invalidateQueries({ queryKey: ['currentUser'] });
      toast.success('Registration successful!');
    },
  });
};

export const useLogin = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (credentials: ILogin) => authService.login(credentials),
    onError: (error) => {
      const apiError = handleApiError(error);
      toast.error(apiError.message);
    },
    onSuccess: ({ data }) => {
      localStorage.setItem('token', data.token);
      queryClient.invalidateQueries({ queryKey: ['currentUser'] });
      toast.success('Login successful!');
    },
  });
};

export const useLogout = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => authService.logout(),
    onError: (error) => {
      const apiError = handleApiError(error);
      toast.error(apiError.message);
    },
    onSuccess: () => {
      localStorage.removeItem('token');
      queryClient.clear();
      toast.success('Logged out successfully!');
    },
  });
};