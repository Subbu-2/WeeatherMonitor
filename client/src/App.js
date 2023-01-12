import React, { useState } from 'react';
import './App.scss';
import CurrentWeather from './component/currentWeather';
import Search from './component/search/index.js';
import {Weather_Api_Key,Weather_Api_Url} from './Api'
import Forecast from './component/forecast/index.js';

const App = () => {
  const [currentWeather,setCurrentWeather] = useState(null);
  const [forecast,setForecast] = useState(null);

  const handleOnSearchChange = (searchData) => {
    const [lat,lon] =  searchData.value.split (" ");

    const currentWeatherFetch = fetch(`${Weather_Api_Url}/weather?lat=${lat}&lon=${lon}&appid=${Weather_Api_Key}&units=metric`)

    const ForecastFetch = fetch(`${Weather_Api_Url}/forecast?lat=${lat}&lon=${lon}&appid=${Weather_Api_Key}&units=metric`)

    Promise.all([currentWeatherFetch,ForecastFetch])
    .then(async(response) =>{
      const weatherResponse = await response[0].json();
      const forecastResponse = await response[1].json();

      setCurrentWeather({city:searchData, ...weatherResponse});
      setForecast({city:searchData.label, ...forecastResponse});
    })
    .catch((err)=>console.log(err))
  }
  //console.log(currentWeather);
  return (
    <div className="main-container">
      <Search  onSearchChange={handleOnSearchChange} />
      { currentWeather && <CurrentWeather data={currentWeather} />}
      { forecast && <Forecast data={forecast} />}
    </div>
  );
}

export default App;
