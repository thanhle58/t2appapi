import { Mapper } from "../../../core/infra/Mapper";
import { Journey } from "../domain/journey";
import { MemberId } from "../domain/memberId";
import { UniqueEntityID } from "../../../core/domain/UniqueEntityID";
import { EventDTO } from "../dtos/eventDTO";

export class EventMap extends Mapper<Journey> {
  public static toPersistence(event: Journey) {
    return {
      journey_id: event.id.toValue(),
      title: event.title.value,
      start_date: event.startDate,
      end_date: event.endDate,
      price: event.price,
      member_id: event.createBy.id.toString(),
      status: event.status,
      type: event.type,
    };
  }

  public static toDomain(raw: any): Journey | undefined | null {
    const createBy = MemberId.create(raw.member_id);
    const eventOrError = Journey.create(
      {
        title: raw.title,
        price: raw.price,
        startDate: raw.start_date,
        endDate: raw.end_date,
        status: raw.status,
        type: raw.type,
        createBy: createBy.getValue(),
      },
      new UniqueEntityID(raw.journey_id)
    );
    eventOrError.isFailure ? console.log(eventOrError.error) : null;
    return eventOrError.isSuccess ? eventOrError.getValue() : null;
  }

  public static toDTO(event: Journey): EventDTO {
    return {
      journeyId: event.journeyId.id.toValue().toString(),
      createBy: event.createBy.id.toString(),
      title: event.title.value,
      price: event.price || 0,
      startDate: event.startDate,
      endDate: event.endDate,
    };
  }
}
