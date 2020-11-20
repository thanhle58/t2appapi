import { AggregateRoot } from "../../../core/domain/AggregateRoot";
import { UniqueEntityID } from "../../../core/domain/UniqueEntityID";
import { Result } from "../../../core/logic/Result";
import { Guard } from "../../../core/logic/Guard";
import { UserId } from "./userId";
export interface UserProps {
  firstName?: string;
  lastName?: string;
  isEmailVerified?: boolean;
  profilePicture?: string;
  googleId?: number;
  facebookId?: number;
  username?: string;
}

export class User extends AggregateRoot<UserProps> {

  get username(): string | undefined {
    return this.props.username;
  }

  get userId (): UserId {
    return UserId.caller(this.id)
  }

  private constructor(props: UserProps, id?: UniqueEntityID) {
    super(props, id);
  }

  public static create(props: UserProps, id?: UniqueEntityID): Result<User> {
    const user = new User(
      {
        ...props,
        username: props.username ? props.username : "",
      },
      id
    );
    return Result.ok<User>(user);
  }
}
