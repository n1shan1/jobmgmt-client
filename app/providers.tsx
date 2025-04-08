"use client";
import { AppContextProvider } from "../context/AppContext";

export function Providers({ children }: { children: React.ReactNode }) {
  return <AppContextProvider>{children}</AppContextProvider>;
}
