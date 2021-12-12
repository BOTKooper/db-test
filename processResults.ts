import mongo from './results_mongo.json';
import seq from './results_sequelize.json';

const mongoSequentialLatency = mongo.sequentialTimes.reduce((acc, cur) => {
  return cur - acc;
}, mongo.sequentialStart);


const mongoBulkLatency = mongo.sequentialTimes.reduce((acc, cur) => {
  return cur - acc;
}, mongo.bulkStart);

const seqSequentialLatency = seq.sequentialTimes.reduce((acc, cur) => {
  return cur - acc;
}, seq.sequentialStart);


const seqBulkLatency = seq.sequentialTimes.reduce((acc, cur) => {
  return cur - acc;
}, seq.bulkStart);

