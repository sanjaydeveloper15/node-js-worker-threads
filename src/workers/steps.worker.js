import stepService from "../services/steps.service.js";
import mongooseDb from "../../config/mongoose-conn.js";
import { parentPort } from "node:worker_threads";

// We can do any heavy stuff here, in a synchronous way
class BgTaskWorker {
  constructor() {
    const mongoDB = new mongooseDb();
    mongoDB.connect();
  }

  async bgTask() {
    try {
      const listing = await stepService.getAllSteps();
      for (let i = 0; i < 20; i++) {
        for (let list of listing) {
          await stepService.updateSteps(list._id);
          await stepService.updateDistance(list._id);
        }
      }
      return true;
    } catch (error) {
      console.error(error.message);
    }
  }
}

const workerObj = new BgTaskWorker();
const response = await workerObj.bgTask();

parentPort.postMessage(response);
