import { CreateEventController } from "./CreateEventController";
import { CreateEventUseCase } from "./CreateEventUseCase";
import { eventRepo, memberRepo, journeyPlace } from "../../repos";
const createEventUseCase = new CreateEventUseCase(eventRepo, memberRepo, journeyPlace);
const createEventController = new CreateEventController(createEventUseCase);
export { createEventUseCase, createEventController };
