import { resolve } from "node:path";
import stepService from "../services/steps.service.js";
import { Worker } from "node:worker_threads";

const stepsController = {};

stepsController.getListing = async (req, res, next) => {
  try {
    const listing = await stepService.getAllSteps();
    return res.status(200).send({ message: "success", listing });
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
};

// blocking main thread
stepsController.getBlockingListing = async (req, res, next) => {
  try {
    const listing = await stepService.getAllSteps();
    for (let i = 0; i < 20; i++) {
      for (let list of listing) {
        await stepService.updateSteps(list._id);
        await stepService.updateDistance(list._id);
      }
    }
    const updatedList = await stepService.getAllSteps();
    return res.status(200).send({ message: "success", updatedList });
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
};

// not blocking main thread
stepsController.getNonBlockingListing = async (req, res, next) => {
  try {
    let updatedList = {};
    const promiseResult = await new Promise((resolve, reject) => {
      const worker = new Worker("./src/workers/steps.worker.js");
      worker.on("message", (result) => {
        console.log(result, "message");
        resolve(result);
      });
      worker.on("error", (result) => {
        console.log(result, "error");
        reject(result);
      });
      worker.on("exit", (code) => {
        console.log(code, "exit");
        if (code !== 0) {
          reject(new Error(`Worker stopped with exit code: ${code}`));
        } else {
          resolve();
        }
      });
    });
    if(promiseResult) {
      updatedList = await stepService.getAllSteps();
    }
    return res.status(200).send({ message: "success", updatedList });
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
};

export default stepsController;
