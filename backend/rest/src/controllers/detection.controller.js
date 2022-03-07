const db = require("../models")
const Detection = db.detections;
const sequelize = db.sequelize;
const wsscontext = require("../config/ws.config.js")

exports.create = async (req, res) => {
    let { beaconId, deviceId } = req.body

    if (beaconId == null || deviceId == null) {
        res.status(400).send({
            code: 400,
            message: "No beacon MAC or device UUID provided."
        })

        return;
    }

    var beacon = null;
    await db.beacons.findByPk(beaconId)
    .then(data => {
        if (data) {
            beacon = data.dataValues
        } else {
            res.status(404).send({
                error: "Resource not found."
            })
        }
    })
    .catch(err => {
        res.status(500).send({
            error:
                err.message || "DB Error."
        })
    })

    var first_entry = false;
    await db.detections.findAll({
        where: {
            deviceId: deviceId
        }
    })
    .then(data => {
        if (data.length == 0) {
            first_entry = true
        }
    })

    const detection = {
        beaconId: beaconId,
        locationId: beacon.locationId,
        deviceId: deviceId,
        ts: new Date()
    }

    Detection.create(detection)
        .then(data => {
            data.dataValues.new = first_entry
            res.send(data);
            wsscontext.send(data)
        })
        .catch(err => {
            res.status(500).send({
                code: 500,
                message:
                    err.message || "DB Error."
            })
        })
}

exports.findByFilter = (req, res) => {
    const mac = req.query.beacon;
    const loc_id = req.query.location;
    const device_uuid = req.query.device;

    var whereCond = {
    }
    if (mac != null) whereCond.beaconId = mac; if (loc_id != null) whereCond.locationId = loc_id;
    if (device_uuid != null) whereCond.deviceId = device_uuid;


    Detection.findAll({
        where: whereCond
    })
        .then(data => {
            if (data) {
                res.send(data)
            } else {
                res.status(404).send({
                    error: "No entires."
                })
            }
        })
        .catch(err => {
            res.status(500).send({
                error:
                    err.message || "DB Error."
            })
        })
};

exports.findAllByLocation = (req, res) => {
    const loc_id = req.params.id;
    Detection.findAll({
        where: {
            locationId: loc_id
        }
    })
    .then(data => {
        if (data) {
            res.send(data)
        } else {
            res.status(404).send({
                error: "No entires."
            })
        }
    })
    .catch(err => {
        res.status(500).send({
            error:
                err.message || "DB Error."
        })
    })
}

exports.allDeviceState = (req, res) => {
    query = "SELECT deviceId, if(CURRENT_TIMESTAMP - MAX(ts) > 60, null, 'success') AS state FROM detections GROUP BY(deviceId)"
    sequelize.query(query, { type: sequelize.QueryTypes.SELECT })
    .then(data => {
      res.send(data);
    }).catch(err => {
        res.status(500).send({
            error:
                err.message || "DB Error."
        })
    })
}


exports.deviceState = (req, res) => {
    const id = req.params.id
    query = `SELECT deviceId, if(CURRENT_TIMESTAMP - MAX(ts) > 60, null, 'success') AS state FROM detections WHERE deviceId = '${id}' GROUP BY(deviceId)`
    sequelize.query(query, { type: sequelize.QueryTypes.SELECT })
    .then(data => {
        if (data.length > 0) {
            return res.send(data[0])
        } else {
            return res.status(404).send({"error" : "Resource Not Found"})
        }
    }).catch(err => {
        res.status(500).send({
            error:
                err.message || "DB Error."
        })
    })
}

function deviceLastSeen(device) {
    return Detection.findOne({
        where: {
            deviceId: device
        }
    })
}