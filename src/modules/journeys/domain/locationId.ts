import { Entity } from "../../../core/domain/Entity";
import { Result } from "../../../core/logic/Result";
import { UniqueEntityID } from "../../../core/domain/UniqueEntityID";

export class LocationId extends Entity<any> {
  get id(): UniqueEntityID {
    return this._id;
  }

  private constructor(id?: UniqueEntityID) {
    super(null, id);
  }

  public static create(id?: UniqueEntityID) {
    return Result.ok<LocationId>(new LocationId(id));
  }
}
