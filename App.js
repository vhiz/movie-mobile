import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import Navigation from "./screens/components/navigation/Navigation";

export default function App() {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <Navigation />
    </QueryClientProvider>
  );
}
