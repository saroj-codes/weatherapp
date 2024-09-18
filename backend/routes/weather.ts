import { Router } from "express";
import { getWeather } from "../controller/weather/query";
const weatherRoute = Router();

weatherRoute.get("/weather/:city", getWeather);

export { weatherRoute };
