import express from "express";

import { createEventController } from "../../../useCases/createEvent";
import { getAllEventController } from "../../../useCases/getAllEvent";

const eventRouter = express.Router();
eventRouter.post("/:memberid/journey", (req, res) => createEventController.execute(req, res));
eventRouter.get("/journeys", (req, res) => getAllEventController.execute(req, res));

eventRouter.get("/journey/:journeyId", (req, res) => getAllEventController.execute(req, res));
eventRouter.delete("/journey/:journeyId", (req, res) => getAllEventController.execute(req, res));
eventRouter.patch("/journey/:journeyId", (req, res) => getAllEventController.execute(req, res));

export { eventRouter };
