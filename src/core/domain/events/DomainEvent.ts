import { UniqueEntityID } from "../UniqueEntityID";
import { AggregateRoot } from "../AggregateRoot";
import { IDomainEvent } from "./IDomainEvent";
type IhandlerMap = {
  [key: string]: any;
};

export class DomainEvents {
  private static handlersMap: IhandlerMap = {};
  private static markedAggregates: AggregateRoot<any>[] = [];

  public static markAggregateForDispatch(aggregate: AggregateRoot<any>): void {
    const aggregateFound = !!this.findMarkedAggregateByID(aggregate.id);
    if (!aggregateFound) {
      this.markedAggregates.push(aggregate);
    }
  }

  private static dispatchAggregateEvents(aggregate: AggregateRoot<any>): void {
    aggregate.domainEvents.forEach((event: IDomainEvent) =>
      this.dispatch(event)
    );
  }

  public static removeAggregateFromMarkedDispatchList(
    aggregate: AggregateRoot<any>
  ) {
    const index = this.markedAggregates.findIndex((a) => a.equels(aggregate));
    this.markedAggregates.splice(index);
  }

  public static findMarkedAggregateByID(
    id: UniqueEntityID
  ): AggregateRoot<any> | null {
    let found: AggregateRoot<any> | null = null;
    for (let aggregate of this.markedAggregates) {
      if (aggregate.id.equals(id)) {
        found = aggregate;
      }
    }
    return found;
  }

  public static dispatchEventsForAggregate(id: UniqueEntityID): void {
    const aggregate = this.findMarkedAggregateByID(id);
    if (aggregate) {
      this.dispatchAggregateEvents(aggregate);
      aggregate.clearEvent();
      this.removeAggregateFromMarkedDispatchList(aggregate);
    }
  }

  public static register(
    callback: (event: IDomainEvent) => void,
    eventClassName: string
  ): void {
    if (!this.handlersMap.hasOwnProperty(eventClassName)) {
      this.handlersMap[eventClassName] = [];
    }
    this.handlersMap[eventClassName].push(callback);
  }

  public static clearHandlerMap(): void {
    this.handlersMap = {};
  }

  public static clearMarkedAggregates(): void {
    this.markedAggregates = [];
  }

  public static dispatch(event: IDomainEvent): void {
    const eventClassName: any = event.constructor.name;
    if (this.handlersMap.hasOwnProperty(eventClassName)) {
      const handlers: any[] = this.handlersMap[eventClassName];
      for (let handler of handlers) {
        handler(event);
      }
    }
  }
}
