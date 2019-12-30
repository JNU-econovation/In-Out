module.exports = (sequelize, DataTypes) => {
    const user = sequelize.define('user', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        memberId: {
            type: DataTypes.STRING(10),
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
        school_numbers: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        isGraduated: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        createdAt: DataTypes.DATE,
        updatedAt: DataTypes.DATE,
    }, {
        //option
    });

    return user;
}