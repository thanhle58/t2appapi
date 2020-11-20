import { Entity } from "./Entity";
import { IDomainEvent } from "./events/IDomainEvent";
import { DomainEvents } from "./events/DomainEvent";
import { UniqueEntityID } from "./UniqueEntityID";

export abstract class AggregateRoot<T> extends Entity<T> {
  private _domainEvent: IDomainEvent[] = [];

  get id(): UniqueEntityID {
    return this._id;
  }

  protected addDomainEvent(domainEvent: IDomainEvent): void {
    this._domainEvent.push(domainEvent);
    DomainEvents.markAggregateForDispatch(this);
    // log the domain event
    this.logDomainEventAdded(domainEvent);
  }

  get domainEvents(): IDomainEvent[] {
    return this._domainEvent;
  }
  
  public clearEvent() {
    this._domainEvent.splice(0, this._domainEvent.length);
  }

  private logDomainEventAdded(domainEvent: IDomainEvent): void {
    const thisClass = Reflect.getPrototypeOf(this);
    const domainEventClass = Reflect.getPrototypeOf(domainEvent);
    console.info(
      `[Domain Event created ]`,
      thisClass.constructor.name,
      "=>",
      domainEventClass.constructor.name
    );
  }
}
