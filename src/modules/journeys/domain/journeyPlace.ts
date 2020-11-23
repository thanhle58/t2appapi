import { Entity } from "../../../core/domain/Entity";
import { UniqueEntityID } from "../../../core/domain/UniqueEntityID";
import { Result } from "../../../core/logic/Result";
import { Guard } from "../../../core/logic/Guard";
import { JourneyId } from "./journeyId";
import { PlaceId } from "./paceId";

interface IJourneyPlaceProps {
  journeyId: JourneyId;
  placeId: PlaceId;
  startDate?: number;
  endDate?: number;
}

export class JourneyPlace extends Entity<IJourneyPlaceProps> {
  get id(): UniqueEntityID {
    return this._id;
  }

  get placeId(): PlaceId {
    return this.props.placeId;
  }

  get journeyId(): JourneyId {
    return this.props.journeyId;
  }

  public static create(
    props: IJourneyPlaceProps,
    id?: UniqueEntityID
  ): Result<JourneyPlace> {
    const guardResult = Guard.againstNullOrUndefinedBulk([
      { argument: props.placeId, argumentName: "placeId" },
      { argument: props.journeyId, argumentName: "journeyId" },
    ]);
    if (!guardResult.succeeded) {
      return Result.fail<JourneyPlace>(guardResult.message);
    }
    return Result.ok<JourneyPlace>(new JourneyPlace(props, id));
  }
}
