const db = require("../models")
const Beacon = db.beacons;
const Op = db.sequelize.Op;

exports.create = (req, res) => {
    let { id, name, locationId } = req.body

    if (id == null || name == null || locationId == null) {
        res.status(400).send({
            code: 400,
            message: "Empty input fields."
        })

        return;
    }

    const beacon = {
        id: id,
        name: name,
        locationId: locationId
    }

    Beacon.create(beacon)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                code: 500,
                message:
                    err.message || "DB Error."
            })
        })
}

exports.findAll = (req, res) => {
    Beacon.findAll({
        include: [
            {model: db.locations, attributes: ['id', 'name'], as: 'location'}
        ],

        attributes: {exclude: ['locationId']}
    })
        .then(data => {
            res.send(data)
        }) 
        .catch(err => {
            res.status(500).send({
                error:
                    err.message || "DB Error."
            })
        })
};

exports.findOne = (req, res) => {
    const id = req.params.id;
    Beacon.findByPk(id)
        .then(data => {
            if (data) {
                res.send(data)
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
};

exports.update = (req, res) => {
    const id = req.params.id

    Beacon.update(
        req.body, {
            where: {id: id}
        }
    )
    .then(ret => {
        if (ret == 1) {
            res.send({
                message: "Update successful"
            })
        } else {
            res.status(400).send({
                error: "Update failed (resource not found or empty body)"
            })
        }
    })
    .catch(err => {
        res.status(500).send({
            error: err.message || "DB Error"
        })
    })
  
};

exports.delete = (req, res) => {
    const id = req.params.id;

    Beacon.destroy({
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Resource was deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete resource with id=${id}`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: err.message || "DB Error"
        });
      });
};

exports.deleteAll = (req, res) => {
  
};