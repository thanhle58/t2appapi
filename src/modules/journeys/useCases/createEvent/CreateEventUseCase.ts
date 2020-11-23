import { UseCase } from "core/domain/useCase";
import { CreateEventDTO } from "./CreateEventDTO";
import { Either, Result, left, right } from "../../../../core/logic/Result";
import { UniqueEntityID } from "../../../../core/domain/UniqueEntityID";
import { GenericAppError } from "../../../../core/logic/AppError";
import { CreateJourneyErrors } from "./CreateJourneyErrors";
import { IEventRepo } from "../../repos/eventRepo";
import { IMemberRepo } from "../../repos/memberRepo";
import { IJourneyPlaceRepo } from "../../repos/journeyPlaceRepo";
import { Journey } from "../../domain/journey";
import { MemberId } from "../../domain/memberId";
import { PlaceId } from "../../domain/paceId";
import { JourneyPlaces } from "../../domain/journeyPlaces";
import { JourneyPlace } from "../../domain/journeyPlace";

type Response = Either<
  | CreateJourneyErrors.MemberDoesntExistError
  | GenericAppError.UnexpectedError
  | Result<any>,
  Result<void>
>;

export class CreateEventUseCase
  implements UseCase<CreateEventDTO, Promise<Response>> {
  private eventRepo: IEventRepo;
  private memberRepo: IMemberRepo;
  private journeyPlaceRepo: IJourneyPlaceRepo;

  constructor(
    eventRepo: IEventRepo,
    memberRepo: IMemberRepo,
    journeyPlaceRepo: IJourneyPlaceRepo
  ) {
    this.eventRepo = eventRepo;
    this.memberRepo = memberRepo;
    this.journeyPlaceRepo = journeyPlaceRepo;
  }

  async execute(request: CreateEventDTO): Promise<Response> {
    const { title, price, create_by, status, type, location_ids } = request;
    const memnberidIsExist = await this.memberRepo.exists(create_by);

    if (!memnberidIsExist) {
      return left(new CreateJourneyErrors.MemberDoesntExistError());
    }

    const memberIdOrError = MemberId.create(new UniqueEntityID(create_by));
    let journeyPlaceWatch = JourneyPlaces.create();

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
    const journeyId = journey.id.toString();

    for (let placeId of location_ids) {
      const journeyPlace = JourneyPlace.create({
        placeId: PlaceId.create(new UniqueEntityID(placeId)).getValue(),
        journeyId: PlaceId.create(new UniqueEntityID(journeyId)).getValue(),
      }).getValue();
      journeyPlaceWatch.add(journeyPlace);
    }

    try {
      await this.eventRepo.save(journey);
      console.log(journeyPlaceWatch.getNewItems());
      console.log(journeyPlaceWatch);

    } catch (err) {
      return left(new GenericAppError.UnexpectedError(err.error)) as Response;
    }
    return right(Result.ok<void>()) as Response;
  }
}
