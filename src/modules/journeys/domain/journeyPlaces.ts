import { WatchedList } from "../../../core/domain/WatchedList";
import { JourneyPlace } from "./journeyPlace";

export class JourneyPlaces extends WatchedList<JourneyPlace> {
  private constructor(initialVotes: JourneyPlace[]) {
    super(initialVotes);
  }
  public compareItems(a: JourneyPlace, b: JourneyPlace): boolean {
    return a.equals(b);
  }

  public static create(places?: JourneyPlace[]): JourneyPlaces {
    return new JourneyPlaces(places ? places : []);
  }
}
