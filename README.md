# Test results


## Sequelize 

```
❯ ts-node src/tests/sequelize.ts
hey there
mainTimer: 0.048ms creating actions, total amount of users is 1000, each will react with 100 other users
mainTimer: 0.171ms sequential:write
sequential:write: 3:36.759 (m:ss.mmm)
mainTimer: 3:36.760 (m:ss.mmm) sequential:write
mainTimer: 3:36.851 (m:ss.mmm) bulk:write
bulk:write: 7.998s
mainTimer: 3:44.849 (m:ss.mmm) sequential:readAllLikesByUserId
sequential:readAllLikesByUserId: 30.462s
mainTimer: 4:15.311 (m:ss.mmm)
del: 87.495ms
```

## Mongoose

```
❯ ts-node src/tests/mongo.ts
hey there
mainTimer: 0.045ms creating actions, total amount of users is 1000, each will react with 100 other users
mainTimer: 0.17ms sequential:write
sequential:write: 44.386s
mainTimer: 44.387s sequential:write
mainTimer: 45.324s bulk:write
bulk:write: 13.209s
mainTimer: 58.533s sequential:readAllLikesByUserId
sequential:readAllLikesByUserId: 44.068s
mainTimer: 1:42.602 (m:ss.mmm)
del: 931.462ms
```
