import "@mantine/core/styles.css";
import "@mantine/dates/styles.css";
import React from "react";
import {
  MantineProvider,
  ColorSchemeScript,
  mantineHtmlProps,
  createTheme,
  type MantineColorsTuple,
} from "@mantine/core";

import { theme } from "../theme";
import { AppContextProvider } from "../context/AppContext";
import { Providers } from "./providers";
import NavBar from "../components/NavBar";

export const metadata = {
  title: "Job Management",
  description: "Manage your job postings efficiently",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" {...mantineHtmlProps}>
      <head>
        <ColorSchemeScript />
        <link rel="shortcut icon" href="/favicon.svg" />
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no"
        />
      </head>
      <body>
        <Providers>
          <MantineProvider theme={theme}>{children}</MantineProvider>
        </Providers>
      </body>
    </html>
  );
}
