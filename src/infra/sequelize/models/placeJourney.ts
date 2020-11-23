"use strict";
import { Model, DataTypes } from "sequelize";
export const PlaceJourney = (sequelize: any) => {
  class PlaceJourney extends Model {
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
      this.belongsTo(models.Place, {
        foreignKey: "place_id",
        targetKey: "place_id",
        as: "Place",
      });
    }
  }
  PlaceJourney.init(
    {
      place_id: DataTypes.UUIDV4,
      journey_id: DataTypes.UUIDV4,
      journey_place_id: {
        type: DataTypes.UUIDV4,
        primaryKey: true,
      },
    },
    {
      sequelize,
      modelName: "PlaceJourney",
    }
  );
  return PlaceJourney;
};
