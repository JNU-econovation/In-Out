const dateHandler = require("../../util/date-handler");
const enrollmentRepository = require("../../database/transfer/enrollment");

const showEnrollmentsByDate = async (req, res) => {
  try {
    let date = req.query.date;
    const enrollments = await enrollmentRepository.getEnrollmentsByDate(date);

    return res.status(200).json({
      enrollments
    });
  } catch (error) {
    console.log("에러 ", error.message);
    return res.status(500).json({
      message: error.message,
      error: error
    });
  }
};

const showEnrollment = async (req, res) => {
  let memberId = req.query.memberId;
  let today = dateHandler.getFormatDate(new Date());
  console.log(today);

  try {
    const enrollment = await enrollmentRepository.findTodayById(
      memberId,
      today
    );

    return res.status(200).json({
      result: enrollment
    });
  } catch (error) {
    console.log("에러 ", error.message);
    return res.status(500).json({
      message: error.message,
      error: error
    });
  }
};

const createEnrollment = async (req, res) => {
  //평일 08:00 ~ 17:00가 아니거나 공휴일인 경우 출입 신청 불가 기능
  const memberId = req.body.memberId;
  const reason = req.body.reason;
  const now = new Date();
  let result;

  if (dateHandler.isWeekend(now)) {
    return res.status(403).json({
      message: "주말에는 출입 신청을 할 수 없습니다."
    });
  }

  if (!dateHandler.isInTime(now)) {
    return res.status(403).json({
      message: "출입 신청은 당일 08:00 ~ 17:00 사이에만 신청 가능합니다."
    });
  }

  try {
    const enrollment = {
      memberId: memberId,
      today: dateHandler.getFormatDate(now),
      reason: reason
    };

    result = await enrollmentRepository.createEnrollment(enrollment);
  } catch (error) {
    console.log("에러 ", error.message);
    return res.status(500).json({
      message: error.message,
      error: error
    });
  }
  return res.status(200).json({
    result,
    message: "등록 완료!"
  });
};

const updateEnrollment = async (req, res) => {
  const now = new Date();
  if (dateHandler.isWeekend(now)) {
    return res.status(403).json({
      message: "주말에는 출입 신청을 할 수 없습니다."
    });
  }

  if (!dateHandler.isInTime(now)) {
    return res.status(403).json({
      message: "출입 신청은 당일 08:00 ~ 17:00 사이에만 신청 가능합니다."
    });
  }

  try {
    await enrollmentRepository.changeReason(req.body.memberId, req.body.reason);
  } catch (error) {
    return res.status(500).json({
      message: error.message,
      error: error
    });
  }
  return res.status(200).json({
    message: "update 됨."
  });
};

module.exports = {
  showEnrollmentsByDate,
  showEnrollment,
  createEnrollment,
  updateEnrollment
};
