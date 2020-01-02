const database = require('./../models');

exports.insertUser = (user, callback) => {
    database.User.create({
            memberId: user.memberId,
            name: user.name,
            password: user.password,
            role: user.role
        })
        .then(result => {
            callback(null, result);
        })
        .catch(err => {
            callback(err, null);
        });
}

exports.findUserById = (memberId, callback) => {
    database.User.findOne({
            where: {
                memberId: memberId
            }
        })
        .then(user => {
            callback(null, user.dataValues);
        })
        .catch(err => callback(err, null));
}

exports.changeRole = (memberId, role, callback) => {
    database.sequelize.transaction().then((transaction) => {
        return database.User.update({
            role: role
        }, {
            where: {
                memberId: memberId
            }
        }, {
            transaction: transaction
        }).then((role) => {
            callback(null, "ok");
        }).catch(err => {
            callback(err)
        })

    });
}

exports.changePassword = (memberId, changedPassword, callback) => {
    database.sequelize.transaction().then((transaction) => {
        return database.User.update({
            password: changedPassword
        }, {
            where: {
                memberId: memberId
            }
        }, {
            transaction: transaction
        }).then((role) => {
            callback(null, "ok");
        }).catch(err => {
            callback(err)
        })

    });
}