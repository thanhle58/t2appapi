import { DatabaseError } from "sequelize";
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
import { JourneyTitle } from "../../domain/journeyTitle";

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
    const { price, create_by, status, type, location_ids } = request;

    try {
      const memnberidIsExist = await this.memberRepo.exists(create_by);
      if (!memnberidIsExist) {
        return left(new CreateJourneyErrors.MemberDoesntExistError());
      }

      const memberIdOrError = MemberId.create(new UniqueEntityID(create_by));

      if (memberIdOrError.isFailure) {
        return left(memberIdOrError);
      }

      const titleOrError = JourneyTitle.create({ value: request.title });
      if (titleOrError.isFailure) {
        return left(titleOrError);
      }

      const journeysOrError = Journey.create({
        title: titleOrError.getValue(),
        startDate: new Date().getMinutes(),
        endDate: new Date().getMinutes(),
        price: price || 0,
        createBy: memberIdOrError.getValue(),
        type: type,
        status: status,
      });

      // const combinedPropsResult = Result.combine([]);

      if (journeysOrError.isFailure) {
        return left(journeysOrError);
      }

      const journey: Journey = journeysOrError.getValue();

      for (let placeId of location_ids) {
        const place = JourneyPlace.create({
          placeId: PlaceId.create(new UniqueEntityID(placeId)).getValue(),
          journeyId: journey.journeyId,
        }).getValue();
        journey.addPlace(place);
      }
      await this.journeyRepo.save(journey);
      return right(Result.ok<void>());
    } catch (err) {
      if (err instanceof DatabaseError) {
        console.log(err.message);
        return left(Result.fail(err.message));
      }
      return left(new GenericAppError.UnexpectedError(err));
    }
  }
}
