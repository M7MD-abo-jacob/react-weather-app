import React, { useState } from "react";
import axios from "axios";
import MainWeather from "./components/mainWeather/mainWeather";
import Search from "./components/search/search";
import Week from "./components/footer/week/week";
import Today from "./components/footer/dayHours/today";
import Start from "./components/start/start";
import WeatherStatus from "./components/weatherStatus/weatherStatus";
import "./index.css";

export default function App() {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [daysForcast, setDaysForcast] = useState(null);
  const [hoursForcast, setHoursForcast] = useState(null);
  const [status, setStatus] = useState(null);

  // gets the current weather of a city
  // city, country, country_code
  let url = `https://api.openweathermap.org/data/2.5/weather?appid=0feae5178a663213cb336bafcc5b5367&units=metric&q=`;

  // gets 5 days weather
  let weeklyUrl = `https://api.openweathermap.org/data/2.5/forecast?appid=0feae5178a663213cb336bafcc5b5367&cnt=40&units=metric&q=`;

  const handleOnSearchChange = (searchData) => {
    const getCurrentWeather = axios.get(`${url}${searchData.value}`);
    const getForcast = axios.get(`${weeklyUrl}${searchData.value}`);
    // console.log(`${url}${searchData.value}`);
    // console.log(`${weeklyUrl}${searchData.value}`);

    Promise.all([getCurrentWeather, getForcast]).then(async (response) => {
      const weatherResponse = await response[0];
      const forcastResponse = await response[1];

      const days = [];
      const dts = [];
      const list = forcastResponse.data.list;

      for (let i = 0; i < list.length; i++) {
        if (dts.includes(list[i].dt_txt.split(" ")[0])) {
          //chech if date exists
          if (list[i].main.temp_max >= days[days.length - 1].temp_max) {
            //add temp min and max if day exists and skips the rest of data
            days[days.length - 1].temp_max = list[i].main.temp_max.toFixed();
            days[
              days.length - 1
            ].icon1 = `http://openweathermap.org/img/wn/${list[i].weather[0].icon}.png`;
          }
          if (list[i].main.temp_min <= days[days.length - 1].temp_min) {
            days[days.length - 1].temp_min = list[i].main.temp_min.toFixed();
            days[
              days.length - 1
            ].icon2 = `http://openweathermap.org/img/wn/${list[i].weather[0].icon}.png`;
          }

          continue;
        } else {
          let day = {}; // make day first time
          dts.push(list[i].dt_txt.split(" ")[0]); //if new date, add data
          day.date = list[i].dt_txt.split(" ")[0];
          day.temp_max = list[i].main.temp_max.toFixed();
          day.temp_min = list[i].main.temp_min.toFixed();
          day.status = list[i].weather[0].main;
          day.icon1 = `http://openweathermap.org/img/wn/${list[i].weather[0].icon}.png`;
          day.icon2 = `http://openweathermap.org/img/wn/${list[i].weather[0].icon}.png`;
          days.push(day);
        }
      }
      const dayHours = [];
      for (let i = 0; i < 8; i++) {
        let dayHour = {};

        let date = new Date(list[i].dt_txt);
        let hours = date.getHours();
        var ampm = hours >= 12 ? "PM" : "AM";
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
        let strTime = hours + " " + ampm;
        dayHour.time = strTime;
        dayHour.status = list[i].weather[0].main;
        dayHour.icon = `http://openweathermap.org/img/wn/${list[i].weather[0].icon}.png`;
        dayHour.temp = list[i].main.temp.toFixed();
        dayHour.humidity = list[i].main.humidity;
        dayHours.push(dayHour);
      }

      setHoursForcast(dayHours);
      setDaysForcast(days);
      setCurrentWeather(weatherResponse);
      setStatus(weatherResponse.data.weather[0].icon);
    });
  };
  // console.log(currentWeather);
  // console.log(daysForcast);

  return (
    <div className="app">
      <div className="container">
        <header className="header" id="top">
          {status && <WeatherStatus data={status} />}
          <Search onSearchChange={handleOnSearchChange} />
          {currentWeather === null ? <Start /> : null}
        </header>
        <div className="today">
          {currentWeather && (
            <>
              <div className="main now">
                <MainWeather data={currentWeather.data} />
              </div>
              <div className="main">
                <p>24-Hour forcast</p>
                <Today data={hoursForcast} />
              </div>
            </>
          )}
        </div>
        {currentWeather && (
          <footer className="footer">
            <p>7-Day forcast</p>
            <Week data={daysForcast} />
          </footer>
        )}
      </div>
    </div>
  );
}
