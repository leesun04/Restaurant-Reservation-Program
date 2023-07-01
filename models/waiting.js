const Sequelize = require('sequelize');

module.exports = class Waiting extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
            waitingId: {
                type: Sequelize.BIGINT,
                primaryKey: true,
                autoIncrement: true
            }
        }, {
            sequelize,
            timestamps: false,
            modelName: 'Waiting',
            tableName: 'waitings',
            paranoid: false,
            charset: 'utf8mb4',
            collate: 'utf8mb4_general_ci',
        });
    }

    static associate(db) {
        db.Waiting.belongsTo(db.User, { foreignKey: 'userId', targetKey: 'userId' });
        db.Waiting.belongsTo(db.Store, { foreignKey: 'storeId', targetKey: 'storeId' });
    }
};
