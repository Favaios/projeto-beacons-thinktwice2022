module.exports = app => {
    const beacons = require("../controllers/beacon.controller.js");
    var router = require("express").Router();


    router.post("/", beacons.create);
    router.get("/", beacons.findAll);
    router.get("/:id", beacons.findOne);
    router.put("/:id", beacons.update);
    router.delete("/:id", beacons.delete);
    app.use('/api/beacons', router);
  };