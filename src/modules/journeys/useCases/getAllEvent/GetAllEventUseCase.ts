import { UseCase } from "core/domain/useCase";
import { Either, Result, left, right } from "../../../../core/logic/Result";
import { GenericAppError } from "../../../../core/logic/AppError";
import { IJourneyRepo } from "../../repos/journeyRepo";
import { Journey } from "../../domain/journey";

type Response = Either<
  GenericAppError.UnexpectedError | Result<any>,
  Result<void> | Result<Journey[]>
>;

interface GetAllEventUseCaseRequestDTO {
  locationId?: string;
  startDate?: number;
  endDate?: number;
  price?: number;
  paged?: number;
  pageSize?: number;
  status?: boolean;
  type?: number;
}

export class GetAllEventUseCase
  implements UseCase<GetAllEventUseCaseRequestDTO, Promise<Response>> {
  private journeyRepo: IJourneyRepo;

  constructor(eventRepo: IJourneyRepo) {
    this.journeyRepo = eventRepo;
  }

  public async execute(
    request: GetAllEventUseCaseRequestDTO
  ): Promise<Response> {
    try {
      const result = await this.journeyRepo.findEvent();
      return right(Result.ok<Journey[]>(result));
    } catch (err) {
      return left(Result.fail<Journey[]>(err));
    }
  }
}
