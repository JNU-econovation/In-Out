const models = require('../../database/models');
const dateHandler = require('../../util/date-handler');

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

    //평일 08:00 ~ 17:00가 아니거나 공휴일인 경우 출입 신청 불가 기능
    if (dateHandler.isWeekend()) {
        return res.status(403).json({
            message: '주말에는 출입 신청을 할 수 없습니다.'
        });
    }

    if (!dateHandler.isInTime()) {
        return rews.status(403).json({
            message: '출입 신청은 당일 08:00 ~ 17:00 사이에만 신청 가능합니다.'
        })
    }

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

    if (dateHandler.isWeekend()) {
        return res.status(403).json({
            message: '주말에는 출입 신청을 할 수 없습니다.'
        });
    }

    if (!dateHandler.isInTime()) {
        return rews.status(403).json({
            message: '출입 신청은 당일 08:00 ~ 17:00 사이에만 신청 가능합니다.'
        })
    }

    const enrollment = await models.Enrollment.update({

    })
}

module.exports = {
    showEnrollmentsByDate,
    showEnrollment,
    createEnrollment
}