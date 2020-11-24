import { UseCase } from "core/domain/useCase";
import { CreateEventDTO } from "./CreateEventDTO";
import { Either, Result, left, right } from "../../../../core/logic/Result";
import { UniqueEntityID } from "../../../../core/domain/UniqueEntityID";
import { GenericAppError } from "../../../../core/logic/AppError";
import { CreateJourneyErrors } from "./CreateJourneyErrors";
import { IJourneyRepo } from "../../repos/journeyRepo";
import { IMemberRepo } from "../../repos/memberRepo";
import { Journey } from "../../domain/journey";
import { MemberId } from "../../domain/memberId";
import { PlaceId } from "../../domain/paceId";
import { JourneyPlace } from "../../domain/journeyPlace";

type Response = Either<
  | CreateJourneyErrors.MemberDoesntExistError
  | GenericAppError.UnexpectedError
  | Result<any>,
  Result<void>
>;

export class CreateEventUseCase
  implements UseCase<CreateEventDTO, Promise<Response>> {
  private journeyRepo: IJourneyRepo;
  private memberRepo: IMemberRepo;

  constructor(eventRepo: IJourneyRepo, memberRepo: IMemberRepo) {
    this.journeyRepo = eventRepo;
    this.memberRepo = memberRepo;
  }

  async execute(request: CreateEventDTO): Promise<Response> {
    const { title, price, create_by, status, type, location_ids } = request;
    const memnberidIsExist = await this.memberRepo.exists(create_by);

    if (!memnberidIsExist) {
      return left(new CreateJourneyErrors.MemberDoesntExistError());
    }

    const memberIdOrError = MemberId.create(new UniqueEntityID(create_by));
    if (memberIdOrError.isFailure) {
      return left(Result.fail<MemberId>(memberIdOrError.error));
    }

    const journeysOrError = Journey.create({
      title: title,
      startDate: new Date().getMinutes(),
      endDate: new Date().getMinutes(),
      price: price || 0,
      createBy: memberIdOrError.getValue(),
      type: type,
      status: status,
    });

    // const combinedPropsResult = Result.combine([]);

    if (journeysOrError.isFailure) {
      return left(Result.fail<Journey>(journeysOrError.error)) as Response;
    }

    const journey: Journey = journeysOrError.getValue();

    for (let placeId of location_ids) {
      const place = JourneyPlace.create({
        placeId: PlaceId.create(new UniqueEntityID(placeId)).getValue(),
        journeyId: journey.journeyId,
      }).getValue();
      journey.addPlace(place);
    }

    try { 
      await this.journeyRepo.save(journey);
    } catch (err) {
      return left(new GenericAppError.UnexpectedError(err.error)) as Response;
    }
    return right(Result.ok<void>()) as Response;
  }
}
