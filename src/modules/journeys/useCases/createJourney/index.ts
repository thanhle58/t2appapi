import { CreateJourneyController } from "./CreateJourneyController";
import { CreateJourneyUseCase } from "./CreateJourneyUseCase";
import { journeyRepo, memberRepo, placeRepo } from "../../repos";

const createJourneyUseCase = new CreateJourneyUseCase(
  journeyRepo,
  memberRepo,
  placeRepo
);
const createJourneyController = new CreateJourneyController(createJourneyUseCase);
export { createJourneyUseCase, createJourneyController };
