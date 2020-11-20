import { Sequelize } from "sequelize";
import { MemberModel } from "./member";
import { eventModel } from "./journey";
import { PlaceModel } from "./place";
import { PlaceJourney } from "./placeJourney";

import { MemberJourneyModel } from "./memberJourney";
let sequelize: Sequelize;
const username = process.env.username || "";
const database = process.env.database || "";
const host = process.env.host || "";
const password = process.env.password || "";
const dialect: any = process.env.dialect || "postgres";

const db = {};

sequelize = new Sequelize(database, username, password, {
  host,
  dialect,
  pool: {
    max: 5,
    min: 0,
    idle: 10000,
  },
});

const toCamelCase = (str: string): string => {
  const _ = str.indexOf("_");
  if (~_) {
    return toCamelCase(
      str.substring(0, _) +
        str
          .substring(_ + 1)
          .substring(0, 1)
          .toUpperCase() +
        str.substring(_ + 2)
    );
  } else {
    return str.substring(0, 1).toUpperCase() + str.substring(1);
  }
};

let models: any = sequelize.models;
let modelsLoaded = false;

const createModels = () => {
  const memberUser = MemberModel(sequelize);
  const events = eventModel(sequelize);
  const place = PlaceModel(sequelize);
  const memberJourney = MemberJourneyModel(sequelize);
  const placeJourney = PlaceJourney(sequelize);

  memberUser.associate(models);
  events.associate(models);
  place.associate(models);
  memberJourney.associate(models);
  placeJourney.associate(models);

  // Camel case the models
  // console.log(modelsList);
  // for (let i = 0; i < modelsList.length; i++) {
  //   const modelName = toCamelCase(modelsList[i].name);
  //   models[modelName] = modelsList[i];
  // }

  // Create the relationships for the models;
  // Object.keys(models).forEach((modelName) => {
  //   if (models[modelName].associate) {
  //     models[modelName].associate(models);
  //   }
  // });

  models["sequelize"] = sequelize;
  models["Sequelize"] = Sequelize;
  modelsLoaded = true;
  return sequelize.models;
};
export default createModels();
