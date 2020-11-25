import { ValueObject } from "../../../core/domain/ValueObject";
import { Result } from "../../../core/logic/Result";
import { Guard } from "../../../core/logic/Guard";

interface JourneyTitleProps {
  value: string;
}

export class JourneyTitle extends ValueObject<JourneyTitleProps> {
  get value(): string {
    return this.props.value;
  }

  private constructor(props: JourneyTitleProps) {
    super(props);
  }

  public static create(props: JourneyTitleProps): Result<JourneyTitle> {
    const nullGuardResult = Guard.againstNullOrUndefined(props.value, "journeyTitle");
    if (!nullGuardResult.succeeded) {
      return Result.fail<JourneyTitle>(nullGuardResult.message);
    } else {
      return Result.ok<JourneyTitle>(new JourneyTitle(props));
    }
  }
}
