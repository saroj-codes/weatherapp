"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const weather_1 = require("./routes/weather");
const cors_1 = __importDefault(require("cors"));
dotenv_1.default.config();
const server = (0, express_1.default)();
server.use(express_1.default.json());
server.use((0, cors_1.default)());
const PORT = process.env.PORT;
server.use("/api", weather_1.weatherRoute);
server.listen(PORT, () => {
    console.log(`Your Server is listening at PORT:${PORT}`);
});
