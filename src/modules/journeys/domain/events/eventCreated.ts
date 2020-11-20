import { IDomainEvent } from "core/domain/events/IDomainEvent";
import { UniqueEntityID } from "core/domain/UniqueEntityID";
import { Journey } from "../journey";

export class EventCreated implements IDomainEvent {
  public dateTimeOccurred: Date;
  public event: Journey;

  constructor(event: Journey) {
    this.dateTimeOccurred = new Date();
    this.event = event;
  }

  getAggregateId(): UniqueEntityID {
    return this.event.id;
  }
}
