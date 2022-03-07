const db = require("../models")
const Detections = db.detections;
const Locations = db.locations;
const sequelize = db.sequelize;
const Op = db.Sequelize.Op;

exports.getDetectionsByLocation = (req, res) => {
  const mints = req.query.mints
  const maxts = req.query.maxts
  const beacon = req.query.beacon
  const location = req.query.location

  var whereCond = {}
  console.log(location)
  console.log(`mints => ${mints} | maxts => ${maxts} | beacon => ${beacon} | location => ${location}`)

  if (mints != null) whereCond.ts = { [Op.gt]: mints }; if (maxts != null) whereCond.ts = { [Op.lt]: maxts };
  if (beacon != null) whereCond.beaconId = beacon; if (location != null) whereCond.locationId = location;

  Detections.findAll({
    attributes: ['location.id', [sequelize.fn('COUNT', 'detections.id'), 'c']],
    include: [Locations],
    where: whereCond,
    group: ['location.id']
  }).then(data => {
    var tmp = {}
    tmp.data = data;
    
    getMinMaxTimestamps()
    .then(data => {
      if (data.length > 0) {
        data = data[0].dataValues
        console.log(data)
        tmp.mints = data.mints
        tmp.maxts = data.maxts
  
        res.send(tmp)
      }
      else {
        res.status(404).send({"error": "No data"});
      }
    })
  })
    .catch(err => {
      res.status(500).send({
          error:
              err.message || "DB Error."
      })
  });
  
  
  //Detections.findAll({
  //  attributes: ['location.id', [sequelize.fn('COUNT', 'detections.id'), 'c']],
  //  include: [Locations],
  //  group: ['location.id']
  //}).then(data => res.status(200).send(data))
  
}

exports.getLocationTimeAggregation = (req, res) => {
  var mins = req.query.filter
  var location = req.query.location
  console.log(location)
  query = "SELECT ts, COUNT(*) c FROM "
  
  if (location != null) {
    query += `(SELECT floor(UNIX_TIMESTAMP(ts)/60/5)*60*5 ts, locationId FROM detections d) d WHERE d.locationId IN (${location}) GROUP BY ts;`
  } else {
    query += `(SELECT floor(UNIX_TIMESTAMP(ts)/60/5)*60*5 ts FROM detections d) d GROUP BY ts;`
  }

  sequelize.query(query, { type: sequelize.QueryTypes.SELECT })
  .then(data => {
    var tmp = {}
    tmp.data = data;
    
    getMinMaxTimestamps()
    .then(data => {
      if (data.length > 0) {
        data = data[0].dataValues
        console.log(data)
        tmp.mints = data.mints
        tmp.maxts = data.maxts
  
        res.send(tmp)
      }
      else {
        res.status(404).send({"error": "No data"});
      }
    })
  })  
  .catch(err => {
    res.status(500).send({"error": err.message || "SERVER ERROR"})
  })
}


function getMinMaxTimestamps() {
  return Detections.findAll({
    attributes: [[sequelize.fn('MIN', sequelize.col('ts')), 'mints'], [sequelize.fn('MAX', sequelize.col('ts')), 'maxts']]
  })
} 