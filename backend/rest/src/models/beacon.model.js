module.exports = (sequelize, Sequelize) => {
    const Beacon = sequelize.define("beacon", {
        id: {
            type: Sequelize.STRING(255),
            primaryKey: true
        },

        name: {
            type: Sequelize.STRING
        }
    })

    return Beacon
}

