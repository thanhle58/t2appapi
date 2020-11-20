import { Journey } from "../domain/journey";
import { EventMap } from "../mappers/EventMap";
import { UniqueEntityID } from "../../../core/domain/UniqueEntityID";
import { DatabaseError } from "sequelize";
import { Result } from "../../../core/logic/Result";
import { Model } from "sequelize";

export interface IEventRepo {
  // findUserByEmail(email: UserEmail): Promise<User>;
  // findUserByUsername (username: string): Promise<User>;
  exists(
    userId?: string,
    locationId?: string,
    startDate?: number,
    endDate?: number
  ): Promise<boolean>;
  findEvent(): Promise<Journey[]>;
  save(event: Journey): Promise<void>;
}

export class EventRepo implements IEventRepo {
  private models: any;

  constructor(models: any) {
    this.models = models;
  }

  private createBaseQuery() {
    const { models } = this;
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

  public async exists(userId: string, locationId?: string): Promise<boolean> {
    const baseQuery = this.createBaseQuery();
    const event = await this.models.Journey.findOne(baseQuery);
    return !!event === true;
  }

  public async save(event: Journey): Promise<void> {
    const rawEvent = EventMap.toPersistence(event);
    console.log(rawEvent);

    try {
      const eventModel = this.models.Journey;
      await eventModel.create(rawEvent);
    } catch (error) {
      console.log(error);
      if (error instanceof DatabaseError) {
        throw Result.fail<Journey>(error.message);
      }
    }
  }
}
