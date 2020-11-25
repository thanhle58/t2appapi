import { BaseController } from "../../../../core/infra/BaseController";
import { CreateJourneyUseCase } from "./CreateJourneyUseCase";
import { CreateJourneyDTO } from "./CreateJourneyDTO";
import { CreateJourneyErrors } from "./CreateJourneyErrors";
// import { GenericAppError } from "../../../../core/logic/AppError";

export class CreateJourneyController extends BaseController {
  private journeyCase: CreateJourneyUseCase;

  constructor(journeyCase: CreateJourneyUseCase) {
    super();
    this.journeyCase = journeyCase;
  }

  async executeImpl(): Promise<any> {
    const dto: CreateJourneyDTO = this.req.body as CreateJourneyDTO;
    dto.create_by = this.req.params["memberid"];

    try {
      const result = await this.journeyCase.execute(dto);
      if (result.isLeft()) {

        const error = result.value;
        console.log(error)
        switch (error.constructor) {
          case CreateJourneyErrors.MemberDoesntExistError:
            return this.notFound(error.errorValue().message);
          // case GenericAppError.UnexpectedError:
          //   return this.fail(error.errorValue().message);
          default:
            return this.fail(error.errorValue().message);
        }
      } else {
        return this.created(this.res);
      }
    } catch (err) {
      // console.log(err)
      return this.fail(err);
    }
  }
}
