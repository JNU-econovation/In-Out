module.exports = (sequelize, DataTypes) => {
    const user = sequelize.define('user', {
        memberId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false
        },
        name: {
            type: DataTypes.STRING(4),
            allowNull: false
        },
        password: {
            type: DataTypes.STRING(20),
            allowNull: false
        },
        role: {
            type: DataTypes.INTEGER,
            defaultValue: false
        },
        createdAt: DataTypes.DATE,
        updatedAt: DataTypes.DATE,
    }, {
        underscored: true,
        freezeTableName: true,
        tableName: 'user'
    });

    return user;
}