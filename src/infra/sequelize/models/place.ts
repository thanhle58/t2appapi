"use strict";
import { Model, DataTypes } from "sequelize";
export const PlaceModel = (sequelize: any) => {
  class Place extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    public static associate(models: any) {
      // define association here
      // this.belongsTo(models.PlaceJourney, { foreignKey: 'place_id', targetKey: 'place_id', as: ''  })
    }
  }
  Place.init(
    {
      place_id: {
        type: DataTypes.UUIDV4,
        primaryKey: true,
      },
      title: DataTypes.STRING,
      place_type: DataTypes.STRING,
      status: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Place",
      tableName: "place",
      freezeTableName: true,
    }
  );
  return Place;
};
