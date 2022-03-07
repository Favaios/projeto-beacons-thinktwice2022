module.exports = (sequelize, Sequelize) => {
    const Detection = sequelize.define("detection", {
        deviceId: {
            type: Sequelize.UUID,
            allowNull: false
        },
        ts: {
            type: 'TIMESTAMP',
            defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
            allowNull: false
        }
    })

    return Detection
}
