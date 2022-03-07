const dbConfig = require("../config/db.config");
const Sequelize = require("sequelize");

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    operatorsAliases: false,
    pool: {
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle
      }
    }
);

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.beacons = require("./beacon.model.js")(sequelize, Sequelize);
db.locations = require("./location.model.js")(sequelize, Sequelize);
db.detections = require("./detection.model.js")(sequelize, Sequelize);

db.beacons.belongsTo(db.locations);
db.detections.belongsTo(db.beacons);
db.detections.belongsTo(db.locations);


module.exports = db;