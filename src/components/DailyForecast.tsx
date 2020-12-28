import { Box, Center, CircularProgress, Container, Grid, Heading, Stack, Text } from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { ButtonBack, ButtonNext, CarouselProvider, Slide, Slider } from "pure-react-carousel";
import "pure-react-carousel/dist/react-carousel.es.css";
import format from "date-fns-tz/format";
import WeatherForecastCard from "./WeatherForecastCard";

interface ForecastWeatherQueryParams {
  q: string;
  appid: string | undefined;
}

export interface WeatherData {
  dt: number;
  dt_txt: string;
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
    description: string;
  };
}

export default function DailyForecast() {
  const [weatherData, setWeatherData] = useState<Record<string, WeatherData[]> | undefined>(undefined);

  function createWeatherChunks(arr: any[]): Record<string, WeatherData[]> {
    const weatherChunks: Record<string, WeatherData[]> = {};
    for (let index = 0; index < arr.length; index++) {
      const { dt, dt_txt, main, weather }: any = arr[index];
      const idx = format(new Date(dt_txt), "yyyy-MM-dd", { timeZone: "Regina/America" });
      if (weatherChunks.hasOwnProperty(idx)) {
        weatherChunks[idx].push({ dt, dt_txt, main, weather } as WeatherData);
      } else {
        weatherChunks[idx] = [{ dt, dt_txt, main, weather } as WeatherData];
      }
    }
    return weatherChunks;
  }

  useEffect(() => {
    (async () => {
      const { data: weatherResp } = await axios.get("http://api.openweathermap.org/data/2.5/forecast", {
        params: { q: "saskatoon", appid: process.env.REACT_APP_WEATHER_API_KEY } as ForecastWeatherQueryParams,
      });
      setWeatherData(createWeatherChunks(weatherResp.list));
    })();
  }, []);

  return !weatherData ? (
    <CircularProgress />
  ) : (
    <div style={{ width: window.innerWidth - 18, padding: 18 }}>
      <Heading>5 Day Forecast</Heading>
      <CarouselProvider isIntrinsicHeight naturalSlideWidth={1} naturalSlideHeight={1} totalSlides={Object.keys(weatherData).length}>
        <Slider>
          {Object.values(weatherData).map((data, key) => (
            <Slide index={key} key={key}>
              <Heading>{format(new Date(data[0].dt_txt), "EEEE, MMM do", { timeZone: "Regina/America" })}</Heading>
              <Center>
                <Stack direction={["column", "row"]}>
                  {data.map(({ dt, dt_txt, main, weather }: any, key: number) => (
                    <WeatherForecastCard dt={dt} dt_txt={dt_txt} main={main} weather={weather[0]} />
                  ))}
                </Stack>
              </Center>
            </Slide>
          ))}
        </Slider>
        <ButtonBack>Back</ButtonBack>
        <ButtonNext>Next</ButtonNext>
      </CarouselProvider>
    </div>
  );
}
