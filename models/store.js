const Sequelize = require('sequelize');

module.exports = class Store extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
            storeId: {
                type: Sequelize.BIGINT,
                primaryKey: true,
                autoIncrement: true
            },
            name: { // 가게 이름
                type: Sequelize.STRING(100),
                allowNull: false
            },
            info: { // 가게 정보
                type: Sequelize.TEXT,
                allowNull: false
            },
            location: { // 가게 위치
                type: Sequelize.STRING(225),
                allowNull: false
            },
        }, {
            sequelize,
            timestamps: false,
            modelName: 'Store',
            tableName: 'stores',
            paranoid: false,
            charset: 'utf8mb4',
            collate: 'utf8mb4_general_ci',
        });
    }

    static associate(db) {
        db.Store.hasMany(db.Review, { foreignKey: 'storeId', sourceKey: 'storeId', onDelete: 'cascade' });
        db.Store.hasMany(db.Waiting, { foreignKey: 'storeId', sourceKey: 'storeId', onDelete: 'cascade' });
    }
};
