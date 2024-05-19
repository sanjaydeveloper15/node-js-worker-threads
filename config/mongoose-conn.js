import mongoose from "mongoose";
import { readFile } from "fs/promises";

//no way to import json that's why calling with readFile
const server = JSON.parse(
  await readFile(new URL("./server.json", import.meta.url))
);

class mongooseDb {
  async connect() {
    try {
      //db connect
      mongoose.connect(server.dbHostLocal);
      const dbConn = mongoose.connection;
      dbConn.on("open", () => {
        console.log("mongodb connected");
      });
    } catch (err) {
      console.error(`DB connection error: ${err.message}`);
    }
  }
}

export default mongooseDb;
