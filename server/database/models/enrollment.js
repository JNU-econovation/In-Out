module.exports = (sequelize, DataTypes) => {
    const enrollment = sequelize.define('enrollment', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        today: {
            type: DataTypes.STRING(10),
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
        tableName: 'enrollment'
    });

    return enrollment;
}