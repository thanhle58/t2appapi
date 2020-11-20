import { CreateEventController } from "./CreateEventController";
import { CreateEventUseCase } from "./CreateEventUseCase";
import { eventRepo } from "../../repos";

const createEventUseCase = new CreateEventUseCase(eventRepo);
const createEventController = new CreateEventController(createEventUseCase);
export { createEventUseCase, createEventController };
