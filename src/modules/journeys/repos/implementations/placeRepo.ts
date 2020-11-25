import { JourneyId } from "modules/journeys/domain/journeyId";
import { IPlaceRepo } from "../placeRepo";
import { Op } from "sequelize";

export class PlaceRepo implements IPlaceRepo {
  private models: any;
  constructor(models: any) {
    this.models = models;
  }

  private createBaseQuery(): any {
    return {
      where: {},
    };
  }

  findUserByMemberId(placeId: JourneyId): Promise<boolean> {
    throw new Error("Method not implemented.");
  }

  public async exists(placeId: string): Promise<boolean> {
    const PlaceModel = this.models.Place;
    const baseQuery = this.createBaseQuery();
    baseQuery.where = {
      place_id: {
        [Op.eq]: placeId,
      },
    };
    const place = await PlaceModel.findOne(baseQuery);
    return !!place === true;
  }
}
