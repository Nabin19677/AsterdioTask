import express from "express";
import config from "./config.js";
import errorHandler from "./_err.js";
import v1 from "./v1/index.js";

const app = express();
//Configuring Express Application
config(app);

//Versioning API
app.use("/v1", v1);

app.use(errorHandler);
export default app;
