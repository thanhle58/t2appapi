import { EventRepo } from "./eventRepo";
import models from "../../../infra/sequelize/models/index";

const eventRepo = new EventRepo(models);

export {
    eventRepo
}