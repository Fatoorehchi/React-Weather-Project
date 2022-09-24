import axios from "axios";
import React, { useState } from "react";

const Home = () => {
  const [data, setData] = useState({});
  const [location, setLocation] = useState("");
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=imperial&appid=${process.env.REACT_APP_API_KEY}`;
  const [urlIcon, setUrlIcon] = useState("");
  const [error, setError] = useState("");

  const searchLocationHandler = (event) => {
    if (event.key === "Enter") {
      axios
        .get(url)
        .then((response) => {
          setData(response.data);
          setUrlIcon(
            `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
          );
          console.log(response.data);
        })
        .catch((err) => {
          setError("You have to introduce a valid city name");
          console.log(err);
        });
      setLocation("");
      setError("");
    }
  };

  if (JSON.stringify(data) === "{}") {
    return (
      <div className="app first">
        <div className="containerFirst">
          <h2>Weather Forecast Website</h2>
          <div className="search">
            <input
              className={error.length > 0 ? "errorMessage" : ""}
              value={location}
              onChange={(event) => setLocation(event.target.value)}
              onKeyPress={searchLocationHandler}
              placeholder="Enter Location"
              type="text"
            />
            <p>{error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="app">
      <div className="search">
        <input
          className={error.length > 0 ? "errorMessage" : ""}
          value={location}
          onChange={(event) => setLocation(event.target.value)}
          onKeyPress={searchLocationHandler}
          placeholder="Enter Location"
          type="text"
        />
        <p>{error}</p>
      </div>
      <div className="container">
        <div className="top">
          <div className="location">
            <p>{data.name}</p>
            <div className="description">
              {data.weather ? <p>{data.weather[0].description}</p> : null}
              {data.weather ? <img src={urlIcon} alt="Weather Icon" /> : null}
            </div>
          </div>
          <div className="temp">
            {data.main ? (
              <h1>
                <label title={parseInt(((data.main.temp - 32) * 5) / 9) + "°C"}>
                  {data.main.temp.toFixed()}°F
                </label>
              </h1>
            ) : null}
          </div>
        </div>

        {data.name !== undefined && (
          <div className="bottom">
            <div className="feels">
              {data.main ? (
                <label
                  className="bold"
                  title={parseInt(((data.main.feels_like - 32) * 5) / 9) + "°C"}
                >
                  {data.main.feels_like.toFixed()}°F
                </label>
              ) : null}
              <p>Feels Like</p>
            </div>
            <div className="humidity">
              {data.main ? <p className="bold">{data.main.humidity}%</p> : null}
              <p>Humidity</p>
            </div>
            <div className="wind">
              {data.wind ? (
                <label
                  className="bold"
                  title={parseInt(data.wind.speed / 0.621371) + "KMH"}
                >
                  {data.wind.speed.toFixed()}MPH
                </label>
              ) : null}
              <p>Wind Speed</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
