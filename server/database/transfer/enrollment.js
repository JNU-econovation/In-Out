const database = require("./../models");

const createEnrollment = async enroll => {
  try {
    const transaction = await database.sequelize.transaction();
    const result = await database.Enrollment.create(
      {
        today: enroll.today,
        reason: enroll.reason,
        userMemberId: enroll.memberId
      },
      {
        transaction: transaction
      }
    );
    await transaction.commit();

    return result;
  } catch (err) {
    console.log(err);
  }
};

const getEnrollmentsByDate = async date => {
  try {
    return await database.Enrollment.findAll({
      where: {
        today: date
      }
    });
  } catch (err) {
    console.log(err);
  }
};

const getEnrollmentsById = async memberId => {
  try {
    return database.Enrollment.findAll({
      where: {
        memberId: memberId
      }
    });
  } catch (err) {
    console.log(err);
  }
};

const changeReason = async (memberId, reason, today) => {
  try {
    const transaction = await database.sequelize.transaction();
    await database.Enrollment.update(
      {
        reason: reason
      },
      {
        where: {
          userMemberId: memberId,
          today: today
        }
      },
      {
        transaction: transaction
      }
    );
    await transaction.commit();
  } catch (err) {
    console.log(err);
  }
};

const findTodayById = async (memberId, today) => {
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
};

const findAllWithReason = async date => {
  try {
    return await database.Enrollment.findAll({
      include: [
        {
          model: database.User,

          require: true
        }
      ],
      where: {
        today: date
      }
    });
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  findAllWithReason,
  findTodayById,
  changeReason,
  getEnrollmentsById,
  createEnrollment,
  getEnrollmentsByDate
};
