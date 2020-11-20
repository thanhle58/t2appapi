import { BaseController } from "../../../../core/infra/BaseController";
import { CreateEventUseCase } from "./CreateEventUseCase";
import { CreateEventDTO } from "./CreateEventDTO";

import { GenericAppError } from "../../../../core/logic/AppError";

export class CreateEventController extends BaseController {
  private eventCase: CreateEventUseCase;

  constructor(eventCase: CreateEventUseCase) {
    super();
    this.eventCase = eventCase;
  }

  async executeImpl(): Promise<any> {
    const dto: CreateEventDTO = this.req.body as CreateEventDTO;
    console.log(dto)
    try {
      const result = await this.eventCase.execute(dto);
      if (result.isLeft()) {
        const error = result.value;
        switch (error.constructor) {
          case GenericAppError.UnexpectedError:
            return this.fail(error.errorValue().message);
          default:
            return this.fail(error.errorValue());
        }
      } else {
        return this.created(this.res);
      }
    } catch (err) {
      return this.fail("dsdsdsdsd");
    }
  }
}
