const db = require("../models")
const Location = db.locations;
const Op = db.sequelize.Op;

exports.create = (req, res) => {
    let { name } = req.body

    if (name == null) {
        res.status(400).send({
            error: "Empty input fields."
        })

        return;
    }

    const location = {
        name: name
    }

    Location.create(location)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                error:
                    err.message || "DB Error."
            })
        })
}

exports.findAll = (req, res) => {
    Location.findAll()
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
    Location.findByPk(id)
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

    Location.update(
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

    Location.destroy({
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