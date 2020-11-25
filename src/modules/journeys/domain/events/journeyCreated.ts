import { IDomainEvent } from "core/domain/events/IDomainEvent";
import { UniqueEntityID } from "core/domain/UniqueEntityID";
import { Journey } from "../journey";

export class JourneyCreated implements IDomainEvent {
  public dateTimeOccurred: Date;
  public journey: Journey;

  constructor(journey: Journey) {
    this.dateTimeOccurred = new Date();
    this.journey = journey;
  }

  getAggregateId(): UniqueEntityID {
    return this.journey.id;
  }
}
