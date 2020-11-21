import { Journey } from "../domain/journey";
import { EventMap } from "../mappers/EventMap";
import { DatabaseError } from "sequelize";
import { Result } from "../../../core/logic/Result";
import { Op } from "sequelize";

import { MemberId } from "../domain/memberId";
export interface IMemberRepo {
  findUserByMemberId(memberId: MemberId | string): Promise<boolean>;
  exists(memberId: string): Promise<boolean>;
}

export class MemberRepo implements IMemberRepo {
  private models: any;

  constructor(models: any) {
    this.models = models;
  }

  findUserByMemberId(memberId: MemberId | string): Promise<boolean> {
    throw new Error("Method not implemented.");
  }

  private createBaseQuery() {
    return {
      where: {},
    };
  }

  public async exists(memberId: string): Promise<boolean> {
    const baseQuery = this.createBaseQuery();
    baseQuery.where = {
      member_id: {
        [Op.eq]: memberId,
      },
    };
    const member = await this.models.Member.findOne(baseQuery);
    return !!member === true;
  }
}
