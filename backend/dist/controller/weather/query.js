"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getWeather = void 0;
const axios_1 = __importDefault(require("axios"));
const http_status_codes_1 = require("http-status-codes");
const getWeather = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const API_KEY = process.env.API_KEY;
    const { city } = req.params;
    if (!city) {
        return res
            .status(http_status_codes_1.StatusCodes.BAD_REQUEST)
            .json({ message: "City is Required" });
    }
    try {
        const response = yield axios_1.default.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`);
        res.status(http_status_codes_1.StatusCodes.OK).json(response.data);
    }
    catch (error) {
        console.error("Error fetching weather data:", error);
        if (error.response) {
            res
                .status(error.response.status)
                .json({ message: error.response.statusText });
        }
        else {
            res
                .status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR)
                .json({ message: "Internal Server Error" });
        }
    }
});
exports.getWeather = getWeather;
