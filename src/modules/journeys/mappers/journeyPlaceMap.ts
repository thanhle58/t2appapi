import { Mapper } from "../../../core/infra/Mapper";
import { UniqueEntityID } from "../../../core/domain/UniqueEntityID";
import { JourneyPlace } from "../domain/journeyPlace";

export class JourneyPlaceMap extends Mapper<JourneyPlace> {
  public static toPersistence(journeyPlace: JourneyPlace) {
    return {
      journey_place_id: journeyPlace.id.toString(),
      journey_id: journeyPlace.journeyId.id.toString(),
      place_id: journeyPlace.placeId.id.toString(),
    };
  }

  public static toDomain(raw: any): JourneyPlace | undefined | null {
    const eventOrError = JourneyPlace.create(
      {
        placeId: raw.place_id,
        journeyId: raw.journey_id,
      },
      new UniqueEntityID(raw.journey_id)
    );
    eventOrError.isFailure ? console.log(eventOrError.error) : null;
    return eventOrError.isSuccess ? eventOrError.getValue() : null;
  }
}
