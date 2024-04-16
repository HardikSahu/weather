import React, { useState } from "react";
import "./WeatherApp.css";
import search_icon from "../Assests/search.png";
import snow_icon from "../Assests/snow.png";
import clear_icon from "../Assests/clear.png";
import cloudy_icon from "../Assests/cloudy.png";
import wind_icon from "../Assests/wind.png";
import fog_icon from "../Assests/fog.png";
import drizzle_icon from "../Assests/drizzle.png";
import humid_icon from "../Assests/humid.png";
import rainy_icon from "../Assests/rainy.png";
import thunderstorm_icon from "../Assests/thunderstorm.png";
export const WeatherApp = () => {
  let api_key = "OHDk3nuyGKDOaiDBrjDAgfRSnfoxxZW0";
  const [wicon, setWicon] = useState(cloudy_icon);
  const search = async () => {
    const element = document.getElementsByClassName("cityInput");
    if (element[0].value === "") {
      return 0;
    }
    let url = `https://api.tomorrow.io/v4/weather/realtime?location=${element[0].value}&apikey=${api_key}`;

    let response = await fetch(url);
    let dataobj = await response.json();
    const humidity = document.getElementsByClassName("humidity-percent");
    const wind = document.getElementsByClassName("wind-rate");
    const temperature = document.getElementsByClassName("weather-temp");
    const location = document.getElementsByClassName("weather-location");
    humidity[0].innerHTML = dataobj.data.values.humidity + "%";
    wind[0].innerHTML = Math.floor(dataobj.data.values.windSpeed) + "km/h";
    temperature[0].innerHTML =
      Math.floor(dataobj.data.values.temperature) + "℃";
    location[0].innerHTML = dataobj.location.name;
    if (
      dataobj.data.values.weatherCode === 1001 ||
      dataobj.data.values.weatherCode === 1101 ||
      dataobj.data.values.weatherCode === 1102
    ) {
      setWicon(cloudy_icon);
    } else if (dataobj.data.values.weatherCode === 1000) {
      setWicon(clear_icon);
    } else if (
      dataobj.data.values.weatherCode === 2000 ||
      dataobj.data.values.weatherCode === 2100
    ) {
      setWicon(fog_icon);
    } else if (
      dataobj.data.values.weatherCode === 4000 ||
      dataobj.data.values.weatherCode === 6000
    ) {
      setWicon(drizzle_icon);
    } else if (
      dataobj.data.values.weatherCode === 4001 ||
      dataobj.data.values.weatherCode === 4200 ||
      dataobj.data.values.weatherCode === 4201 ||
      dataobj.data.values.weatherCode === 6001 ||
      dataobj.data.values.weatherCode === 6200 ||
      dataobj.data.values.weatherCode === 6201
    ) {
      setWicon(rainy_icon);
    } else if (dataobj.data.values.weatherCode === 5001) {
      setWicon(clear_icon);
    } else if (dataobj.data.values.weatherCode === 8000) {
      setWicon(thunderstorm_icon);
    } else if (
      dataobj.data.values.weatherCode === 5000 ||
      dataobj.data.values.weatherCode === 5100 ||
      dataobj.data.values.weatherCode === 5101 ||
      dataobj.data.values.weatherCode === 7000 ||
      dataobj.data.values.weatherCode === 7101 ||
      dataobj.data.values.weatherCode === 7102
    ) {
      setWicon(snow_icon);
    } else {
      setWicon(clear_icon);
    }
  };
  return (
    <div className="container">
      <div className="top-bar">
        <input type="text" className="cityInput" placeholder="Search" />
        <div
          className="search-icon"
          onClick={() => {
            search();
          }}
        >
          <img src={search_icon} alt="niaung" />
        </div>
      </div>
      <div className="weather-image">
        <img src={wicon} alt="niaung" />
      </div>
      <div className="weather-temp">24°c</div>
      <div className="weather-location">London</div>
      <div className="data-container">
        <div className="element">
          <img id="small-img" src={humid_icon} alt="niaung" />
          <div className="data">
            <div className="humidity-percent">64%</div>
            <div className="text">Humidity</div>
          </div>
        </div>
        <div className="element">
          <img id="small-img" src={wind_icon} alt="niaung" />
          <div className="data">
            <div className="wind-rate">18 Km/h</div>
            <div className="text">Wind Speed</div>
          </div>
        </div>
      </div>
    </div>
  );
};
