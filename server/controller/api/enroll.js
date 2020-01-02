const models = require('../../database/models');

const showEnrollmentsByDate = async (req, res) => {
    try {
        const { date } = req.params.date;
        const enrollments = await models.Enrollment.findAll({
            where: { date }
        });
    
        return res.status(200).json({
            results: enrollments
          });

    } catch (error) {
        console.log('에러 ', error.message);
        return res.status(500).json({
            message: error.message,
            error: error
        });
    }
}

const showEnrollment = async (req, res) => {
    try {
        const { memberId } = req.params.memberId;
        const enrollment = await models.Enrollment.findOne({
            where: { memberId }
        });
    
        return res.status(200).json({
            result: enrollment
          });
    } catch (error) {
        console.log('에러 ', error.message);
        return res.status(500).json({
            message: error.message,
            error: error
        });
    }
}

const createEnrollment = async (req, res) => {
    let body = req.body;

    //TODO 평일 08:00 ~ 17:00가 아니거나 공휴일인 경우 출입 신청 불가 기능
    try {
        const enrollment = await models.Enrollment.create({
            today: new Date().getDate(),
            memberId: body.memberId,
            reason: body.reason
        });

        return res.status(200).json();
    } catch (error) {
        console.log('에러 ', error.message);
        return res.status(500).json({
            message: error.message,
            error: error
        });
    }
}

const updateEnrollment = async (req, res) => {
    let body  = req.body;
    const enrollment = await models.Enrollment.update({

    })
}

module.exports = {
    showEnrollmentsByDate,
    showEnrollment,
    createEnrollment
}