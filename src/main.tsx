import { createRoot } from 'react-dom/client'
import { BrowserRouter } from "react-router";
import './index.css'
import App from './App.tsx'
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClient = new QueryClient();

const root = document.getElementById("root");

createRoot(root!).render(
  <QueryClientProvider client={queryClient}>
  <BrowserRouter>
    <App />
  </BrowserRouter>
  <ReactQueryDevtools initialIsOpen={false} />
  </QueryClientProvider>
);