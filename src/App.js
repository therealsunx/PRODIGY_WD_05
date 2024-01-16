import './App.css';
import React, { useState, useEffect } from 'react';

const WeatherCard = ({ weatherData, lat, long, setLat, setLong }) => {

  return (
    <div className='flex flex-wrap gap-12 py-8 px-6 md:px-12 justify-center'>

      <div className='p-2 md:p-4 shadow-2xl rounded-2xl flex flex-col'>
        <div className='flex flex-col p-4 items-center'>

          <p className='font-bold text-3xl p-4'>Location</p>
          {weatherData.name ? <p className='text-2xl p-1'>{weatherData?.name}, {weatherData?.sys?.country}</p> : <p className='text-2xl p-1'>Unknown Place</p>}

          <div className='flex flex-col md:flex-row gap-4 m-2 items-center'>
            <input type='number' value={lat} step={0.1} onChange={(e) => setLat(e.target.value)} className='rounded-xl px-4 py-2' />
            <input type='number' value={long} step={0.1} onChange={(e) => setLong(e.target.value)} className='rounded-xl px-4 py-2' />
          </div>
        </div>
      </div>

      <div className='py-8 flex flex-col px-6 md:px-12 rounded-2xl shadow-2xl text-center'>
        <p className='text-3xl font-bold p-4'>Temperature</p>

        <div className='flex flex-col gap-2 m-2 text-xl'>
          <div className='flex gap-8 md:gap-24 justify-between'>
            <p className='font-bold'>Average</p>
            <p>{weatherData?.main?.temp || "__.__"}&deg;C</p>
          </div>
          <div className='flex gap-8 justify-between'>
            <p className='font-bold'>Feels Like</p>
            <p>{weatherData?.main?.feels_like || "__.__"}&deg;C</p>
          </div>
          <div className='flex gap-8 justify-between'>
            <p className='font-bold'>Max</p>
            <p>{weatherData?.main?.temp_max || "__.__"}&deg;C</p>
          </div>
          <div className='flex gap-8 justify-between'>
            <p className='font-bold'>Min</p>
            <p>{weatherData?.main?.temp_min || "__.__"}&deg;C</p>
          </div>
        </div>
      </div>

      <div className='py-8 flex flex-col px-6 md:px-12 rounded-2xl shadow-2xl text-center'>
        <p className='text-3xl font-bold p-4'>Pressure & Humidity</p>

        <div className='flex flex-col gap-2 m-2 text-xl'>
          <div className='flex gap-8 md:gap-24 justify-between'>
            <p className='font-bold'>Humidity</p>
            <p>{weatherData?.main?.humidity || "__.__"}</p>
          </div>
          <div className='flex gap-8 justify-between'>
            <p className='font-bold'>Ground Level</p>
            <p>{weatherData?.main?.grnd_level || "__.__"} mb</p>
          </div>
          <div className='flex gap-8 justify-between'>
            <p className='font-bold'>Pressure</p>
            <p>{weatherData?.main?.pressure || "__.__"} mb</p>
          </div>
          <div className='flex gap-8 justify-between'>
            <p className='font-bold'>Sea Level</p>
            <p>{weatherData?.main?.sea_level || "__.__"} mb</p>
          </div>
        </div>
      </div>

      <div className='py-8 flex flex-col px-6 md:px-12 rounded-2xl shadow-2xl text-center'>
        <p className='text-3xl font-bold p-4'>Wind</p>

        <div className='flex flex-col gap-2 m-2 text-xl'>
          <div className='flex gap-8 md:gap-24 justify-between'>
            <p className='font-bold'>Direction</p>
            <p>{weatherData?.wind?.deg || "__.__"} &deg;</p>
          </div>
          <div className='flex gap-8 justify-between'>
            <p className='font-bold'>Gust</p>
            <p>{weatherData?.wind?.gust || "__.__"} &deg;</p>
          </div>
          <div className='flex gap-8 justify-between'>
            <p className='font-bold'>Speed</p>
            <p>{weatherData?.wind?.speed || "__.__"}m/s</p>
          </div>
        </div>
      </div>
      
      <div className='py-8 flex flex-col text-2xl font-semibold px-6 md:px-12 rounded-2xl shadow-2xl text-center h-fit'>
        {weatherData?.weather?.map((w, i) => (
          <p className='px-8 py-2' key={i}>{w.description.toUpperCase()}</p>
        )) || "Unknown Sky data"}
      </div>

    </div>
  )
}

function App() {
  const [init, setInit] = useState(true);
  const [lat, setLat] = useState([]);
  const [long, setLong] = useState([]);
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      if (init) {
        navigator.geolocation.getCurrentPosition(function (position) {
          setLat(position.coords.latitude);
          setLong(position.coords.longitude);
        });
        setInit(false);
      }

      await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=metric&appid=21b7fdbeca76af631b7ec97eae322ffb`)
        .then(res => res.json())
        .then(result => {
          setData(result);
          console.log(result);
        });
    }
    fetchData();
  }, [lat, long]);

  return (
    <div className="flex flex-col w-screen min-h-screen items-center bluegradient p-6 md:p-12 text-center">
      <p className='text-5xl md:text-7xl font-bold px-8 py-3 shadow-2xl shadow-[#0ff] rounded-xl font-mono bg-[#0005] text-[#0ff]'>Weather 101</p>
      <WeatherCard weatherData={data} lat={lat} long={long} setLat={setLat} setLong={setLong} />
    </div>
  );
}

export default App;
