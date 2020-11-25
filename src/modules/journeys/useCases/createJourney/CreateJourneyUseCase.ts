import { UseCase } from "core/domain/useCase";
import { CreateJourneyDTO } from "./CreateJourneyDTO";
import { Either, Result, left, right } from "../../../../core/logic/Result";
import { UniqueEntityID } from "../../../../core/domain/UniqueEntityID";
import { GenericAppError } from "../../../../core/logic/AppError";
import { CreateJourneyErrors } from "./CreateJourneyErrors";
import { Journey } from "../../domain/journey";
import { MemberId } from "../../domain/memberId";
import { PlaceId } from "../../domain/paceId";
import { JourneyPlace } from "../../domain/journeyPlace";
import { JourneyTitle } from "../../domain/journeyTitle";

// repos
import { IJourneyRepo } from "../../repos/journeyRepo";
import { IMemberRepo } from "../../repos/memberRepo";
import { IPlaceRepo } from "../../repos/placeRepo";

type Response = Either<
  | CreateJourneyErrors.MemberDoesntExistError
  | GenericAppError.UnexpectedError
  | Result<any>,
  Result<void>
>;

export class CreateJourneyUseCase
  implements UseCase<CreateJourneyDTO, Promise<Response>> {
  private journeyRepo: IJourneyRepo;
  private memberRepo: IMemberRepo;
  private placeRepo: IPlaceRepo;

  constructor(
    journeyRepo: IJourneyRepo,
    memberRepo: IMemberRepo,
    placeRepo: IPlaceRepo
  ) {
    this.journeyRepo = journeyRepo;
    this.memberRepo = memberRepo;
    this.placeRepo = placeRepo;
  }

  async execute(request: CreateJourneyDTO): Promise<Response> {
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
        return left(Result.fail<JourneyTitle>(titleOrError.errorValue()));
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

      if (journeysOrError.isFailure) {
        return left(Result.fail<Journey>(journeysOrError.errorValue()));
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
      // if (err instanceof DatabaseError) {
      //   return left(Result.fail(err));
      // }
      return left(new GenericAppError.UnexpectedError(err));
    }
  }
}
