import axios from "axios";
import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

const getWeather = async (req: Request, res: Response) => {
  const API_KEY = process.env.API_KEY;
  const { city } = req.params;

  if (!city) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "City is Required" });
  }

  try {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`
    );

    res.status(StatusCodes.OK).json(response.data);
  } catch (error: any) {
    console.error("Error fetching weather data:", error);
    if (error.response) {
      res
        .status(error.response.status)
        .json({ message: error.response.statusText });
    } else {
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ message: "Internal Server Error" });
    }
  }
};

export { getWeather };
