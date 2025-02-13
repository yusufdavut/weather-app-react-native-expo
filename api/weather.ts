import axios from "axios";

import { WEATHER_API_KEY } from "@/constants";

const forecastEndpoint = (cityName: string) =>
  `http://api.weatherapi.com/v1/forecast.json?key=${WEATHER_API_KEY}&q=${cityName}&days=1&aqi=no&alerts=no`;
const searchEndpoint = (cityName: string) =>
  `http://api.weatherapi.com/v1/search.json?key=${WEATHER_API_KEY}&q=${cityName}`;

const apiCall = async (endpoint: any) => {
  const options = {
    method: "GET",
    url: endpoint,
  };
  try {
    const res = await axios.request(options);
    return res.data;
  } catch (error) {
    console.log("error", error);
    return null;
  }
};

export const fetchForecast = (cityName: string) => {
  return apiCall(forecastEndpoint(cityName));
};

export const fetchLocationBySearch = (cityName: string) => {
  return apiCall(searchEndpoint(cityName));
};
