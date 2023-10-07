import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
// const queryClient = new QueryClient({
//   defaultOptions: {
//     queries: {
//       retry: 3,
//       // If query has zero observer ( no component using this query)
//       //  this query is called inactive and after 5M its remove from cached.
//       cacheTime: 300_00,
//       staleTime: 50_000, // After how much time data will be refetched by default 0
//       refetchOnWindowFocus: false,
//       refetchOnReconnect: false,
//     },
//   },
// });

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
      <ReactQueryDevtools />
    </QueryClientProvider>
  </React.StrictMode>
);
