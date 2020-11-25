import { JourneyRepo } from "./journeyRepo";
import models from "../../../infra/sequelize/models/index";
import { MemberRepo } from "./memberRepo";
import { JourneyPlaceRepo } from "./journeyPlaceRepo";
import { PlaceRepo } from "./implementations/placeRepo";

const memberRepo = new MemberRepo(models);
const journeyPlace = new JourneyPlaceRepo(models);
const journeyRepo = new JourneyRepo(models, journeyPlace);
const placeRepo = new PlaceRepo(models);
export { journeyRepo, memberRepo, journeyPlace, placeRepo };
