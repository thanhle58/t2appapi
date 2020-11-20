import { BaseController } from "../../../../core/infra/BaseController";
import { ChangeSettingsUseCace } from "./ChangeSettingsUseCase";
import { ChangeSettingsDTO } from "./ChangeSettingsDTO";

export class ChangeSettingsController extends BaseController {
  private useCase: ChangeSettingsUseCace;

  constructor(useCase: ChangeSettingsUseCace) {
    super();
    this.useCase = useCase;
  }

  async executeImpl(): Promise<any> {
    const dto: ChangeSettingsDTO = this.req.body as ChangeSettingsDTO;
    try {
      await this.useCase.execute(dto);
      return this.ok(this.res)
    } catch (err) {
      console.log(err)
    }
  }
}
