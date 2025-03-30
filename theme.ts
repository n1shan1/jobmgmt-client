"use client";

import { createTheme, MantineColorsTuple } from "@mantine/core";

const violetColors: MantineColorsTuple = [
  "#f5f0ff",
  "#e5dbfa",
  "#c7b2f2",
  "#a987ea",
  "#8f63e3",
  "#7f4ddf",
  "#7642de",
  "#6634c5",
  "#5a2db1",
  "#4e259d",
];
export const theme = createTheme({
  /* Put your mantine theme override here */
  primaryColor: "blue",
  colors: {
    violet: violetColors,
  },
});
