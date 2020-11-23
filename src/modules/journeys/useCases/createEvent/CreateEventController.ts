import { BaseController } from "../../../../core/infra/BaseController";
import { CreateEventUseCase } from "./CreateEventUseCase";
import { CreateEventDTO } from "./CreateEventDTO";
import { GenericAppError } from "../../../../core/logic/AppError";
import { CreateJourneyErrors } from "./CreateJourneyErrors";

export class CreateEventController extends BaseController {
  private eventCase: CreateEventUseCase;

  constructor(eventCase: CreateEventUseCase) {
    super();
    this.eventCase = eventCase;
  }

  async executeImpl(): Promise<any> {
    const dto: CreateEventDTO = this.req.body as CreateEventDTO;
    dto.create_by = this.req.params["memberid"];

    try {
      const result = await this.eventCase.execute(dto);
      if (result.isLeft()) {

        const error = result.value;
        switch (error.constructor) {
          case CreateJourneyErrors.MemberDoesntExistError:
            console.log(error.errorValue())
            return this.notFound(error.errorValue().message);
          // case GenericAppError.UnexpectedError:
          //   return this.fail(error.errorValue().error);
          default:
            return this.fail(error.errorValue().message);
        }
      } else {
        return this.created(this.res);
      }
    } catch (err) {
      return this.fail(err.message);
    }
  }
}
