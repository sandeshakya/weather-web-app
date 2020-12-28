import { Box, VStack, Image, Text, HStack } from "@chakra-ui/react";
import { format } from "date-fns-tz";
import React from "react";
import { convertToTitleCase } from "../utils/CaseConvert";
import { KelvinToCelsius } from "../utils/temperatureConverter";
import { WeatherData } from "./DailyForecast";

export default function WeatherForecastCard({ dt, dt_txt, main, weather }: WeatherData) {
  console.log(weather);
  return (
    <Box borderWidth="1px" borderRadius="lg">
      <VStack>
        <Text fontSize="md">{format(new Date(dt_txt), "h:mm bbbb", { timeZone: "Regina/America" })}</Text>
        <Image src={`http://openweathermap.org/img/wn/${weather.icon}@2x.png`} />
        <Text fontSize="lg"> {convertToTitleCase(weather.description)}</Text>
        <Text>{KelvinToCelsius(main.temp)}</Text>
        <br />
        <Text>Feels like</Text>
        <Text>{KelvinToCelsius(main.feels_like)}</Text>
        <HStack>
          <Box>
            <Text>Min</Text>
            <Text>{KelvinToCelsius(main.temp_min)}</Text>
          </Box>
          <Box>
            <Text>Max</Text>
            <Text>{KelvinToCelsius(main.temp_max)}</Text>
          </Box>
        </HStack>
      </VStack>
    </Box>
  );
}
