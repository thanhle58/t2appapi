import { UseCaseError } from "../../../../core/logic/UseCaseError";
import { Result } from "../../../../core/logic/Result";

export namespace CreateJourneyErrors {
  export class MemberDoesntExistError extends Result<UseCaseError> {
    constructor() {
      super(false, {
        message: `A journey member doesn't exist for this account.`,
      } as UseCaseError);
    }
  }

  export class PlaceDoesntExistError extends Result<UseCaseError> {
    constructor() {
      super(false, {
        message: `The place doesn't exist.`,
      } as UseCaseError);
    }
  }
}
