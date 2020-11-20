import { Model, DataTypes } from "sequelize";

export const MemberModel = (sequelize: any) => {
  class Member extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    public static associate(models: any) {
      // define association here
      // console.log(models);
      // console.log(models);
      const journeyModel = models.Journey;
      // this.hasMany(journeyModel, { foreignKey: "member_id", as: "Journeys" });
    }
  }

  Member.init(
    {
      user_base_id: DataTypes.STRING,
      member_id: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Member",
      tableName: "member",
    }
  );
  return Member;
};
