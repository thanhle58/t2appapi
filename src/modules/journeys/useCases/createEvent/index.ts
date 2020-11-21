import { CreateEventController } from "./CreateEventController";
import { CreateEventUseCase } from "./CreateEventUseCase";
import { eventRepo, memberRepo } from "../../repos";
const createEventUseCase = new CreateEventUseCase(eventRepo, memberRepo);
const createEventController = new CreateEventController(createEventUseCase);
export { createEventUseCase, createEventController };
