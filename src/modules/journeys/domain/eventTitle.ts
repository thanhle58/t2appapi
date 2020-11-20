import { ValueObject } from "../../../core/domain/ValueObject";
import { Result } from "../../../core/logic/Result";
import { Guard } from "../../../core/logic/Guard";

interface EventTitleProps {
  value: string;
}

export class EventTile extends ValueObject<EventTitleProps> {
  get value(): string {
    return this.props.value;
  }

  private constructor(props: EventTitleProps) {
    super(props);
  }

  public static create(title: string): Result<EventTile> {
    const guardResult = Guard.againstNullOrUndefined(title, "title");
    if (!guardResult.succeeded) {
      return Result.fail<EventTile>(guardResult.message);
    } else {
      return Result.ok<EventTile>(new EventTile({ value: title }));
    }
  }
}
