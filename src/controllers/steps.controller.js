import stepService from "../services/steps.service.js";

const stepsController = {};

stepsController.getListing = async (req, res, next) => {
  try {
    const listing = await stepService.getAllSteps();
    return res.status(200).send({ message: "success", listing });
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
};

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

export default stepsController;
