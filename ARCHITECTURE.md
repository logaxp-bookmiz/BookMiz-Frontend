```
bookmiz-frontend/
├── public/
│   ├── images/
│   ├── icons/
│   └── fonts/
│
├── src/
│   ├── app/                                    # Next.js App Router (Client-side only)
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
│   │   ├── providers/                         # Public providers page
│   │   │   ├── page.tsx
│   │   │   └── [id]/
│   │   │       └── page.tsx
│   │   │
│   │   ├── layout.tsx                         # Root layout
│   │   ├── page.tsx                           # Home page
│   │   ├── error.tsx                          # Global error boundary
│   │   ├── loading.tsx                        # Global loading state
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
│   ├── services/                              # API Service Layer (External API calls)
│   │   ├── api/                               # Core API utilities
│   │   │   ├── client.ts                      # Axios/Fetch client configuration
│   │   │   ├── interceptors.ts                # Request/Response interceptors
│   │   │   └── index.ts
│   │   │
│   │   ├── appointments/                      # Appointment services
│   │   │   ├── appointments.service.ts
│   │   │   └── index.ts
│   │   │
│   │   ├── services/                          # Service (business services) services
│   │   │   ├── services.service.ts
│   │   │   └── index.ts
│   │   │
│   │   ├── providers/                         # Provider services
│   │   │   ├── providers.service.ts
│   │   │   └── index.ts
│   │   │
│   │   ├── users/                             # User services
│   │   │   ├── users.service.ts
│   │   │   └── index.ts
│   │   │
│   │   ├── auth/                              # Authentication services
│   │   │   ├── auth.service.ts
│   │   │   └── index.ts
│   │   │
│   │   ├── schedule/                          # Schedule services
│   │   │   ├── schedule.service.ts
│   │   │   └── index.ts
│   │   │
│   │   ├── analytics/                         # Analytics services
│   │   │   ├── analytics.service.ts
│   │   │   └── index.ts
│   │   │
│   │   └── index.ts                           # Export all services
│   │
│   ├── lib/                                   # Library code & utilities
│   │   ├── tanstack-query/                    # TanStack Query configuration
│   │   │   ├── queryClient.ts
│   │   │   ├── QueryProvider.tsx
│   │   │   ├── queryKeys.ts
│   │   │   └── index.ts
│   │   │
│   │   ├── auth/                              # Authentication utilities
│   │   │   ├── auth.ts
│   │   │   ├── session.ts
│   │   │   ├── token.ts                       # Token management (localStorage)
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
│   │       ├── api-endpoints.ts               # API endpoint constants
│   │       └── index.ts
│   │
│   ├── hooks/                                 # Custom React hooks
│   │   ├── queries/                           # TanStack Query hooks (use services)
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
│   │   ├── mutations/                         # TanStack Mutation hooks (use services)
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
├── middleware.ts                              # Client-side route protection
├── .env.local                                 # Environment variables (API URL, etc.)
├── .env.example                               # Example environment variables
├── next.config.js                             # Next.js configuration
├── tsconfig.json                              # TypeScript configuration
├── tailwind.config.ts                         # Tailwind configuration
├── package.json                               # Dependencies
└── README.md                                  # Project documentation
```