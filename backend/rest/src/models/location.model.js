module.exports = (sequelize, Sequelize) => {
    const Location = sequelize.define("location", {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },

        name: {
            type: Sequelize.STRING
        }
    })

    return Location
}
