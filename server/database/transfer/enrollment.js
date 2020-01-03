const database = require('./../models');

exports.createEnrollment = async (enroll) => {
    console.log(enroll);

    try {
        const transaction = await database.sequelize.transaction();

        const result = await database.Enrollment.create({
            today: enroll.today,
            reason: enroll.reason,
            userMemberId: enroll.memberId
        }, {
            transaction: transaction
        });
        await transaction.commit();

        return result;

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
        const transaction = await database.sequelize.transaction();
        await database.Enrollment.update({
            reason: reason
        }, {
            where: {
                userMemberId: memberId
            }
        }, {
            transaction: transaction
        });
        await transaction.commit();
    } catch (err) {
        console.log(err);
    }
}

exports.findTodayById = async (memberId, today) => {
    try {
        return await database.Enrollment.findOne({
            where: {
                userMemberId: memberId,
                today: today
            }
        });
    } catch (err) {
        console.log(err);
    }
}

exports.findAllWithReason = async (date) => {
    try {
        return await database.Enrollment.findAll({
            include: [{
                model: database.User,
                require: true
            }]
        });
    } catch (err) {
        console.log(err);
    }
}