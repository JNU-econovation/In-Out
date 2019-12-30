module.exports = (sequelize, DataTypes) => {
    const application = sequelize.define('application', {
        today: {
            type: DataTypes.DATE,
            primaryKey: true,
            allowNull: false
        },
        memberId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        reason: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        createdAt: DataTypes.DATE,
        updatedAt: DataTypes.DATE,
    }, {
        underscored: true,
        freezeTableName: true,
        tableName: 'application'
    });

    return application;
}