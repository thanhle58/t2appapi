import { EventRepo } from "./eventRepo";
import models from "../../../infra/sequelize/models/index";
import { MemberRepo } from "./memberRepo";
import { JourneyPlaceRepo } from "./journeyPlaceRepo";
const eventRepo = new EventRepo(models);
const memberRepo = new MemberRepo(models);
const journeyPlace = new JourneyPlaceRepo(models);

export { eventRepo, memberRepo, journeyPlace };
