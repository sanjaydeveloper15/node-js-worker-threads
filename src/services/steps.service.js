import Step from "../models/steps.model.js";

const getAllSteps = async () => {
  return await Step.find({});
};

const updateSteps = async (id) => {
  return await Step.updateOne(
    { _id: id },
    {
      $set: {
        steps: Math.round(Math.random() * (5000 - 1000) + 1000),
      },
    }
  );
};

const updateDistance = async (id) => {
    return await Step.updateOne(
      { _id: id },
      {
        $set: {
            distance: Math.round(Math.random() * (100 - 2) + 2),
        },
      }
    );
  };

const stepService = { getAllSteps, updateSteps, updateDistance };

export default stepService;
