import { Journey } from "../domain/journey";
import { EventMap } from "../mappers/journeyMap";
import { DatabaseError, ModelOptions } from "sequelize";
import { Result } from "../../../core/logic/Result";
import { Op, Model } from "sequelize";
import { JourneyId } from "../domain/journeyId";
import { PlaceId } from "../domain/paceId";
import { JourneyPlace } from "../domain/journeyPlace";
import { JourneyPlaces } from "../domain/journeyPlaces";
import { JourneyPlaceMap } from "../mappers/journeyPlaceMap";

export interface IJourneyPlaceRepo {
  exists(placeId: PlaceId, journeyId: JourneyId): Promise<boolean>;
  save(place: JourneyPlace): Promise<any>;
  delete(place: JourneyPlace): Promise<void>;
  saveBulk(places: JourneyPlaces): Promise<void>;
}

export class JourneyPlaceRepo implements IJourneyPlaceRepo {
  private models: any;

  constructor(models: any) {
    this.models = models;
  }

  private createBaseQuery(): any {
    return {
      where: {},
    };
  }

  async exists(placeId: PlaceId, journeyId: JourneyId): Promise<boolean> {
    const PlaceJourneyModel = this.models.PlaceJourney;
    const baseQuery = this.createBaseQuery();
    baseQuery.where["place_id"] = placeId.id.toString();
    baseQuery.where["journey_id"] = journeyId.id.toString();
    const journeyPlace = await PlaceJourneyModel.findOne(baseQuery);
    return !!journeyPlace === true;
  }

  async saveBulk(places: JourneyPlaces): Promise<void> {
    for (let place of places.getNewItems()) {
      await this.save(place);
    }
  }

  async save(place: JourneyPlace): Promise<any> {
    const PlaceJourneyModel = this.models.PlaceJourney;
    const rawPlaceJourney = JourneyPlaceMap.toPersistence(place);
    const exists = this.exists(place.placeId, place.journeyId);
    const isNew = !!exists;

    if (isNew) {
      try {
        await PlaceJourneyModel.create(rawPlaceJourney);
      } catch (err) {
        throw new Error(err.toString());
      }
    } else {
      throw new Error(
        "Shouldn't be re-saving a place. Only deleting and saving."
      );
    }
  }

  async delete(place: JourneyPlace): Promise<void> {
    const PlaceJourneyModel = this.models.PlaceJourney;
    return PlaceJourneyModel.destroy({
      where: {
        place_id: place.placeId.id.toString(),
        journey_id: place.journeyId.id.toString(),
      },
    });
  }
}
