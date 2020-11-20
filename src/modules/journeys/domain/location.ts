import { Entity } from "../../../core/domain/Entity";
import { UniqueEntityID } from "../../../core/domain/UniqueEntityID";
import { Result } from "../../../core/logic/Result";
import { Guard } from "../../../core/logic/Guard";
import { LocationId } from "./locationId";

interface LocationProps {
  loactionId: LocationId;
  locationName: string;
}

export class Location extends Entity<LocationProps> {
  get id(): UniqueEntityID {
    return this._id;
  }
  get locationName(): string {
    return this.locationName;
  }

  constructor(props: LocationProps, id?: UniqueEntityID) {
    super(props, id);
  }

  public static create(props: LocationProps, id?: UniqueEntityID) {
    const guardedProps = [
      { argument: props.locationName, argumentName: "locationName" },
    ];

    const guardResult = Guard.againstNullOrUndefinedBulk(guardedProps);
    if (!guardResult.succeeded) {
      return Result.fail<Location>(guardResult.message);
    }
    const location = new Location(props, id);
    return Result.ok<Location>(location);
  }
}
