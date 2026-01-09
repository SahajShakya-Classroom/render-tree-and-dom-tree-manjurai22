const express = require("express");

const axios = require("axios");
const app = express();

const API_KEY = "cb16bda9b2b547cebd4151935260901";
const CITY = "Kathmandu";
const URL = "https://api.weatherapi.com/v1/forecast.json";

app.get("/", (req, res) => {
  res.send("Kathmandu Weather API");
});

app.get("/weather", async (req, res) => {
  try {
    const response = await axios.get(URL, {
      params: {
        key: API_KEY,  
        q: CITY,
        days: 7
      }
    });

    const weekWeather = response.data.forecast.forecastday.map(day => ({
      date: day.date,
      city: CITY,
      temperature: day.day.avgtemp_c,
      condition: day.day.condition.text
    }));

    res.json(weekWeather);
  } catch (error) {
    res.status(500).json({ error: "Weather data not available" });
  }
});

app.listen(3000, () => {
  console.log("Server running at http://localhost:3000");
});
