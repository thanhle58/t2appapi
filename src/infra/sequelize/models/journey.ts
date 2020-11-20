"use strict";
import { Model, DataTypes, Optional } from "sequelize";

interface EventAttributes {
  // id: number;
  title: string;
  start_date: Date;
  end_date: Date;
  status: Boolean;
  price: number;
  member_id: string;
  type: string;
  journey_id: string;
}

// Some attributes are optional in `User.build` and `User.create` calls
interface EventCreationAttributes
  extends Optional<EventAttributes, "journey_id"> {}

export const eventModel = (sequelize: any) => {
  class events extends Model<EventAttributes, EventCreationAttributes> {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    public static associate(models: any) {
      // define association here
      this.belongsTo(models.Member, {
        foreignKey: "member_id",
        targetKey: "member_id",
        as: "Member",
      });
      this.hasMany(models.MemberJourney, {
        foreignKey: "member_id",
        as: "Members",
      });
      this.hasMany(models.PlaceJourney, {
        foreignKey: "journey_id",
        as: "Places",
      });
    }
  }
  events.init(
    {
      // id: DataTypes.INTEGER,
      title: DataTypes.STRING,
      start_date: DataTypes.DATE,
      end_date: DataTypes.DATE,
      status: DataTypes.NUMBER,
      price: DataTypes.DECIMAL,
      member_id: DataTypes.STRING,
      type: DataTypes.STRING,
      journey_id: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
      },
    },
    {
      sequelize,
      modelName: "Journey",
      tableName: "journey",
      timestamps: true,
      underscored: true,
    }
  );
  return events;
};
