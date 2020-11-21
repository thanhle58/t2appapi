import { EventRepo } from "./eventRepo";
import models from "../../../infra/sequelize/models/index";
import { MemberRepo } from "./memberRepo";

const eventRepo = new EventRepo(models);
const memberRepo = new MemberRepo(models);
export { eventRepo, memberRepo };
