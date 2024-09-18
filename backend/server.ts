import express from "express";
import dotenv from "dotenv";
import { weatherRoute } from "./routes/weather";
import cors from "cors";

dotenv.config();

const server = express();

server.use(express.json());
server.use(cors());
const PORT = process.env.PORT;

server.use("/api", weatherRoute);

server.listen(PORT, () => {
  console.log(`Your Server is listening at PORT:${PORT}`);
});
