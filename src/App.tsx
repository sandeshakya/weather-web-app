import * as React from "react";
import { Center, ChakraProvider, VStack } from "@chakra-ui/react";
import { extendTheme } from "@chakra-ui/react";
import Header from "./components/Header";
import CurrentWeather from "./components/CurrentWeather";
import DailyForecast from "./components/DailyForecast";

const theme = extendTheme({
  fonts: {
    heading: "sans-serif",
    body: "system-ui, sans-serif",
    mono: "Menlo, monospace",
  },
  colors: {
    brand: {
      100: "#f7fafc",
      900: "#1a202c",
    },
  },
});

export const App = () => (
  <ChakraProvider theme={theme}>
    <Header />
    <br />
    <Center>
      <VStack>
        <CurrentWeather />
        <DailyForecast />
      </VStack>
    </Center>
  </ChakraProvider>
);
