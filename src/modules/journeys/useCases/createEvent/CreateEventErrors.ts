
import { UseCaseError } from "../../../../core/logic/UseCaseError";
import { Result } from "../../../../core/logic/Result";

export namespace CreateEventErrors {

    export class EventAlreadyExists extends Result<UseCaseError> {    
        constructor (locationId: string, ) {
          super(false, {
            message: `The email ${locationId} associated for this account already exists`
          } as UseCaseError)
        }
      }
 }