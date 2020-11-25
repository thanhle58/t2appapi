import express from "express";

import { createJourneyController } from "../../../useCases/createJourney";
import { getAllEventController } from "../../../useCases/getAllEvent";

const journeyRouter = express.Router();
journeyRouter.post("/:memberid/journey", (req, res) => createJourneyController.execute(req, res));
journeyRouter.get("/journeys", (req, res) => getAllEventController.execute(req, res));

journeyRouter.get("/journey/:journeyId", (req, res) => getAllEventController.execute(req, res));
journeyRouter.delete("/journey/:journeyId", (req, res) => getAllEventController.execute(req, res));
journeyRouter.patch("/journey/:journeyId", (req, res) => getAllEventController.execute(req, res));

export { journeyRouter };
