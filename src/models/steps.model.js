import mongoose from "mongoose";

const stepSchema = mongoose.Schema({
  _time: { type: String, default: "", required: true, unique: true },
  distance: { type: Number, default: 0 },
  calorie: { type: Number, default: 0 },
  startTime: { type: String, default: "" },
  endTime: { type: String, default: "" },
  steps: { type: Number, default: 0 },
  speed: { type: Number, default: 0 },
});

const Step = mongoose.model("steps", stepSchema);

export default Step;
