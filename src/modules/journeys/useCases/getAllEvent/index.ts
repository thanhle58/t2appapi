import { GetAllEventController } from "./GetAllEventController";
import { GetAllEventUseCase } from "./GetAllEventUseCase";
import { eventRepo } from "../../repos";

const getAllEventUseCase = new GetAllEventUseCase(eventRepo);
const getAllEventController = new GetAllEventController(getAllEventUseCase);
export { getAllEventUseCase, getAllEventController };
