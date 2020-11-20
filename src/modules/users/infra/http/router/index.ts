import express from "express";

import { changeSettingsController } from "../../../useCases/changeSettings";

const userRouter = express.Router();
userRouter.post(
  "/",
  (req, res) => changeSettingsController.execute(req, res)
);
export { userRouter };
