import { ChangeSettingsController } from "./ChangeSettingsController";
import { ChangeSettingsUseCace } from "./ChangeSettingsUseCase";
import { userRepo } from "../../repos";

const changeSettingsUseCase = new ChangeSettingsUseCace(userRepo);
const changeSettingsController = new ChangeSettingsController(
  changeSettingsUseCase
);
export { changeSettingsUseCase, changeSettingsController };
