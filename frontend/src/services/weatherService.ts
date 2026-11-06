const GEOCODING_API =
  "https://geocoding-api.open-meteo.com/v1/search";

const WEATHER_API =
  "https://api.open-meteo.com/v1/forecast";

export interface WeatherDay {
  date: string;
  maxTemperature: number;
  minTemperature: number;
  weatherCode: number;
}

export interface WeatherData {
  destination: string;
  currentTemperature: number;
  weatherCode: number;
  days: WeatherDay[];
}

export const getWeather = async (
  destination: string
): Promise<WeatherData> => {
  // Find destination coordinates
  const locationResponse = await fetch(
    `${GEOCODING_API}?name=${encodeURIComponent(
      destination
    )}&count=1&language=en&format=json`
  );

  if (!locationResponse.ok) {
    throw new Error("Unable to find destination.");
  }

  const locationData = await locationResponse.json();

  if (!locationData.results?.length) {
    throw new Error("Destination not found.");
  }

  const location = locationData.results[0];

  const { latitude, longitude, name } = location;

  // Get weather forecast
  const weatherResponse = await fetch(
    `${WEATHER_API}?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,weather_code&daily=weather_code,temperature_2m_max,temperature_2m_min&timezone=auto&forecast_days=7`
  );

  if (!weatherResponse.ok) {
    throw new Error("Unable to get weather information.");
  }

  const weatherData = await weatherResponse.json();

  const days: WeatherDay[] =
    weatherData.daily.time.map(
      (date: string, index: number) => ({
        date,
        maxTemperature:
          weatherData.daily.temperature_2m_max[index],
        minTemperature:
          weatherData.daily.temperature_2m_min[index],
        weatherCode:
          weatherData.daily.weather_code[index],
      })
    );

  return {
    destination: name,
    currentTemperature:
      weatherData.current.temperature_2m,
    weatherCode: weatherData.current.weather_code,
    days,
  };
};