module.exports = (sequelize, DataTypes) => {
    const application = sequelize.define('application', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        today: {
            type: DataTypes.DATE,
            allowNull: false
        },
        school_numbers: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        reason: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        school_numbers: {
            type: DataTypes.INTEGER,
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