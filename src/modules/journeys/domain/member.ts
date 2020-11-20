import { Entity } from "../../../core/domain/Entity";
import { UniqueEntityID } from "../../../core/domain/UniqueEntityID";
import { Result } from "../../../core/logic/Result";
import { Guard } from "../../../core/logic/Guard";
import { MemberId } from "./memberId";

export interface MenberProps {
  userId: MemberId;
}

export class Member extends Entity<MenberProps> {
  get menberId(): MemberId {
    return MemberId.create(this._id).getValue();
  }

  private constructor(props: MenberProps, id?: UniqueEntityID) {
    super(props, id);
  }

  public create(props: MenberProps, id?: UniqueEntityID): Result<Member> {
    const guardResult = Guard.againstNullOrUndefinedBulk([
      { argument: props.userId, argumentName: "userId" },
    ]);

    if (!guardResult.succeeded) {
      return Result.fail<Member>(guardResult.message);
    }

    const event = new Member(
      {
        ...props,
      },
      id
    );
    return Result.ok<Member>(event);
  }
}
