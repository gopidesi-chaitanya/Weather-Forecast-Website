import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import '../css/weather.css'

export default function Weather() {
  const { cityName } = useParams();
  const [weatherData, updateWeatherData] = useState({
    description: '',
    icon: '',
    temp: '',
    humidity: '',
    cityname: '',
    windspeed: ''
  });
  const [forecastData, updateForecastData] = useState([]);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=fe4feefa8543e06d4f3c66d92c61b69c&units=metric`);
        const { data } = response;

        updateWeatherData(prevState => ({
          ...prevState,
          description: data.weather[0].description,
          icon: data.weather[0].icon,
          temp: data.main.temp,
          humidity: data.main.humidity,
          cityname: data.name,
          windspeed: data.wind.speed
        }));
      } catch (error) {
        console.error('Error fetching weather data:', error);
      }
    };

    fetchData();
  }, [cityName]);


  useEffect(() => {
    const fetchForecastData = async () => {
      try {
        const response = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=fe4feefa8543e06d4f3c66d92c61b69c&units=metric`);
        const { data } = response;
        updateForecastData(data.list);
      } catch (error) {
        console.error('Error fetching forecast data:', error);
      }
    };

    fetchForecastData();
  }, [cityName]);

  return (
    <div className='wearher_comp'>
      
      <div className='weather_container'>
       <h1>Current Weather</h1>
       <p className='temp'>{weatherData.temp}°C | {weatherData.description}</p>
       <h1>Humidity: {weatherData.humidity}%</h1>
       <h1>Wind Speed: {weatherData.windspeed} m/s</h1>
       <h1> {weatherData.cityname}, IN</h1>
       {weatherData.icon && (
        <img src={`https://openweathermap.org/img/wn/${weatherData.icon}.png`} alt="Weather icon" className='weathericon'/>
      )}
      </div>
      <div className='forecast_container'>
      <div className='wearher_comp2'>
  {forecastData.map((data, index) => (
    
    <div className='weather_container' key={index}>
      <h1>DATE: {data.dt_txt}</h1>
      <p className='temp'>{data.main.temp}°C | {data.weather[0].description}</p>
      <h1>Humidity: {data.main.humidity}%</h1>
      {data.weather[0].icon && (
        <img src={`https://openweathermap.org/img/wn/${data.weather[0].icon}.png`} alt="Weather icon" className='weathericon'/>
      )}
    </div>
   
  ))}
</div>
</div>

    </div>
  );
}
