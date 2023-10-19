import express from "express";;
import { config } from "dotenv";
import morgan from "morgan";
import router from "./routes";

config();

const app = express();

app.use(express.json());

app.use(morgan("dev"));

app.use("/api/v1", router);

export default app;