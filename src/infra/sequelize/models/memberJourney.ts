"use strict";
import { Model, DataTypes } from "sequelize";
export const MemberJourneyModel = (sequelize: any) => {
  class MemberJourney extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models: any) {
      // define association here
      this.belongsTo(models.Journey, {
        foreignKey: "journey_id",
        targetKey: "journey_id",
        as: "Journey",
      });
      this.belongsTo(models.Member, {
        foreignKey: "member_id",
        targetKey: "member_id",
        as: "Member",
      });
    }
  }
  MemberJourney.init(
    {
      member_id: DataTypes.UUIDV4,
      journey_id: DataTypes.UUIDV4,
    },
    {
      sequelize,
      modelName: "MemberJourney",
    }
  );
  return MemberJourney;
};
