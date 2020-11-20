import { BaseController } from "../../../../core/infra/BaseController";
import { GetAllEventUseCase } from "./GetAllEventUseCase";
import { Journey } from "../../domain/journey";
import { EventMap } from "../../mappers/EventMap";

export class GetAllEventController extends BaseController {
  private getAllEventCase: GetAllEventUseCase;

  constructor(getAllEventCase: GetAllEventUseCase) {
    super();
    this.getAllEventCase = getAllEventCase;
  }

  async executeImpl(): Promise<any> {
    const requestdto = this.req.query;
    try {
      const result = await this.getAllEventCase.execute(requestdto);
      const events: Journey[] = result.value.getValue();
      const eventsDto = events.map((event) => EventMap.toDTO(event));
      return this.ok(this.res, eventsDto);
    } catch (err) {
      return this.fail(err);
    }
  }
}
