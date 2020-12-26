import { CircularProgress, Container, Heading, HStack, Text } from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";

interface ForecastWeatherQueryParams {
  q: string;
  appid: string | undefined;
}

interface WeatherData {
  dt: number;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
  };
  weather: {
    id: number;
    main: string;
    icon: string;
  };
}

export default function DailyForecast() {
  const [weatherData, setWeatherData] = useState<WeatherData[] | undefined>(undefined);

  useEffect(() => {
    (async () => {
      const { data: weatherResp } = await axios.get("http://api.openweathermap.org/data/2.5/forecast", {
        params: { q: "saskatoon", appid: process.env.REACT_APP_WEATHER_API_KEY } as ForecastWeatherQueryParams,
      });
      setWeatherData(
        weatherResp.list.map((data: any) => {
          return { dt: data.dt, main: data.main, weather: data.weather } as WeatherData;
        })
      );
    })();
  }, []);

  return !weatherData ? (
    <CircularProgress />
  ) : (
    <Container maxW="md">
      <Heading>3 Hour Forecast</Heading>
      <div style={{ overflowY: "scroll" }}>
        <HStack>
          {weatherData.map((data) => (
            <Text key={data.dt} fontSize="xl">
              {data.dt}
            </Text>
          ))}
        </HStack>
      </div>
    </Container>
  );
}
