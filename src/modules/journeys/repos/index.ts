import { JourneyRepo } from "./journeyRepo";
import models from "../../../infra/sequelize/models/index";
import { MemberRepo } from "./memberRepo";
import { JourneyPlaceRepo } from "./journeyPlaceRepo";

const memberRepo = new MemberRepo(models);
const journeyPlace = new JourneyPlaceRepo(models);
const journeyRepo = new JourneyRepo(models, journeyPlace);

export { journeyRepo, memberRepo, journeyPlace };
