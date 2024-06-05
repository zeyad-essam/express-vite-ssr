import React from "react";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Router } from "./router";
import Layout from "./components/Layout";

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Layout>
        <Router />
      </Layout>
    </QueryClientProvider>
  );
}
