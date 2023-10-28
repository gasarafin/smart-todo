// src/components/WeatherCaller.js

import { useEffect, useState } from "react";

export default function WeatherTable({ lat, long }) {

  return (
    <table className="table">
      <thead>
        <tr>
          <th scope="col">Date</th>
          <th scope="col">High Temp</th>
          <th scope="col">Low Temp</th>
          <th scope="col">Sunrise</th>
          <th scope="col">Sunset</th>
          <th scope="col">UV Index</th>
        </tr>
      </thead>
      <tbody>
        <WeatherCaller lat={lat} long={long} />
      </tbody>
    </table>
  );
};

export function WeatherRow({ lat, long }) {
  return (
    <table className="table">
      <thead>
        <tr>
          <th scope="col">Date</th>
          <th scope="col">High Temp</th>
          <th scope="col">Low Temp</th>
          <th scope="col">Sunrise</th>
          <th scope="col">Sunset</th>
          <th scope="col">UV Index</th>
        </tr>
      </thead>
      <tbody>
        <WeatherCaller lat={lat} long={long} />
      </tbody>
    </table>
  );
};

export function WeatherCaller({ lat, long }) {

  const [date, setDate] = useState([]);
  const [tempHigh, setTempHigh] = useState([]);
  const [tempLow, setTempLow] = useState([]);
  const [sunrise, setSunrise] = useState([]);
  const [sunset, setSunset] = useState([]);
  const [uvIndex, setUvIndex] = useState([]);

  useEffect(() => {
    const fetchWeather = async () => {
      const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${long}&daily=temperature_2m_max,temperature_2m_min,sunrise,sunset,uv_index_max,precipitation_probability_max&temperature_unit=fahrenheit&windspeed_unit=mph&precipitation_unit=inch&timezone=America%2FNew_York&forecast_days=3`);

      if (response.ok) {
        const taskResponse = await response.json()
        setDate(taskResponse.daily.time)
        setTempHigh(taskResponse.daily.temperature_2m_max)
        setTempLow(taskResponse.daily.temperature_2m_min)
        setSunrise(taskResponse.daily.sunrise)
        setSunset(taskResponse.daily.sunset)
        setUvIndex(taskResponse.daily.uv_index_max)
      } else {
        // TODO ex handling?
      }
    };
    fetchWeather();

  }, [lat, long]);

  // TODO is there a way to dry this up?
  return (
    <>
      <tr>
        <th scope="row">{date[0]}</th>
        <td>{tempHigh[0]}</td>
        <td>{tempLow[0]}</td>
        <td>{sunrise[0]}</td>
        <td>{sunset[0]}</td>
        <td>{uvIndex[0]}</td>
      </tr>
      <tr>
        <th scope="row">{date[1]}</th>
        <td>{tempHigh[1]}</td>
        <td>{tempLow[1]}</td>
        <td>{sunrise[1]}</td>
        <td>{sunset[1]}</td>
        <td>{uvIndex[1]}</td>
      </tr>
      <tr>
        <th scope="row">{date[2]}</th>
        <td>{tempHigh[2]}</td>
        <td>{tempLow[2]}</td>
        <td>{sunrise[2]}</td>
        <td>{sunset[2]}</td>
        <td>{uvIndex[2]}</td>
      </tr>
    </>
  );
};
