import express from "express";
import stepsController from "../controllers/steps.controller.js";

const router = express.Router();

router.get('/steps/list', stepsController.getListing)
router.get('/steps/list/blocking', stepsController.getBlockingListing)

export default router;