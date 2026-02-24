```
bookmiz-frontend/
├── public/
│   ├── images/
│   ├── icons/
│   └── fonts/
│
├── src/
│   ├── app/                                    # Next.js App Router
│   │   ├── (auth)/                            # Auth route group
│   │   │   ├── login/
│   │   │   │   └── page.tsx
│   │   │   ├── register/
│   │   │   │   └── page.tsx
│   │   │   ├── forgot-password/
│   │   │   │   └── page.tsx
│   │   │   └── layout.tsx
│   │   │
│   │   ├── (dashboard)/                       # Dashboard route group
│   │   │   ├── user/                          # User dashboard
│   │   │   │   ├── page.tsx
│   │   │   │   ├── appointments/
│   │   │   │   │   ├── page.tsx
│   │   │   │   │   └── [id]/
│   │   │   │   │       └── page.tsx
│   │   │   │   ├── bookings/
│   │   │   │   │   └── page.tsx
│   │   │   │   ├── profile/
│   │   │   │   │   └── page.tsx
│   │   │   │   └── layout.tsx
│   │   │   │
│   │   │   ├── provider/                      # Service Provider dashboard
│   │   │   │   ├── page.tsx
│   │   │   │   ├── appointments/
│   │   │   │   │   ├── page.tsx
│   │   │   │   │   └── [id]/
│   │   │   │   │       └── page.tsx
│   │   │   │   ├── schedule/
│   │   │   │   │   └── page.tsx
│   │   │   │   ├── services/
│   │   │   │   │   ├── page.tsx
│   │   │   │   │   ├── new/
│   │   │   │   │   │   └── page.tsx
│   │   │   │   │   └── [id]/
│   │   │   │   │       ├── page.tsx
│   │   │   │   │       └── edit/
│   │   │   │   │           └── page.tsx
│   │   │   │   ├── analytics/
│   │   │   │   │   └── page.tsx
│   │   │   │   ├── profile/
│   │   │   │   │   └── page.tsx
│   │   │   │   └── layout.tsx
│   │   │   │
│   │   │   ├── admin/                         # Super Admin dashboard
│   │   │   │   ├── page.tsx
│   │   │   │   ├── users/
│   │   │   │   │   ├── page.tsx
│   │   │   │   │   └── [id]/
│   │   │   │   │       └── page.tsx
│   │   │   │   ├── providers/
│   │   │   │   │   ├── page.tsx
│   │   │   │   │   └── [id]/
│   │   │   │   │       └── page.tsx
│   │   │   │   ├── appointments/
│   │   │   │   │   ├── page.tsx
│   │   │   │   │   └── [id]/
│   │   │   │   │       └── page.tsx
│   │   │   │   ├── services/
│   │   │   │   │   └── page.tsx
│   │   │   │   ├── analytics/
│   │   │   │   │   └── page.tsx
│   │   │   │   ├── settings/
│   │   │   │   │   └── page.tsx
│   │   │   │   └── layout.tsx
│   │   │   │
│   │   │   └── layout.tsx                     # Shared dashboard layout
│   │   │
│   │   ├── api/                               # API Routes
│   │   │   ├── auth/
│   │   │   │   ├── login/
│   │   │   │   │   └── route.ts
│   │   │   │   ├── register/
│   │   │   │   │   └── route.ts
│   │   │   │   ├── logout/
│   │   │   │   │   └── route.ts
│   │   │   │   └── refresh/
│   │   │   │       └── route.ts
│   │   │   │
│   │   │   ├── appointments/
│   │   │   │   ├── route.ts
│   │   │   │   └── [id]/
│   │   │   │       └── route.ts
│   │   │   │
│   │   │   ├── services/
│   │   │   │   ├── route.ts
│   │   │   │   └── [id]/
│   │   │   │       └── route.ts
│   │   │   │
│   │   │   ├── users/
│   │   │   │   ├── route.ts
│   │   │   │   └── [id]/
│   │   │   │       └── route.ts
│   │   │   │
│   │   │   └── providers/
│   │   │       ├── route.ts
│   │   │       ├── [id]/
│   │   │       │   └── route.ts
│   │   │       └── [id]/
│   │   │           └── schedule/
│   │   │               └── route.ts
│   │   │
│   │   ├── providers/                         # Public providers page
│   │   │   ├── page.tsx
│   │   │   └── [id]/
│   │   │       └── page.tsx
│   │   │
│   │   ├── layout.tsx                         # Root layout
│   │   ├── page.tsx                           # Home page
│   │   ├── error.tsx                          # Global error boundary
│   │   └── not-found.tsx                      # 404 page
│   │
│   ├── components/                            # Reusable components
│   │   ├── ui/                                # Basic UI components
│   │   │   ├── button/
│   │   │   │   ├── Button.tsx
│   │   │   │   ├── Button.test.tsx
│   │   │   │   └── index.ts
│   │   │   ├── input/
│   │   │   │   ├── Input.tsx
│   │   │   │   └── index.ts
│   │   │   ├── modal/
│   │   │   │   ├── Modal.tsx
│   │   │   │   └── index.ts
│   │   │   ├── card/
│   │   │   │   ├── Card.tsx
│   │   │   │   └── index.ts
│   │   │   ├── table/
│   │   │   │   ├── Table.tsx
│   │   │   │   └── index.ts
│   │   │   ├── dropdown/
│   │   │   │   ├── Dropdown.tsx
│   │   │   │   └── index.ts
│   │   │   ├── badge/
│   │   │   │   ├── Badge.tsx
│   │   │   │   └── index.ts
│   │   │   └── spinner/
│   │   │       ├── Spinner.tsx
│   │   │       └── index.ts
│   │   │
│   │   ├── layout/                            # Layout components
│   │   │   ├── header/
│   │   │   │   ├── Header.tsx
│   │   │   │   └── index.ts
│   │   │   ├── footer/
│   │   │   │   ├── Footer.tsx
│   │   │   │   └── index.ts
│   │   │   ├── sidebar/
│   │   │   │   ├── Sidebar.tsx
│   │   │   │   ├── UserSidebar.tsx
│   │   │   │   ├── ProviderSidebar.tsx
│   │   │   │   ├── AdminSidebar.tsx
│   │   │   │   └── index.ts
│   │   │   └── navigation/
│   │   │       ├── Navigation.tsx
│   │   │       └── index.ts
│   │   │
│   │   ├── features/                          # Feature-specific components
│   │   │   ├── appointments/
│   │   │   │   ├── AppointmentCard.tsx
│   │   │   │   ├── AppointmentList.tsx
│   │   │   │   ├── AppointmentDetails.tsx
│   │   │   │   ├── AppointmentForm.tsx
│   │   │   │   ├── AppointmentCalendar.tsx
│   │   │   │   ├── AppointmentStatusBadge.tsx
│   │   │   │   └── index.ts
│   │   │   │
│   │   │   ├── bookings/
│   │   │   │   ├── BookingWizard.tsx
│   │   │   │   ├── BookingConfirmation.tsx
│   │   │   │   ├── TimeSlotSelector.tsx
│   │   │   │   ├── ServiceSelector.tsx
│   │   │   │   └── index.ts
│   │   │   │
│   │   │   ├── services/
│   │   │   │   ├── ServiceCard.tsx
│   │   │   │   ├── ServiceList.tsx
│   │   │   │   ├── ServiceForm.tsx
│   │   │   │   ├── ServiceDetails.tsx
│   │   │   │   └── index.ts
│   │   │   │
│   │   │   ├── schedule/
│   │   │   │   ├── ScheduleCalendar.tsx
│   │   │   │   ├── ScheduleForm.tsx
│   │   │   │   ├── TimeSlotManager.tsx
│   │   │   │   └── index.ts
│   │   │   │
│   │   │   ├── analytics/
│   │   │   │   ├── AnalyticsChart.tsx
│   │   │   │   ├── StatsCard.tsx
│   │   │   │   ├── RevenueChart.tsx
│   │   │   │   └── index.ts
│   │   │   │
│   │   │   └── profile/
│   │   │       ├── ProfileForm.tsx
│   │   │       ├── ProfileHeader.tsx
│   │   │       ├── AvatarUpload.tsx
│   │   │       └── index.ts
│   │   │
│   │   ├── forms/                             # Shared form components
│   │   │   ├── FormField.tsx
│   │   │   ├── FormError.tsx
│   │   │   ├── FormSelect.tsx
│   │   │   ├── DatePicker.tsx
│   │   │   ├── TimePicker.tsx
│   │   │   └── index.ts
│   │   │
│   │   └── common/                            # Common components
│   │       ├── LoadingState.tsx
│   │       ├── ErrorState.tsx
│   │       ├── EmptyState.tsx
│   │       ├── PageHeader.tsx
│   │       ├── Breadcrumb.tsx
│   │       └── index.ts
│   │
│   ├── lib/                                   # Library code & utilities
│   │   ├── api/                               # API client setup
│   │   │   ├── client.ts
│   │   │   ├── endpoints.ts
│   │   │   └── index.ts
│   │   │
│   │   ├── swr/                               # SWR configuration
│   │   │   ├── config.ts
│   │   │   ├── fetcher.ts
│   │   │   ├── SWRProvider.tsx
│   │   │   └── index.ts
│   │   │
│   │   ├── auth/                              # Authentication utilities
│   │   │   ├── auth.ts
│   │   │   ├── session.ts
│   │   │   └── index.ts
│   │   │
│   │   ├── utils/                             # Utility functions
│   │   │   ├── date.ts
│   │   │   ├── format.ts
│   │   │   ├── validation.ts
│   │   │   └── index.ts
│   │   │
│   │   └── constants/
│   │       ├── routes.ts
│   │       ├── roles.ts
│   │       └── index.ts
│   │
│   ├── hooks/                                 # Custom React hooks
│   │   ├── swr/                               # SWR data fetching hooks
│   │   │   ├── useAppointments.ts
│   │   │   ├── useAppointment.ts
│   │   │   ├── useServices.ts
│   │   │   ├── useService.ts
│   │   │   ├── useProviders.ts
│   │   │   ├── useProvider.ts
│   │   │   ├── useUsers.ts
│   │   │   ├── useUser.ts
│   │   │   ├── useSchedule.ts
│   │   │   ├── useAnalytics.ts
│   │   │   └── index.ts
│   │   │
│   │   ├── mutations/                         # Mutation hooks (with SWR revalidation)
│   │   │   ├── useCreateAppointment.ts
│   │   │   ├── useUpdateAppointment.ts
│   │   │   ├── useDeleteAppointment.ts
│   │   │   ├── useCreateService.ts
│   │   │   ├── useUpdateService.ts
│   │   │   ├── useDeleteService.ts
│   │   │   ├── useUpdateSchedule.ts
│   │   │   └── index.ts
│   │   │
│   │   ├── useAuth.ts
│   │   ├── useRole.ts
│   │   ├── usePermissions.ts
│   │   ├── useDebounce.ts
│   │   ├── useLocalStorage.ts
│   │   └── index.ts
│   │
│   ├── types/                                 # TypeScript types & interfaces
│   │   ├── api.ts
│   │   ├── appointment.ts
│   │   ├── service.ts
│   │   ├── user.ts
│   │   ├── provider.ts
│   │   ├── schedule.ts
│   │   ├── auth.ts
│   │   ├── common.ts
│   │   └── index.ts
│   │
│   ├── context/                               # React Context providers
│   │   ├── AuthContext.tsx
│   │   ├── ThemeContext.tsx
│   │   └── index.ts
│   │
│   ├── middleware/                            # Next.js middleware
│   │   └── auth.ts
│   │
│   ├── styles/                                # Global styles
│   │   ├── globals.css
│   │   ├── variables.css
│   │   └── themes/
│   │       ├── light.css
│   │       └── dark.css
│   │
│   └── config/                                # Configuration files
│       ├── site.ts
│       ├── navigation.ts
│       └── index.ts
│
├── middleware.ts                              # Root middleware
├── .env.local                                 # Environment variables
├── .env.example                               # Example environment variables
├── next.config.js                             # Next.js configuration
├── tsconfig.json                              # TypeScript configuration
├── tailwind.config.ts                         # Tailwind configuration
├── package.json                               # Dependencies
└── README.md                                  # Project documentation
```

## Key Architecture Decisions

### 1. **Route Organization**
- **Route Groups**: Using `(auth)` and `(dashboard)` for logical grouping
- **Role-Based Routes**: Separate sections for user, provider, and admin
- **Nested Routes**: For detailed views like `appointments/[id]`

### 2. **Component Structure**
- **UI Components**: Atomic, reusable components (Button, Input, etc.)
- **Layout Components**: Header, Footer, Sidebar variations
- **Feature Components**: Domain-specific components organized by feature
- **Form Components**: Shared form elements
- **Common Components**: Utility components like loading states

### 3. **SWR Organization**
SWR hooks are organized in the `hooks/swr/` directory for data fetching, with separate mutation hooks that handle revalidation.

```typescript
// lib/swr/config.ts
import { SWRConfiguration } from 'swr';

export const swrConfig: SWRConfiguration = {
  revalidateOnFocus: false,
  revalidateOnReconnect: true,
  shouldRetryOnError: true,
  errorRetryCount: 3,
  dedupingInterval: 2000,
};

// lib/swr/fetcher.ts
export const fetcher = async (url: string) => {
  const res = await fetch(url);
  
  if (!res.ok) {
    const error = new Error('An error occurred while fetching the data.');
    error.info = await res.json();
    error.status = res.status;
    throw error;
  }
  
  return res.json();
};

// lib/swr/SWRProvider.tsx
'use client';

import { SWRConfig } from 'swr';
import { swrConfig } from './config';
import { fetcher } from './fetcher';

export function SWRProvider({ children }: { children: React.ReactNode }) {
  return (
    <SWRConfig value={{ ...swrConfig, fetcher }}>
      {children}
    </SWRConfig>
  );
}

// hooks/swr/useAppointments.ts
import useSWR from 'swr';
import { Appointment, AppointmentFilters } from '@/types';

export const useAppointments = (filters?: AppointmentFilters) => {
  const params = new URLSearchParams(filters as any).toString();
  const url = `/api/appointments${params ? `?${params}` : ''}`;
  
  return useSWR<Appointment[]>(url);
};

// hooks/swr/useAppointment.ts
import useSWR from 'swr';
import { Appointment } from '@/types';

export const useAppointment = (id: string | null) => {
  return useSWR<Appointment>(id ? `/api/appointments/${id}` : null);
};

// hooks/mutations/useCreateAppointment.ts
import { mutate } from 'swr';
import { createAppointment as createAppointmentAPI } from '@/lib/api/appointments';
import { CreateAppointmentInput } from '@/types';

export const useCreateAppointment = () => {
  return {
    trigger: async (data: CreateAppointmentInput) => {
      const newAppointment = await createAppointmentAPI(data);
      
      // Revalidate all appointment lists
      await mutate(
        (key) => typeof key === 'string' && key.startsWith('/api/appointments'),
        undefined,
        { revalidate: true }
      );
      
      return newAppointment;
    },
  };
};

// hooks/mutations/useUpdateAppointment.ts
import { mutate } from 'swr';
import { updateAppointment as updateAppointmentAPI } from '@/lib/api/appointments';
import { UpdateAppointmentInput } from '@/types';

export const useUpdateAppointment = () => {
  return {
    trigger: async (id: string, data: UpdateAppointmentInput) => {
      const updatedAppointment = await updateAppointmentAPI(id, data);
      
      // Revalidate the specific appointment and all lists
      await mutate(`/api/appointments/${id}`);
      await mutate(
        (key) => typeof key === 'string' && key.startsWith('/api/appointments') && !key.includes('/'),
        undefined,
        { revalidate: true }
      );
      
      return updatedAppointment;
    },
  };
};
```

### 4. **Type Safety**
All types are centralized in the `types/` directory and exported through `index.ts` for easy imports.

### 5. **API Layer**
- Centralized API client configuration
- Endpoint definitions for maintainability
- Consistent error handling

### 6. **Authentication & Authorization**
- Middleware for route protection
- Role-based access control (RBAC)
- Separate contexts for auth state management

## Example Usage Patterns

### Creating a New Feature Component

```typescript
// components/features/appointments/AppointmentCard.tsx
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { Appointment } from '@/types';

interface AppointmentCardProps {
  appointment: Appointment;
  onCancel?: (id: string) => void;
}

export const AppointmentCard = ({ appointment, onCancel }: AppointmentCardProps) => {
  return (
    <Card>
      {/* Component implementation */}
    </Card>
  );
};
```

### Using SWR in a Page

```typescript
// app/(dashboard)/user/appointments/page.tsx
'use client';

import { useAppointments } from '@/hooks/swr/useAppointments';
import { AppointmentList } from '@/components/features/appointments';
import { LoadingState, ErrorState } from '@/components/common';

export default function UserAppointmentsPage() {
  const { data, error, isLoading } = useAppointments();

  if (isLoading) return <LoadingState />;
  if (error) return <ErrorState error={error} />;

  return (
    <div>
      <h1>My Appointments</h1>
      <AppointmentList appointments={data} />
    </div>
  );
}
```

### Using SWR with Mutations

```typescript
// components/features/appointments/AppointmentForm.tsx
'use client';

import { useState } from 'react';
import { useCreateAppointment } from '@/hooks/mutations/useCreateAppointment';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export const AppointmentForm = () => {
  const [formData, setFormData] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { trigger } = useCreateAppointment();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      await trigger(formData);
      // Success - SWR will auto-revalidate
    } catch (error) {
      console.error('Failed to create appointment:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Form fields */}
      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Creating...' : 'Create Appointment'}
      </Button>
    </form>
  );
};
```

### Using SWR with Conditional Fetching

```typescript
// hooks/swr/useAppointment.ts (with conditional fetching)
import useSWR from 'swr';
import { Appointment } from '@/types';

export const useAppointment = (id: string | null) => {
  // Only fetch when id is truthy
  return useSWR<Appointment>(
    id ? `/api/appointments/${id}` : null,
    {
      revalidateOnFocus: false,
      revalidateOnMount: true,
    }
  );
};
```

### Optimistic Updates with SWR

```typescript
// hooks/mutations/useUpdateAppointment.ts (with optimistic update)
import { mutate } from 'swr';
import { updateAppointment as updateAppointmentAPI } from '@/lib/api/appointments';
import { Appointment, UpdateAppointmentInput } from '@/types';

export const useUpdateAppointment = () => {
  return {
    trigger: async (id: string, data: UpdateAppointmentInput) => {
      const url = `/api/appointments/${id}`;
      
      // Optimistically update the local data
      await mutate(
        url,
        async (currentData: Appointment) => {
          // Update UI immediately
          return { ...currentData, ...data };
        },
        { revalidate: false } // Don't revalidate yet
      );
      
      try {
        // Make the actual API call
        const updatedAppointment = await updateAppointmentAPI(id, data);
        
        // Update with real data
        await mutate(url, updatedAppointment, { revalidate: false });
        
        // Revalidate lists
        await mutate(
          (key) => typeof key === 'string' && key.startsWith('/api/appointments'),
          undefined,
          { revalidate: true }
        );
        
        return updatedAppointment;
      } catch (error) {
        // Revert on error
        await mutate(url);
        throw error;
      }
    },
  };
};
```

### Pagination with SWR

```typescript
// hooks/swr/useAppointments.ts (with pagination)
import useSWR from 'swr';
import { Appointment } from '@/types';

interface PaginationParams {
  page: number;
  limit: number;
}

export const useAppointments = (params?: PaginationParams) => {
  const queryParams = new URLSearchParams({
    page: String(params?.page || 1),
    limit: String(params?.limit || 10),
  }).toString();
  
  return useSWR<{ data: Appointment[]; total: number }>(
    `/api/appointments?${queryParams}`
  );
};
```

### Infinite Loading with SWR

```typescript
// hooks/swr/useInfiniteAppointments.ts
import useSWRInfinite from 'swr/infinite';
import { Appointment } from '@/types';

export const useInfiniteAppointments = () => {
  const getKey = (pageIndex: number, previousPageData: any) => {
    // Reached the end
    if (previousPageData && !previousPageData.hasMore) return null;
    
    // First page
    return `/api/appointments?page=${pageIndex + 1}&limit=10`;
  };

  const { data, error, size, setSize, isLoading } = useSWRInfinite<{
    data: Appointment[];
    hasMore: boolean;
  }>(getKey);

  const appointments = data ? data.flatMap((page) => page.data) : [];
  const hasMore = data?.[data.length - 1]?.hasMore ?? false;

  return {
    appointments,
    error,
    isLoading,
    loadMore: () => setSize(size + 1),
    hasMore,
  };
};
```

## Benefits of This Structure

1. **Scalability**: Clear separation of concerns makes it easy to add features
2. **Maintainability**: Consistent patterns across the codebase
3. **Type Safety**: Centralized types prevent inconsistencies
4. **Reusability**: Component-based architecture promotes code reuse
5. **Developer Experience**: Logical organization makes navigation intuitive
6. **Performance**: SWR handles caching, revalidation, and automatic refetching
7. **Optimistic UI**: SWR makes it easy to implement optimistic updates
8. **Testing**: Isolated components are easier to test
9. **Real-time Data**: SWR's focus on revalidation keeps data fresh

## SWR Key Features Used

1. **Automatic Revalidation**: Data stays fresh with focus/reconnect revalidation
2. **Deduplication**: Multiple components requesting same data get deduplicated
3. **Mutation & Revalidation**: Easy to trigger revalidation after mutations
4. **Optimistic Updates**: Update UI immediately before API response
5. **Error Retry**: Automatic retry on failed requests
6. **Pagination & Infinite Loading**: Built-in support with `useSWRInfinite`
7. **TypeScript Support**: Full type safety with generics

## Additional Recommendations

1. **State Management**: Use SWR for server state, React Context for UI state
2. **Form Handling**: Consider React Hook Form for complex forms
3. **Validation**: Use Zod or Yup for schema validation (works well with React Hook Form)
4. **Styling**: Tailwind CSS for utility-first styling
5. **Testing**: Jest + React Testing Library for unit tests
6. **Documentation**: Storybook for component documentation
7. **SWR Middleware**: Use SWR middleware for logging, caching strategies, or custom behavior

## SWR Configuration Best Practices

```typescript
// lib/swr/config.ts - Production-ready configuration
import { SWRConfiguration } from 'swr';

export const swrConfig: SWRConfiguration = {
  // Only revalidate on mount for most cases
  revalidateOnMount: true,
  
  // Don't revalidate on focus by default (can be overridden per-hook)
  revalidateOnFocus: false,
  
  // Revalidate when network reconnects
  revalidateOnReconnect: true,
  
  // Retry on error
  shouldRetryOnError: true,
  errorRetryCount: 3,
  errorRetryInterval: 5000,
  
  // Dedupe requests within 2 seconds
  dedupingInterval: 2000,
  
  // Keep data for 5 minutes after component unmounts
  keepPreviousData: true,
  
  // Global error handler
  onError: (error, key) => {
    console.error(`SWR Error for ${key}:`, error);
    // You can add error tracking here (e.g., Sentry)
  },
};
```

## Setting up SWR Provider

```typescript
// app/layout.tsx
import { SWRProvider } from '@/lib/swr/SWRProvider';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <SWRProvider>
          {children}
        </SWRProvider>
      </body>
    </html>
  );
}
```
