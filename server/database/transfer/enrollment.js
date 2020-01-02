const database = require('./../models');


exports.createEnrollments = async (enroll) => {
    try {
        return await database.sequelize.transaction().then(async (transaction) => {
            return await database.Enrollment.create({
                today: enroll.today,
                reason: enroll.reason,
                memberId: enroll.memberId
            }, {
                transaction: transaction
            })
        });
    } catch (err) {
        console.log(err);

    }
}

exports.getEnrollmentsByDate = async (date) => {
    try {
        return await database.Enrollment.findAll({
            where: {
                today: date
            }
        })
    } catch (err) {
        console.log(err);
    }
}

exports.getEnrollmentsById = async (memberId) => {
    try {
        return database.Enrollment.findAll({
            where: {
                memberId: memberId
            }
        })
    } catch (err) {
        console.log(err);
    }
}

exports.changeReason = async (memberId, reason) => {
    try {
        return await database.sequelize.transaction().then(async (transaction) => {
            return await database.Enrollment.update({
                reason: reason
            }, {
                where: {
                    memberId: memberId
                }
            }, {
                transaction: transaction
            })
        });
    } catch (err) {
        console.log(err);
    }
}

exports.findTodayById = async (memberId, today) => {
    try {
        return await database.Enrollment.findOne({
            where: {
                memberId: memberId,
                today: today
            }
        });
    } catch (err) {
        console.log(err);
    }
}