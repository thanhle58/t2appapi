import { UseCase } from "core/domain/useCase";
import { ChangeSettingsDTO } from "./ChangeSettingsDTO";
import { Either, Result, left, right } from "../../../../core/logic/Result";
import { GenericAppError } from "../../../../core/logic/AppError";
import { IUserRepo } from "../../repos/userRepo";
import { User } from "../../domain/user";

type Response = Either<
  GenericAppError.UnexpectedError | Result<any>,
  Result<void>
>;

export class ChangeSettingsUseCace
  implements UseCase<ChangeSettingsDTO, Promise<Response>> {
  private userRepo: IUserRepo;

  constructor(userRepo: IUserRepo) {
    this.userRepo = userRepo;
  }

  async execute(request: ChangeSettingsDTO): Promise<Response> {
    const { username } = request;
    const userOrError = User.create({ username: username });
    const combinedPropsResult = Result.combine([]);

    if (userOrError.isFailure) {
      return left(Result.fail<void>(combinedPropsResult.error)) as Response;
    }
    
    const user: User = userOrError.getValue();

    try {
      await this.userRepo.save(user);
    } catch (err) {
      return left(new GenericAppError.UnexpectedError(err)) as Response;
    }

    return right(Result.ok<void>()) as Response;
  }
}
