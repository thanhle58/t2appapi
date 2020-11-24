import { CreateEventController } from "./CreateEventController";
import { CreateEventUseCase } from "./CreateEventUseCase";
import { journeyRepo, memberRepo } from "../../repos";
const createEventUseCase = new CreateEventUseCase(journeyRepo, memberRepo);
const createEventController = new CreateEventController(createEventUseCase);
export { createEventUseCase, createEventController };
