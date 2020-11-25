import { Journey } from "../domain/journey";
import { EventMap } from "../mappers/journeyMap";
import { DatabaseError } from "sequelize";
import { Result } from "../../../core/logic/Result";
import { Op } from "sequelize";
import { IJourneyPlaceRepo } from "./journeyPlaceRepo";
import { JourneyId } from "../domain/journeyId";

export interface IJourneyRepo {
  exists(journeyId: JourneyId): Promise<boolean>;
  findEvent(): Promise<Journey[]>;
  save(event: Journey): Promise<void>;
}

export class JourneyRepo implements IJourneyRepo {
  private models: any;
  private journeyPlaceRepo: IJourneyPlaceRepo;

  constructor(models: any, journeyPlaceRepo: IJourneyPlaceRepo) {
    this.models = models;
    this.journeyPlaceRepo = journeyPlaceRepo;
  }

  private createBaseQuery() {
    return {
      where: {},
      // include: [
      //   { model: models.Trader, as: 'Trader', required: false }
      // ]
    };
  }

  public async findEvent(): Promise<Journey[] | any> {
    try {
      const result: any[] = await this.models.Journey.findAll({
        offset: 0,
        limit: 12,
      });

      console.log(result.map((item) => EventMap.toDomain(item.dataValues)));
      return result.map((item) => EventMap.toDomain(item.dataValues));
    } catch (error) {
      if (error instanceof DatabaseError) {
        return Result.fail(error.message);
      }
    }
  }

  public async exists(journeyId: JourneyId): Promise<boolean> {
    const baseQuery = this.createBaseQuery();
    baseQuery.where = {
      journey_id: {
        [Op.eq]: journeyId.id.toString(),
      },
    };
    const journey = await this.models.Journey.findOne(baseQuery);
    return !!journey === true;
  }

  public async save(journey: Journey): Promise<void> {
    console.log(journey)
    const eventModel = this.models.Journey;
    const exists = await this.exists(journey.journeyId);
    const isNewJourney = !exists;

    const rawSequelizeJourney = EventMap.toPersistence(journey);
    console.log(rawSequelizeJourney);

    if (isNewJourney) {
      try {
        await eventModel.create(rawSequelizeJourney);
        await this.journeyPlaceRepo.saveBulk(journey.getPlaces());
      } catch (err) {
        // if (error instanceof DatabaseError) {
        //   throw Result.fail<DatabaseError>(error.message);
        //   // throw new Error(error.message);
        // }
        throw new Error(err.toString());
      }
    } else {
    }
  }
}
