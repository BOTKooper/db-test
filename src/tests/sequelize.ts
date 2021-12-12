import { ActionType, UserActionModel } from "../sequelize/model";
import { getSequelizeConnection } from '../sequelize/sequelize';
import * as fs from 'fs';

const USER_AMOUNT = 1000;
const REACT_WITH_AMOUNT = 100;


const mongoTest = async () => {
  const timeName = 'mainTimer';
  await getSequelizeConnection();
  await UserActionModel.destroy({ where: {}, force: true });
  console.time(timeName);

  console.timeLog(timeName, `creating actions, total amount of users is ${USER_AMOUNT}, each will react with ${REACT_WITH_AMOUNT} other users`)

  let localTimeName = `sequential:write`;
  console.time(localTimeName);
  console.timeLog(timeName, localTimeName)
  const sequentialTimes: number[] = [];
  const sequentialStart = Date.now();
  for(let userId = 0; userId < USER_AMOUNT; userId++) {
    for(let actUserId = 0; actUserId <= REACT_WITH_AMOUNT; actUserId++) {
      if(userId === actUserId) continue;
      await UserActionModel.create({
        userId,
        actUserId,
        actionType: ActionType.LIKE,
      } as any);
      sequentialTimes.push(Date.now());
    }
  }
  console.timeEnd(localTimeName);
  console.timeLog(timeName, localTimeName);
  await UserActionModel.destroy({ where: {}, force: true });

  localTimeName = 'bulk:write';
  console.time(localTimeName);
  console.timeLog(timeName, localTimeName)
  const bulkTimes: number[] = []
  const bulkStart = Date.now();
  for(let userId = 0; userId < USER_AMOUNT; userId++) {
    const bulkArr: any[] = [];
      for(let actUserId = 0; actUserId <= REACT_WITH_AMOUNT; actUserId++) {
        if(userId === actUserId) continue;      const tmp = {
        userId: userId,
        actUserId: actUserId,
        actionType: ActionType.LIKE
      };
      bulkArr.push(tmp)
    }
    await UserActionModel.bulkCreate(bulkArr)
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
      await UserActionModel.findOne({ where: { userId, actionType: 'LIKE' } });
      readTimes.push(Date.now());
    }
  }
  console.timeEnd(localTimeName);


  console.timeEnd(timeName)
  console.time('del')
  await UserActionModel.destroy({ where: {}, force: true });
  console.timeEnd('del')
  fs.writeFileSync('./results_sequelize.json', JSON.stringify({sequentialStart, sequentialTimes, bulkStart, bulkTimes, readStart, readTimes }));
  process.exit(0);
}

console.log('hey there')
mongoTest();
