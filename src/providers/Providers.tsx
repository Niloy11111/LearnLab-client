"use client";

import UserProvider from "@/context/UserContext";
import StoreProvider from "./storeProviders";

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <StoreProvider>
      <UserProvider>{children}</UserProvider>
    </StoreProvider>
  );
};

export default Providers;
