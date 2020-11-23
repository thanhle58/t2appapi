import { AggregateRoot } from "../../../core/domain/AggregateRoot";
import { UniqueEntityID } from "../../../core/domain/UniqueEntityID";
import { Result } from "../../../core/logic/Result";
import { Guard } from "../../../core/logic/Guard";
import { JourneyId } from "./journeyId";
import { Member } from "./member";
import { MemberId } from "./memberId";
import { Members } from "./members";
import { JourneyPlaces } from "./journeyPlaces";
//events
import { EventCreated } from "./events/eventCreated";

export interface JourneyProps {
  title: string;
  price: number;
  status?: number;
  startDate: number;
  endDate: number;
  createBy: MemberId;
  type?: string;
  journeyId?: string;
  places?: JourneyPlaces;
  members?: Members;
  totalNumMember?: number;
}

export class Journey extends AggregateRoot<JourneyProps> {
  get id(): UniqueEntityID {
    return this._id;
  }

  get title(): string | undefined {
    return this.props.title;
  }

  get journeyId(): JourneyId {
    return JourneyId.create(this._id).getValue();
  }

  get startDate(): Date {
    return new Date(this.props.startDate);
  }

  get createBy(): MemberId {
    return this.props.createBy;
  }

  get endDate(): Date {
    return new Date(this.props.endDate);
  }

  get price(): number {
    return this.props.price;
  }

  get status(): number {
    return this.props.status || 0;
  }

  get type(): string {
    return this.props.type || "";
  }

  get members(): Members | undefined {
    return this.props.members;
  }

  get totalNumMember(): number {
    return this.props.totalNumMember || 0;
  }

  private constructor(props: JourneyProps, id?: UniqueEntityID) {
    super(props, id);
  }

  public static addMember(member: Member) {}
  public static addComment() {}
  public static updateStartdate() {}
  public static updateEndDate() {}
  public static updateStatus() {}
  public static removeMember() {}
  public static updateComment() {}
  public static addVote() {}
  public static removeVote() {}
  public static addPlaces(places: JourneyPlaces) {}

  public static create(
    props: JourneyProps,
    id?: UniqueEntityID
  ): Result<Journey> {
    const guardedProps = [
      { argument: props.title, argumentName: "title" },
      // { argument: props.createBy, argumentName: "createBy" },
      // { argument: props.locationId, argumentName: "locationId" },
    ];

    const guardResult = Guard.againstNullOrUndefinedBulk(guardedProps);
    if (!guardResult.succeeded) {
      return Result.fail<Journey>(guardResult.message);
    }

    const defaultProps: JourneyProps = {
      ...props,
      price: props.price ? props.price : 0,
      totalNumMember: props.totalNumMember ? props.totalNumMember : 0,
      members: props.members ? props.members : Members.create([]),
      type: props.type ? props.type : "trekkking",
    };

    const event = new Journey(defaultProps, id);
    const isNewEevent = !!id === false;

    if (isNewEevent) {
      event.addDomainEvent(new EventCreated(event));
    }

    return Result.ok<Journey>(event);
  }
}
