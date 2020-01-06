module.exports = (sequelize, DataTypes) => {
    const enrollment = sequelize.define('enrollment', {
        today: {
            type: DataTypes.STRING(15),
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