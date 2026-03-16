"use client"

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "@/styles/globals.css";
import { Toaster } from "sonner";

const queryClient = new QueryClient();

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <QueryClientProvider client={queryClient}>
          <Toaster />
          {children}
        </QueryClientProvider>
      </body>
    </html>
  );
}
