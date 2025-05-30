import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { AppProps } from "next/app";
import Layout from "@/sections/layout";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider } from "@/context/AuthContext"; // Import AuthProvider

const queryClient = new QueryClient();

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider> {/* Wrap with AuthProvider */}
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </AuthProvider> {/* Wrap with AuthProvider */}
    </QueryClientProvider>
  );
}
