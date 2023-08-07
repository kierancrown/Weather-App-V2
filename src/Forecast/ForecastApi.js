import React, { useState, useEffect, useCallback } from "react";
import ForecastDisplay from "./ForecastDisplay";
import "./Forecast.css";
import axios from "axios";

export default function ForecastApi(props) {
  const [forecastLoaded, setForecastLoaded] = useState(false);
  const [forecast, setForecast] = useState(null);

  const handleResponse = useCallback((response) => {
    setForecast(response.data.daily);
    setForecastLoaded(true);
  }, []);

  const load = useCallback(() => {
    let apiKey = process.env.REACT_APP_WEATHER_API_KEY;
    let city = props.city;
    let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;

    axios
      .get(apiUrl)
      .then((response) => handleResponse(response))
      .catch((error) => {
        console.error("Error:", error);
      });
  }, [props.city, handleResponse]);

  useEffect(() => {
    setForecastLoaded(false);
    load();
  }, [load]);

  if (forecastLoaded) {
    return (
      <div className="WeatherForecast">
        <div className="row">
          {forecast.map(function(dailyForecast, index) {
            if (index < 5) {
              return (
                <div className="col" key={index}>
                  <ForecastDisplay data={dailyForecast} />
                </div>
              );
            } else {
              return null;
            }
          })}
        </div>
      </div>
    );
  } else {
    return null;
  }
}
