import { Entity } from "../../../core/domain/Entity";
import { Result } from "../../../core/logic/Result";
import { UniqueEntityID } from "../../../core/domain/UniqueEntityID";

export class PlaceId extends Entity<any> {
  get id(): UniqueEntityID {
    return this._id;
  }

  private constructor(id?: UniqueEntityID) {
    super(null, id);
  }

  public static create(id?: UniqueEntityID) {
    return Result.ok<PlaceId>(new PlaceId(id));
  }
}
