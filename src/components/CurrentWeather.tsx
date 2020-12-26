import {
  Box,
  Button,
  Center,
  CircularProgress,
  Container,
  Flex,
  Grid,
  GridItem,
  Heading,
  Icon,
  IconButton,
  Image,
  Spacer,
  Text,
  VStack,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useMemo, useState } from "react";
import { convertToTitleCase } from "../utils/CaseConvert";
import { KelvinToCelsius } from "../utils/temperatureConverter";
import { RepeatIcon } from "@chakra-ui/icons";

interface WeatherQueryParams {
  q: string;
  appid: string;
}

interface WeatherProps {
  sunrise: number;
  sunset: number;
  temp: number;
  feels_like: number;
  pressure: number;
  humidity: number;
  weather: {
    id: number;
    main: string;
    description: string;
    icon: string;
  };
}

const weatherAPI = process.env.REACT_APP_WEATHER_API_KEY;
const weatherURL = process.env.REACT_APP_WEATHER_URL as string;

export default function CurrentWeather() {
  const [currentWeather, setCurrentWeather] = useState<WeatherProps | undefined>(undefined);
  const [lastUpdated, setLastUpdated] = useState(Date.now());
  useEffect(() => {
    (async () => {
      const { data: weatherResp } = await axios.get(weatherURL, {
        params: {
          q: "saskatoon",
          appid: weatherAPI,
        } as WeatherQueryParams,
      });
      const weatherdata = {
        weather: weatherResp.weather[0],
        sunrise: weatherResp.sys.sunrise * 1000,
        sunset: weatherResp.sys.sunset * 1000,
        ...weatherResp.main,
      } as WeatherProps;
      setCurrentWeather(weatherdata);
    })();
  }, [lastUpdated]);

  return !currentWeather ? (
    <CircularProgress />
  ) : (
    <Center>
      <VStack>
        <Heading>Current Weather</Heading>
        <Box borderWidth="2px" borderRadius="xl" boxShadow="xl" boxSize="sm">
          <Flex style={{ margin: 8 }}>
            <Text fontSize="lg">{`Last Updated at ${new Date(lastUpdated).toLocaleTimeString()}`}</Text>
            <Spacer />
            <IconButton icon={<RepeatIcon />} aria-label="Refresh Data" onClick={() => setLastUpdated(Date.now())} />
          </Flex>
          <Grid templateColumns="repeat(2,2fr)">
            <GridItem>
              <Container>
                <Image src={`http://openweathermap.org/img/wn/${currentWeather.weather.icon}@2x.png`} />
                <Text fontSize="2xl">{convertToTitleCase(currentWeather.weather.description)}</Text>
                <Text fontSize="xl">{KelvinToCelsius(currentWeather.temp)}</Text>
                <Text fontSize="2xl">Feels like</Text>
                <Text fontSize="xl">{KelvinToCelsius(currentWeather.feels_like)}</Text>
              </Container>
            </GridItem>
            <GridItem>
              <Text fontSize="2xl">Pressure</Text>
              <Text fontSize="xl">{`${currentWeather.pressure} hPa`}</Text>
              <br />
              <Text fontSize="2xl">Humidity</Text>
              <Text fontSize="xl">{`${currentWeather.humidity}%`}</Text>
              <br />
              <Grid templateColumns="repeat(2,2fr)">
                <GridItem>
                  <Text fontSize="2xl">Sunrise</Text>
                  <Text fontSize="xl">{`${new Date(currentWeather.sunrise).toLocaleTimeString()}`}</Text>
                </GridItem>
                <GridItem>
                  <Text fontSize="2xl">Sunset</Text>
                  <Text fontSize="xl">{`${new Date(currentWeather.sunset).toLocaleTimeString()}`}</Text>
                </GridItem>
              </Grid>
            </GridItem>
          </Grid>
        </Box>
      </VStack>
    </Center>
  );
}
