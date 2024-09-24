/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/ban-ts-comment */
// /* eslint-disable @next/next/no-img-element */
// "use client";

// import React, { useEffect, useState } from "react";
// import { useQuery, useQueryClient } from "@tanstack/react-query";

// export default function Home() {
//   const [searchValue, setSearchValue] = useState("");
//   const [fetchWeather, setFetchWeather] = useState(false);
//   const qc = useQueryClient();

//   function handleChange(e: React.FormEvent<HTMLInputElement>) {
//     const { value } = e.currentTarget;
//     setSearchValue(value);
//     qc.removeQueries();
//   }

//   const fetchWeatherData = async () => {
//     if (searchValue) {
//       return fetch(`http://localhost:8080/api/weather/${searchValue}`).then(
//         (res) => res.json()
//       );
//     }
//     return null;
//   };

//   const { data, isLoading, error, isFetched } = useQuery({
//     queryKey: ["weather", searchValue],
//     queryFn: fetchWeatherData,
//     enabled: fetchWeather,
//     refetchOnMount: true,
//   });

//   function handleButtonClick() {
//     setFetchWeather(true);
//   }
//   useEffect(() => {
//     if (isFetched) {
//       setFetchWeather(false);
//     }
//   }, [isFetched, qc]);

//   if (isLoading) return <p>Loading...</p>;
//   if (error) return <p>Error: {error.message}</p>;
//   const city = data?.city.name;
//   const weatherData = data?.list[0] ? data?.list[0] : "";
//   const degree = weatherData.main?.temp;
//   const kelvinToCelsius = Math.round(degree - 273.15);

//   return (
//     <div className="bg-[url('./img/bg.png')] h-screen bg-center mx-60">
//       <div className="flex flex-col items-center pt-10 gap-3">
//         <h1 className="text-white font-medium text-3xl">Kasto Cha Mausam</h1>
//         <div className="flex ">
//           <input
//             type="search"
//             onChange={handleChange}
//             className="border-2 border-white focus:outline-none py-1 px-1 rounded-l-md"
//           />
//           <button
//             className="bg-red-500 text-center px-2 py-2 text-white rounded-r-md"
//             onClick={handleButtonClick}
//           >
//             Search
//           </button>
//         </div>
//       </div>
//       {weatherData ? (
//         <>
//           <div className="bg-[#F9FAFB] rounded-xl mx-80 mt-5">
//             <div className="flex justify-between px-10 items-center">
//               <div className="flex flex-col items-center py-2">
//                 {weatherData ? (
//                   <img
//                     src={`http://openweathermap.org/img/wn/${weatherData?.weather[0]?.icon}@2x.png`}
//                     alt=""
//                   />
//                 ) : (
//                   ""
//                 )}
//                 <h1 className="font-semibold">{city}</h1>
//               </div>
//               <h1 className="text-4xl font-bold">
//                 {kelvinToCelsius || 0}&deg;C
//               </h1>
//             </div>
//           </div>
//         </>
//       ) : (
//         ""
//       )}
//     </div>
//   );
// }
// @ts-nocheck
"use client";

import React, { useState, useEffect } from "react";

export default function WeatherApp() {
  const [city, setCity] = useState("London");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (city) {
      fetchWeather();
    }
  }, [city]);

  const fetchWeather = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `https://weather-backend-wb.onrender.com/api/weather/${city}`
      );
      if (!response.ok) {
        throw new Error("City not found");
      }
      const data = await response.json();
      setWeather(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const newCity = formData.get("city") as string;
    if (newCity) {
      setCity(newCity);
    }
  };

  const formatTime = (timestamp: number) => {
    return new Date(timestamp * 1000).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  console.log("weather", weather);
  const degree = weather?.main?.temp || 0;
  const kelvinToCelsius = Math.round(degree - 273.15);

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl p-6 max-w-2xl w-full">
        <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
          Kasto Cha Mausam
        </h1>
        <form onSubmit={handleSubmit} className="mb-6 flex">
          <input
            type="text"
            name="city"
            placeholder="Enter city name"
            defaultValue={city}
            className="flex-grow px-4 py-2 text-gray-700 bg-gray-200 rounded-l focus:outline-none focus:bg-white"
          />
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-r focus:outline-none focus:shadow-outline"
          >
            Search
          </button>
        </form>

        {loading && <p className="text-center text-gray-600">Loading...</p>}

        {error && <p className="text-center text-red-500">{error}</p>}

        {weather && (
          <div className="text-center">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">
              {weather.name}, {weather.sys?.country}
            </h2>
            <div className="flex justify-center items-center mb-4">
              <img
                src={
                  weather?.weather?.[0]?.icon
                    ? `http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`
                    : ""
                }
                alt={
                  weather?.weather?.[0]?.description || "No weather description"
                }
                className="w-20 h-20"
              />

              <p className="text-5xl font-bold text-gray-800">
                {kelvinToCelsius}°C
              </p>
            </div>
            <p className="text-xl mb-6 text-gray-600 capitalize">
              {weather?.weather?.[0]?.description ||
                "No weather data available"}
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              <div className="bg-gray-100 p-4 rounded-lg">
                <h3 className="font-semibold text-gray-600 mb-1">Feels Like</h3>
                <p className="text-lg font-bold text-gray-800">
                  {kelvinToCelsius}°C
                </p>
              </div>
              <div className="bg-gray-100 p-4 rounded-lg">
                <h3 className="font-semibold text-gray-600 mb-1">Humidity</h3>
                <p className="text-lg font-bold text-gray-800">
                  {weather.main?.humidity}%
                </p>
              </div>
              <div className="bg-gray-100 p-4 rounded-lg">
                <h3 className="font-semibold text-gray-600 mb-1">Wind Speed</h3>
                <p className="text-lg font-bold text-gray-800">
                  {weather.wind?.speed} m/s
                </p>
              </div>
              <div className="bg-gray-100 p-4 rounded-lg">
                <h3 className="font-semibold text-gray-600 mb-1">Cloudiness</h3>
                <p className="text-lg font-bold text-gray-800">
                  {weather.clouds?.all}%
                </p>
              </div>
              <div className="bg-gray-100 p-4 rounded-lg">
                <h3 className="font-semibold text-gray-600 mb-1">Pressure</h3>
                <p className="text-lg font-bold text-gray-800">
                  {weather.main?.pressure} hPa
                </p>
              </div>
              <div className="bg-gray-100 p-4 rounded-lg">
                <h3 className="font-semibold text-gray-600 mb-1">Visibility</h3>
                <p className="text-lg font-bold text-gray-800">
                  {weather.visibility / 1000} km
                </p>
              </div>
              <div className="bg-gray-100 p-4 rounded-lg">
                <h3 className="font-semibold text-gray-600 mb-1">Sunrise</h3>
                <p className="text-lg font-bold text-gray-800">
                  {formatTime(weather.sys?.sunrise)}
                </p>
              </div>
              <div className="bg-gray-100 p-4 rounded-lg">
                <h3 className="font-semibold text-gray-600 mb-1">Sunset</h3>
                <p className="text-lg font-bold text-gray-800">
                  {formatTime(weather.sys?.sunset)}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
