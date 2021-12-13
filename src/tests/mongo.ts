import lodash from "lodash"
import { Document } from "mongoose";
import { ActionModel } from "../mongo/model";
import { getMongoConnection } from "../mongo/mongo";
import * as fs from 'fs';
import { ActionType } from "../sequelize/model";

const USER_AMOUNT = 1000;
const REACT_WITH_AMOUNT = 100;


const mongoTest = async () => {
  const timeName = 'mainTimer';

  await getMongoConnection();
  await ActionModel.deleteMany({});

  console.time(timeName);

  console.timeLog(timeName, `creating actions, total amount of users is ${USER_AMOUNT}, each will react with ${REACT_WITH_AMOUNT} other users`)

  let localTimeName = `sequential:write`;
  console.time(localTimeName);
  console.timeLog(timeName, localTimeName)
  const sequentialTimes: number[] = [];
  const sequentialStart = Date.now();
  for(let userId = 0; userId < USER_AMOUNT; userId++) {
    for(let actUserId = 0; actUserId < REACT_WITH_AMOUNT; actUserId++) {
      if(userId === actUserId) continue;
      const tmp = new ActionModel({
        userId: userId,
        actUserId: actUserId,
        actionType: ActionType.LIKE
      });
      await tmp.save();
      sequentialTimes.push(Date.now());
    }
  }
  console.timeEnd(localTimeName);
  console.timeLog(timeName, localTimeName);
  await ActionModel.deleteMany({});

  localTimeName = 'bulk:write';
  console.time(localTimeName);
  console.timeLog(timeName, localTimeName)
  const bulkTimes: number[] = []
  const bulkStart = Date.now();
  for(let userId = 0; userId < USER_AMOUNT; userId++) {
    const bulkArr: Document[] = [];
    for(let actUserId = 0; actUserId < REACT_WITH_AMOUNT; actUserId++) {
      if(userId === actUserId) continue;
      bulkArr.push(new ActionModel({
        userId: userId,
        actUserId: actUserId,
        actionType: ActionType.LIKE
      }))
    }
    await ActionModel.insertMany(bulkArr);
    bulkTimes.push(Date.now());
  }
  console.timeEnd(localTimeName);

  localTimeName = 'sequential:readAllLikesByUserId';
  console.time(localTimeName);
  console.timeLog(timeName, localTimeName)
  const readTimes: number[] = []
  const readStart = Date.now();
  for(let userId = 0; userId < USER_AMOUNT; userId++) {
    for(let actUserId = 0; actUserId <= REACT_WITH_AMOUNT; actUserId++) {
      if(userId === actUserId) continue;      
      await ActionModel.findOne({ userId, actionType: 'LIKE' });
      readTimes.push(Date.now());
    }
  }
  console.timeEnd(localTimeName);

  console.timeEnd(timeName)
  console.time('del')
  await ActionModel.deleteMany({});
  console.timeEnd('del')
  fs.writeFileSync('./results_mongo.json', JSON.stringify({sequentialStart, sequentialTimes, bulkStart, bulkTimes }));
  process.exit(0);
}

console.log('hey there')
mongoTest();
