import { AggregateRoot } from "../../../core/domain/AggregateRoot";
import { UniqueEntityID } from "../../../core/domain/UniqueEntityID";
import { Result } from "../../../core/logic/Result";
import { Guard } from "../../../core/logic/Guard";
import { JourneyId } from "./journeyId";
import { Member } from "./member";
import { MemberId } from "./memberId";
import { Members } from "./members";
import { JourneyPlaces } from "./journeyPlaces";
import { JourneyTitle } from "./journeyTitle";
import { JourneyPlace } from "./journeyPlace";
//events
import { JourneyCreated } from "./events/journeyCreated";

export interface JourneyProps {
  title: JourneyTitle;
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

  get title(): JourneyTitle {
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

  public addMember(member: Member) {
    this.props.members?.add(member);
    return Result.ok<void>();
  }

  public updateStatus() {}
  public removeMember() {}
  public removeVote() {}

  public addPlace(place: JourneyPlace) {
    this.props.places?.add(place);
    return Result.ok<void>();
  }

  public getPlaces(): JourneyPlaces {
    return this.props.places || JourneyPlaces.create([]);
  }

  public static create(
    props: JourneyProps,
    id?: UniqueEntityID
  ): Result<Journey> {
    const guardedProps = [{ argument: props.title, argumentName: "title" }];

    const guardResult = Guard.againstNullOrUndefinedBulk(guardedProps);

    if (!guardResult.succeeded) {
      return Result.fail<Journey>(guardResult);
    }

    const defaultProps: JourneyProps = {
      ...props,
      price: props.price ? props.price : 0,
      totalNumMember: props.totalNumMember ? props.totalNumMember : 0,
      members: props.members ? props.members : Members.create([]),
      type: props.type ? props.type : "trekkking",
      places: props.places ? props.places : JourneyPlaces.create([]),
    };

    const event = new Journey(defaultProps, id);
    const isNewEevent = !!id === false;

    if (isNewEevent) {
      event.addDomainEvent(new JourneyCreated(event));
    }

    return Result.ok<Journey>(event);
  }
}
