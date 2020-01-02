const database = require('./../models');


exports.createEnrollments = (enroll, callback) => {
    database.sequelize.transaction().then((transaction) => {
        database.Enrollment.create({
                today: enroll.today,
                reason: enroll.reason,
                memberId: enroll.memberId
            }, {
                transaction: transaction
            })
            .then(result => {
                callback(null, result);
            })
            .catch(err => {
                callback(err, null);
            });
    });
}

exports.getEnrollmentsByDate = (date, callback) => {
    database.Enrollment.findAll({
        where: {
            today: date
        }
    }).then(enrollments => {
        callback(null, enrollments.dataValues);
    }).catch(err => callback(err, null));
}

exports.getEnrollmentsById = (memberId, callback) => {
    database.Enrollment.findAll({
        where: {
            memberId: memberId
        }
    }).then(enrollments => {
        callback(null, enrollments.dataValues);
    }).catch(err => callback(err, null));
}