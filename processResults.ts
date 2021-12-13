import mongo from './results_mongo.json';
import seq from './results_sequelize.json';

const median = (arr: number[]): number => {
  const middle = Math.floor(arr.length / 2);
  const sorted = arr.sort((a, b) => a - b);
  return arr.length % 2 !== 0 ? sorted[middle] : (sorted[middle - 1] + sorted[middle]) / 2;
};


const processor = async (data: typeof mongo): Promise<Object> => {
  const sequentialLatencies = data.sequentialTimes.map((cur, idx) => {
    return cur - (data.sequentialTimes[idx - 1] || data.sequentialStart);
  });
  
  const bulkLatencies = data.bulkTimes.map((cur, idx) => {
    return cur - (data.bulkTimes[idx - 1] || data.bulkStart);
  });


  const minSequentialTime = Math.min(...sequentialLatencies);
  const minBulkTime = Math.min(...sequentialLatencies);
  const maxSequentialTime = Math.max(...bulkLatencies);
  const maxBulkTime = Math.min(...bulkLatencies);
  const avgSequentialTime = sequentialLatencies.reduce((acc, cur) => acc+cur, 0) / sequentialLatencies.length;
  const avgBulkTime = bulkLatencies.reduce((acc, cur) => acc+cur, 0) / bulkLatencies.length;
  const medianSequentialTime = median(sequentialLatencies)
  const medianBulkTime = median(bulkLatencies)

  return {
    avgBulkTime,
    avgSequentialTime,
    medianSequentialTime,
    medianBulkTime,
    minSequentialTime,
    minBulkTime,
    maxSequentialTime,
    maxBulkTime,
  };
}

processor(mongo).then(_ => console.log('mongo', _));
processor(seq).then(_ => console.log('seq', _));
