const models = require('../../database/models');
const dateHandler = require('../../util/date-handler');
const formatter = require('../../util/formatter');
const enrollmentRepository = require('../../database/transfer/enrollment');

const showEnrollmentsByDate = async (req, res) => {
    try {
        let date = req.body.date;
        const enrollments = await enrollmentRepository.getEnrollmentsByDate(date);
    
        return res.status(200).json({
            enrollments
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
        let memberId = req.body.memberId;
        let today = formatter.getFormatDate(new Date());
        const enrollment = await enrollmentRepository.findTodayById(memberId, today);
        
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
        const enrollment = new Enrollment();
        enrollment.memberId = req.body.memberId;
        enrollment.today = formatter.getFormatDate(new Date());
        enrollment.reason = req.body.reason;

        await enrollmentRepository.createEnrollments(enrollment);

        return res.status(200).json({
            
        });
    } catch (error) {
        console.log('에러 ', error.message);
        return res.status(500).json({
            message: error.message,
            error: error
        });
    }
}

const updateEnrollment = async (req, res) => {
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
        await enrollmentRepository.changeReason(req.body.memberId, req.body.reason);
    } catch (error) {
        return res.status(500).json({
            message: error.message,
            error: error
        })
    }
}

module.exports = {
    showEnrollmentsByDate,
    showEnrollment,
    createEnrollment,
    updateEnrollment
}