"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.weatherRoute = void 0;
const express_1 = require("express");
const query_1 = require("../controller/weather/query");
const weatherRoute = (0, express_1.Router)();
exports.weatherRoute = weatherRoute;
weatherRoute.get("/weather/:city", query_1.getWeather);
