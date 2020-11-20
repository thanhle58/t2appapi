import express from "express";

import { createEventController } from "../../../useCases/createEvent";
import { getAllEventController } from "../../../useCases/getAllEvent";

const eventRouter = express.Router();
eventRouter.post("/event", (req, res) => createEventController.execute(req, res));
eventRouter.get("/events", (req, res) => getAllEventController.execute(req, res));

eventRouter.get("/event/:eventId", (req, res) => getAllEventController.execute(req, res));
eventRouter.delete("/event/:eventId", (req, res) => getAllEventController.execute(req, res));
eventRouter.patch("/event/:eventId", (req, res) => getAllEventController.execute(req, res));

export { eventRouter };
