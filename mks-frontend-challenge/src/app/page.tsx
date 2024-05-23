"use client"
import Cards from "@/components/cards/page";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

export default function Home() {
  return (
    <QueryClientProvider client={queryClient}>
      <main>
        <Cards/>
      </main>
    </QueryClientProvider>
  );
}
