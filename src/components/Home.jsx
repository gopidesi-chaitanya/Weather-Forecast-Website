import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import cloudDay from '../assets/c.svg';
import '../css/home.css';
import cloudy from '../assets/cloudy.svg'

export default function Home() {
  const [cityName, setCityName] = useState('');


  return (
    <div className="home">
     <img src={cloudy} alt=""className='cloudimg1'/>
      <div className='nav_sec'>
      <h1> <span>Weather Application</span></h1>
      <img src={cloudDay} alt="" className="cloudimg" />
     
      </div>
      <div className='searchbar'>
      <input
        type="text"
        value={cityName}
        onChange={e => setCityName(e.target.value) }
        className="inputBox"
        placeholder="Enter the name of the city"
      />
     
      <button className="btn">
        <Link to={`/weather/${cityName}`} name="hello">
          Search
        </Link>
      </button>
   
      </div>
    </div>
  );
}
