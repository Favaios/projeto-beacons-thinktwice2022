module.exports = app => {
    const detections = require("../controllers/detection.controller.js");
    var router = require("express").Router();


    router.post("/", detections.create);
    router.get("/", detections.findByFilter);
    router.get("/states", detections.allDeviceState);
    router.get("/states/:id", detections.deviceState);

    app.use('/api/detections', router);
  };