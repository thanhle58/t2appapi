import { UseCase } from "core/domain/useCase";
import { CreateEventDTO } from "./CreateEventDTO";
import { Either, Result, left, right } from "../../../../core/logic/Result";
import { UniqueEntityID } from "../../../../core/domain/UniqueEntityID";

import { GenericAppError } from "../../../../core/logic/AppError";
import { IEventRepo } from "../../repos/eventRepo";
import { IMemberRepo } from "../../repos/memberRepo";
import { Journey } from "../../domain/journey";
import { MemberId } from "../../domain/memberId";
import { LocationId } from "../../domain/locationId";
import Aws from "serverless/aws";
type Response = Either<
  GenericAppError.UnexpectedError | Result<any>,
  Result<void>
>;

export class CreateEventUseCase
  implements UseCase<CreateEventDTO, Promise<Response>> {
  private eventRepo: IEventRepo;
  private memberRepo: IMemberRepo;

  constructor(eventRepo: IEventRepo, memberRepo: IMemberRepo) {
    this.eventRepo = eventRepo;
    this.memberRepo = memberRepo;
  }

  async execute(request: CreateEventDTO): Promise<Response> {
    const {
      title,
      start_date,
      end_date,
      price,
      create_by,
      status,
      location_id,
      type,
    } = request;

    const memnberidIsExist = await this.memberRepo.exists(create_by);

    if (!memnberidIsExist) {
      return left(new GenericAppError.UnexpectedError(`User id: ${create_by} not found`)) as Response;
    }

    const memberIdOrError = MemberId.create(new UniqueEntityID(create_by));

    if (memberIdOrError.isFailure) {
      return left(Result.fail<MemberId>(memberIdOrError.error));
    }

    const eventOrError = Journey.create({
      title: title,
      startDate: start_date,
      endDate: end_date,
      price: price || 0,
      createBy: memberIdOrError.getValue(),
      // status: status || 0,
    });

    // const combinedPropsResult = Result.combine([]);

    if (eventOrError.isFailure) {
      return left(Result.fail<Journey>(eventOrError.error)) as Response;
    }

    const event: Journey = eventOrError.getValue();
    try {
      await this.eventRepo.save(event);
    } catch (err) {
      return left(new GenericAppError.UnexpectedError(err.error)) as Response;
    }
    return right(Result.ok<void>()) as Response;
  }
}
