const database = require('./../models');

exports.insertUser = async (user) => {
    try {
        return await database.User.create({
            memberId: user.memberId,
            name: user.name,
            password: user.password,
            role: user.role
        });
    } catch (err) {
        console.log(err);
    }
}

exports.findUserById = async (memberId) => {
    try {
        let user = await database.User.findOne({
            where: {
                memberId: memberId
            }
        });

        return user.dataValues;
    } catch (err) {
        console.log(err);
    }
}

exports.changeRole = async (memberId, role) => {
    try {
        const transaction = await database.sequelize.transaction();
        await database.User.update({
            role: role
        }, {
            where: {
                memberId: memberId
            }
        }, {
            transaction: transaction
        });
        await transaction.commit();
    } catch (err) {
        console.log(err);
    }
}

exports.changePassword = async (memberId, changedPassword) => {
    try {
        const transaction = await database.sequelize.transaction();
        await database.User.update({
            password: this.changePassword
        }, {
            where: {
                memberId: memberId
            }
        }, {
            transaction: transaction
        });
        await transaction.commit();
    } catch (err) {
        console.log(err);
    }
}