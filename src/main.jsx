import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import ReactDOM from "react-dom/client";
import { router } from "./routes/router.jsx";
import { RouterProvider } from "react-router/dom";
import AuthProvider from "./contexts/AuthProvider.jsx";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from '@tanstack/react-query'

const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(<StrictMode>
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <RouterProvider router={router}></RouterProvider>
    </AuthProvider>
  </QueryClientProvider> 
</StrictMode>);
