"use strict";
import express from "express";
import mongoose from "mongoose";
import { readFile } from "fs/promises";
const app = express();

//no way to import json that's why calling with readFile
const server = JSON.parse(
  await readFile(new URL("../config/server.json", import.meta.url))
);

//db connect
mongoose.connect(server.dbHostLocal);
const conn = mongoose.connection;
conn.on("open", () => {
  console.log("mongodb connected");
});

//start server
app.listen(server.port, "0.0.0.0", () => {
  console.log(`Server started on port:${server.port}`);
});
