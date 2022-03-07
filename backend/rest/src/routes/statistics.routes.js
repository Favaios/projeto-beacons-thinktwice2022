module.exports = app => {
  const statistics = require("../controllers/statistics.controller");
  var router = require("express").Router();


  router.get("/detections", statistics.getDetectionsByLocation);
  router.get("/bucket", statistics.getLocationTimeAggregation)

  app.use('/api/statistics', router);
};