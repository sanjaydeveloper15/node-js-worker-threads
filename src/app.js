"use strict";
import express from "express";
import dbConnmongooseDb from '../config/mongoose-conn.js';
import { readFile } from "fs/promises";
import router from "./routes/index.js";
import mongooseDb from "../config/mongoose-conn.js";
const app = express();

//api v1 base route set
app.use('/api/v1', router);

//no way to import json that's why calling with readFile
const server = JSON.parse(
  await readFile(new URL("../config/server.json", import.meta.url))
);

//start server
app.listen(server.port, "0.0.0.0", () => {
  console.log(`Server started on port:${server.port}`);
});

const mongoDB = new mongooseDb();
mongoDB.connect()

