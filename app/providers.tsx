"use client";

import * as React from "react";
import { Provider } from "react-redux";
import store from "@/state/store";
import Background from "./background";
import { NextUIProvider } from "@nextui-org/system";

import { useRouter } from "next/navigation";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { ThemeProviderProps } from "next-themes/dist/types";

export interface ProvidersProps {
  children: React.ReactNode;
  themeProps?: ThemeProviderProps;
}

export function Providers({ children, themeProps }: ProvidersProps) {
  const router = useRouter();

  return (
    <NextUIProvider navigate={router.push}>
      <Provider store={store}>
        <Background />
        <NextThemesProvider {...themeProps}>{children}</NextThemesProvider>
      </Provider>
    </NextUIProvider>
  );
}
