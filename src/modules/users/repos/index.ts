
import { UserRepo } from "./userRepo";
import models from "../../../infra/sequelize/models/index";

const userRepo = new UserRepo(models);

export {
  userRepo
}